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
import Sidebar from "./Components/Sidebar";
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

const App = () => {
  // Sidebar
  const [sidebar, setSidebar] = useState(false);
  // Handle Sidebar
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Login />} />
      <Route element={<Root sidebar={sidebar} setSidebar={setSidebar} />}>
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
