import Login from "./components/login";
import Map from "./components/map";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
