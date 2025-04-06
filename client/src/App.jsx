import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Main from "./layouts/Main";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import DashboardLayout from "./layouts/DashboardLayout";
import EventInsights from "./pages/EventInsights";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
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
    path: "/organizer",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "events",
        children: [
          {
            index: true,
            element: <ManageEvents />,
          },
          {
            path: ":eventId",
            element: <EventInsights />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
