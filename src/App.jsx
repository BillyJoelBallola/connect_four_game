import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import Settings from "./pages/Settings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Menu />,
        },
        {
          path: "/game",
          element: <Game />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
