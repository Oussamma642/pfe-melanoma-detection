import { createBrowserRouter } from "react-router-dom";
import Login from "./views/authentication/Login";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./components/Home";
import Dashbord from "./views/dashbord/Dashbord";

// const {user}=  useStateContext();

const router = createBrowserRouter([
  {
    // ROOT: could be used for global providers, errorElement, etc.
    path: "/",
    children: [
      // SyndicateHomePage
      {
        // Public home page, at "/"
        index: true,
        element: <Home />,
      },

      // Guest Layout
      {
        // Guests (not authenticated) use this layout
        element: <GuestLayout />,
        children: [
          {
            path: "auth/login",
            element: <Login />,
          },
        ],
      },

      {
        // Authenticated users use this layout
        element: <DefaultLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashbord />,
            children: [
            ],
          },
         
        ],
      },

      {
        // Catch‑all 404
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;