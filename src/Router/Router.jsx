import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import Gallery from "../Pages/Gallery/Gallery";
import AddFood from "../Pages/AddFood/AddFood";
import UpdateFood from "../Components/UpdateFood/UpdateFood";
import AllFoods from "../Pages/AllFoods/AllFoods";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import LoadingAnimation from "../Components/Loading/LoadingAnimation";
import PurchaseFood from "../Pages/PurchaseFood/PurchaseFood";
import MyFoods from "../Pages/MyFoods/MyFoods";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyOrders from "../Pages/MyOrders/MyOrders";
import ForgetPass from "../Components/ForgetPass/ForgetPass";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashAllFoods from "../Pages/DashAllFoods/DashAllFoods";
import DashStats from "../Pages/DashStats/DashStats";
import Maindash from "../Pages/DashStats/Maindash";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgetPass",
        element: (
          <PrivateRoute>
            <ForgetPass></ForgetPass>
          </PrivateRoute>
        ),
      },
      {
        path: "/gallery",
        Component: Gallery,
      },

      {
        path: "/allFoods",
        Component: AllFoods,
      },
      {
        path: "/details/:id",
        element: <FoodDetails></FoodDetails>,
      },
      {
        path: "/purchaseFood/:id",
        loader: ({ params }) =>
          fetch(
            `https://royal-bites-rest-server.vercel.app/foods/${params.id}`
          ),
        HydrateFallback: LoadingAnimation,
        element: (
          <PrivateRoute>
            <PurchaseFood></PurchaseFood>
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index:true,
        element: <PrivateRoute><Maindash></Maindash></PrivateRoute>
      },
      {
        path: "/dashboard/stats",
        element: <PrivateRoute><DashStats></DashStats></PrivateRoute>
      },
      {
        path: "/dashboard/myFoods",
        element: (
          <PrivateRoute>
            <MyFoods></MyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allFoods",
        element: <PrivateRoute><DashAllFoods></DashAllFoods></PrivateRoute>
      },
      {
        path: "/dashboard/details/:id",
        element: <FoodDetails></FoodDetails>,
      },
      {
        path: "/dashboard/myOrders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateFood/:id",
        loader: ({ params }) =>
          fetch(
            `https://royal-bites-rest-server.vercel.app/foods/${params.id}`
          ),
        HydrateFallback: LoadingAnimation,
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
