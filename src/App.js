import logo from "./logo.svg";
import "./App.css";
import injectContext from "../src/store/appContext";
import Layout from "./components/Layout";

function App() {
  return <Layout />;
}

export default injectContext(App);
