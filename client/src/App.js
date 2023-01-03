// import './App.css';
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ListCards from "./components/ListCards";
function App() {
  return (
    <>
   <Header/>
   <Outlet/>
   </>
  );
}

export default App;
