import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/:username",
    element: <UserProfile />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
