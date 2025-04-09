import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./layouts/Main";
import Dashboard from "./pages/Dashboard";
import ManageEvents from "./pages/ManageEvents";
import DashboardLayout from "./layouts/DashboardLayout";
import EventInsights from "./pages/EventInsights";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Logout from "./pages/Logout";
import { loadUser } from "./store/slices/authSlice";

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
    path: "/logout",
    element: <Logout />,
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
  {
    path: "/:username",
    element: <UserProfile />,
  },
]);

function App() {
  // Load user on app load
  useEffect(() => {
    const state = store.getState();
    const { accessToken, user } = state.auth;

    if (accessToken && !user) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
