import { createBrowserRouter } from "react-router";
import { Layout } from "./views/Layout";
import { NotFound } from "./views/NotFound";
import { Start } from "./views/Start";
import { RenderActivity } from "./components/RenderActivity";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "/", element: <Start></Start> },
      {
        path: "/:placeId/:weather/:lat/:lng",
        element: <RenderActivity></RenderActivity>,
      },
    ],
  },
]);
