// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";

// Componnents
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer";

// Pages
import Home from "./Pages/Home";
import ByName from "./Pages/SearchByName";
import ByIngredients from "./Pages/SearchByIngredients";
import ByCategories from "./Pages/SearchByCategories";
import Detail from "./Pages/Detail";
import MealsIngredients from "./Pages/MealsIngredients";
import Login from "./pages/Login";

// Aos
import AOS from "aos";
import "aos/dist/aos.css";

import { useNavigate } from "react-router-dom";

const App = () => {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Sidebar
  const [sidebar, setSidebar] = useState(false);
  // Handle Sidebar
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogin = (email, password, setLoginStatus, navigate) => {
    if (email === "admin" && password === "admin") {
      setLoginStatus("Success")
      navigate('/home')
      setIsAuthenticated(true)
    }else {
      setIsAuthenticated(false)
      setLoginStatus("Failed")
    }
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} >
          <Root sidebar={sidebar} setSidebar={setSidebar} />
        </PrivateRoute>}>
          <Route
            path="/home"
            element={<Home handleSidebar={handleSidebar} sidebar={sidebar} />}
          />
          <Route
            path="/by-name/:name?"
            index={true}
            element={<ByName handleSidebar={handleSidebar} sidebar={sidebar} />}
          />
          <Route
            path="/by-ingredients"
            element={
              <ByIngredients handleSidebar={handleSidebar} sidebar={sidebar} />
            }
          />
          <Route
            path="/ingredient/:ingredient?"
            element={
              <MealsIngredients
                handleSidebar={handleSidebar}
                sidebar={sidebar}
              />
            }
          />
          <Route
            path="/by-categories/:category?"
            element={
              <ByCategories handleSidebar={handleSidebar} sidebar={sidebar} />
            }
          />
          <Route
            path="/detail/:id"
            element={<Detail handleSidebar={handleSidebar} sidebar={sidebar} />}
          />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate('/')
    }
  }, [isAuthenticated, navigate]);

  // Render the children only if authenticated
  return isAuthenticated ? children : null;
};


// eslint-disable-next-line react/prop-types
const Root = ({ sidebar, setSidebar }) => {
  return (
    <>
      <div className="flex">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div
          className={`flex-grow relative w-full h-full z-0 overflow-hidden ${
            sidebar ? "h-screen md:h-full" : "h-full"
          }`}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
