import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../layouts/Main/Main";
import Home from "../components/Home/Home";

import AuthForm from "../components/Authentications/AuthForm";
import UserHome from "../components/Home/UserHome/UserHome";
import PrivateRoute from "../components/Authentications/PrivateRoute/PrivateRoute";
import AddBankForm from "../components/Home/UserHome/AddBank/AddBankForm";
import DeviceMain from "../layouts/Main/DeviceMain";
import DeviceInformation from "../components/Home/UserHome/Device/DeviceInformation";
import CreateInverterBrand from "../components/Home/Brand/CreateInverterBrand";
import BrandList from "../components/Home/Brand/BrandList";

import InverterInformation from "../components/Home/UserHome/Device/InverterInformation";
import AddInverter from "../components/Home/UserHome/Device/AddInverter";
import InputDeviceAddress from "../components/Home/UserHome/Device/InputDeviceAddress";
import UserSign from "../components/Home/UserHome/UserSign";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <AuthForm />,
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <UserHome />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bank-form",
        element: (
          <PrivateRoute>
            <AddBankForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/device",
        element: <DeviceMain />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/device/create-inverter-brand",
            element: <CreateInverterBrand></CreateInverterBrand>,
          },
          {
            path: "/device/brand-list",
            element: <BrandList></BrandList>,
          },
          {
            path: "/device/device-information",
            element: <DeviceInformation></DeviceInformation>,
          },
          {
            path: "/device/inverter-information",
            element: <InverterInformation></InverterInformation>,
          },
          {
            path: "/device/device-address",
            element: <InputDeviceAddress></InputDeviceAddress>,
          },
          {
            path: "/device/sign",
            element: <UserSign></UserSign>,
          },
        ],
      },
      {
        path: "/device",
        element: <DeviceMain />,
        errorElement: <ErrorPage />,
        //   children: [
        //     // {
        //     //   index: true,
        //     //   element: <Home />,
        //     // },
        //     // Add more nested device routes here as needed
        //     {
        //       path: "/device/device-information",
        //       element: <DeviceInformation/>,
        //     },
        //   ],
      },
    ],
  },
]);
