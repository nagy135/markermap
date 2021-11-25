import Login from "./components/login";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Login></Login>
    </Provider>
  );
}

export default App;
