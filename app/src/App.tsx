import Login from "./components/login";
import Map from "./components/map";
import Adder from "./components/adder";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<Map />} />
          <Route path="/add" element={<Adder />} />
        </Routes>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;
