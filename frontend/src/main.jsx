import * as React from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App.jsx";
import Messages from "./components/Messages.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Messages />,
  },

]);



ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);