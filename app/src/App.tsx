import Map from "./components/map";
import Adder from "./components/adder";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Facebook,
  Apple,
  ThirdPartyEmailPasswordAuth,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";

const apiPort = Number(process.env.API_PORT) || 4200;
const apiDomain = `http://localhost:${apiPort}`; // process.env.API_URL

const appPort = Number(process.env.APP_PORT) || 3300;
const appDomain = `http://localhost:${appPort}`; // process.env.APP_URL

SuperTokens.init({
  appInfo: {
    appName: "Marker map",
    apiDomain,
    websiteDomain: appDomain,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Google.init(),
          Github.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          <Route
            path="/"
            element={
              <ThirdPartyEmailPasswordAuth>
                <Map />
              </ThirdPartyEmailPasswordAuth>
            }
          />
          <Route
            path="/add"
            element={
              <ThirdPartyEmailPasswordAuth>
                <Adder />
              </ThirdPartyEmailPasswordAuth>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </Provider>
  );
}

export default App;
