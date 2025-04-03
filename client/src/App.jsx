import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  { 
    path: "/login",
    element: <Login />,

    path: "/register",
    element: <Register />,

    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  }])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
