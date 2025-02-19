import LandingPage from "./Pages/LandingPage";
import App from "./App";
import AddTicket from "./Pages/AddTicket";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "add-ticket", element: <AddTicket /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      
      
    ],
  },
];

export default routes;
