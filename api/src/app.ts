import bodyParser from 'body-parser';
import { default as Express, Application } from 'express';
import { default as cors } from 'cors';
import Net from 'net';
import ErrorMiddleware from '@middleware/error.middleware';
import Logger from '@handler/logger/winston';
import RouterV1 from '@routes/v1';
import config from '@config/config';
import dotenv from 'dotenv';

import {
  MorganErrorMiddleware,
  MorganInfoMiddleware,
} from '@middleware/morgan.middleware';

const onListening = (server: Net.Server): void => {
  if (server) {
    const addr: string | Net.AddressInfo = server.address() as
      | string
      | Net.AddressInfo;
    const message: string =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.log('coreInfo', message);
  }
};

/**
 * Handles specific errors with friendly messages
 * @param error Error - error from Node http server
 * @author jozef.repan@01people.com
 */
const onHttpError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      Logger.log(
        'coreInfo',
        `Application start failed - Required elevated privileges for start: ${error.stack}`
      );
      process.exit(1);
    case 'EADDRINUSE':
      Logger.log(
        'coreInfo',
        `Application start failed - Address already in use: ${error.stack}`
      );
      process.exit(1);
    default:
      throw error;
  }
};

const whiteList: string[] = process.env.URL_WHITELIST
  ? process.env.URL_WHITELIST.split(',')
  : [];

const corsOptions: any = {
  origin: (origin: any, callback: any): any => {
    if (typeof origin === 'undefined' || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Content-Length',
    'X-Requested-With',
    'api-key',
  ],
};

const Session = require('supertokens-node/recipe/session');
// let { verifySession } = require("supertokens-node/recipe/session/framework/express");
const {
  middleware,
  errorHandler,
} = require('supertokens-node/framework/express');
const ThirdPartyEmailPassword = require('supertokens-node/recipe/thirdpartyemailpassword');
const supertokens = require('supertokens-node');

const apiPort = 4200;
const apiDomain = `http://localhost:${apiPort}`;

const websitePort = 3300;
const websiteDomain = `http://localhost:${websitePort}`;

/**
 * Run function
 */
const createApplication = async () => {
  try {
    const app: Application = Express();
    supertokens.init({
      framework: 'express',
      supertokens: {
        connectionURI: 'http://localhost:3567',
      },
      appInfo: {
        appName: 'Marker map', // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
      },
      recipeList: [
        ThirdPartyEmailPassword.init({
          providers: [
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            ThirdPartyEmailPassword.Google({
              clientId:
                '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
              clientSecret: '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',
            }),
            ThirdPartyEmailPassword.Github({
              clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
              clientId: '467101b197249757c71f',
            }),
          ],
        }),
        Session.init(),
      ],
    });

    app.use(
      cors({
        ...corsOptions,
        allowedHeaders: [
          ...corsOptions.allowedHeaders,
          ...supertokens.getAllCORSHeaders(),
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        credentials: true,
      })
    );

    // app.use(
    //   helmet({
    //     contentSecurityPolicy: false,
    //   })
    // );
    app.use(middleware());

    // // custom API that requires session verification
    // app.get("/sessioninfo", verifySession(), async (req, res) => {
    //   let session = req.session;
    //   res.send({
    //     sessionHandle: session.getHandle(),
    //     userId: session.getUserId(),
    //     accessTokenPayload: session.getAccessTokenPayload(),
    //   });
    // });

    app.use(errorHandler());

    app.use(Express.static('uploads'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(MorganInfoMiddleware);
    app.use(MorganErrorMiddleware);
    app.use('/v1', RouterV1);
    app.use(ErrorMiddleware);
    const server: Net.Server = app.listen(config.port);
    server.on('error', onHttpError);
    server.on('listening', () => onListening(server));
  } catch (error) {
    Logger.log('coreInfo', `Error when starting app: ${error.stack}`);
  }
};

export default createApplication;
