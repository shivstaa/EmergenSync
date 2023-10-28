import './App.css'
import SignUpComp from "./Components/AuthComp/SignUpComp.jsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import LoginComp from "./Components/AuthComp/LoginComp.jsx";
import ProtectLayout from "./Components/ProtectedLayout/ProtectLayout.jsx";
import Home from "./Components/HomePage/Home.jsx";
import Protected from "./Components/ProtectedPage/Protected.jsx";
import NavBarLayout from "./Components/NavBarComp/NavBarLayout.jsx";


function App() {

  return (
      <NavBarLayout>
          <Routes>
              <Route path={"/"} element={<Home />}></Route>
              <Route path={"/login"} element={<LoginComp />}></Route>
              <Route path={"/signup"} element={<SignUpComp />}></Route>

              <Route element={<ProtectLayout />}>
                  <Route path={'/user'} element={<Protected />} />
              </Route>
          </Routes>
      </NavBarLayout>
  )

}

export default App