import bodyParser from 'body-parser';
import { default as Express, Application } from 'express';
import { default as cors } from 'cors';
import Net from 'net';
import ErrorMiddleware from '@middleware/error.middleware';
import Logger from '@handler/logger/winston';
import RouterV1 from '@routes/v1';
import config from '@config/config';
import Session from 'supertokens-node/recipe/session';
// let { verifySession } = require("supertokens-node/recipe/session/framework/express");
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import supertokens from 'supertokens-node';

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

const apiPort = Number(process.env.API_PORT) || 4200;
const apiDomain = `http://localhost:${apiPort}`; // process.env.API_URL

const appPort = Number(process.env.APP_PORT) || 3300;
const appDomain = `http://localhost:${appPort}`; // process.env.APP_URL

const supertokensPort = Number(process.env.SUPERTOKENS_PORT) || 3567;
const supertokensDomain = `http://supertokens:${supertokensPort}`; // process.env.SUPERTOKENS_URL

/**
 * Run function
 */
const createApplication = async () => {
  try {
    const app: Application = Express();
    supertokens.init({
      framework: 'express',
      supertokens: {
        connectionURI: supertokensDomain,
      },
      appInfo: {
        appName: 'Marker map',
        apiDomain,
        websiteDomain: appDomain,
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

    // app.use(
    //   helmet({
    //     contentSecurityPolicy: false,
    //   })
    // );
    app.use(
      cors({
        ...corsOptions,
        allowedHeaders: [
          ...corsOptions.allowedHeaders,
          ...supertokens.getAllCORSHeaders(),
        ],
        credentials: true,
      })
    );
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

    app.use(Express.static('uploads'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(MorganInfoMiddleware);
    app.use(MorganErrorMiddleware);
    app.use('/v1', RouterV1);
    app.use(ErrorMiddleware);
    app.use(errorHandler());
    const server: Net.Server = app.listen(config.port);
    server.on('error', onHttpError);
    server.on('listening', () => onListening(server));
  } catch (error) {
    Logger.log('coreInfo', `Error when starting app: ${error.stack}`);
  }
};

export default createApplication;
