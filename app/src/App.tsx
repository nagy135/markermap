import Login from "./components/login";
import Map from "./components/map";
import Adder from "./components/adder";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import store, { TRootStore } from "./store";
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

const apiPort = 4200;
const apiDomain = `http://localhost:${apiPort}`;

const websitePort = 3300;
const websiteDomain = `http://localhost:${websitePort}`;

SuperTokens.init({
  appInfo: {
    appName: "Marker map",
    apiDomain,
    websiteDomain,
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          Google.init(),
          Github.init(),
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
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          {/*Your app routes*/}
          <Route
            path="/"
            element={
              <ThirdPartyEmailPasswordAuth>
                <Map />
              </ThirdPartyEmailPasswordAuth>
            }
          />
          <Route path="/add" element={<Adder />} />
        </Routes>
        <Toaster />
      </Router>
    </Provider>
  );
}

export default App;
