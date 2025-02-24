import LandingPage from "./Pages/LandingPage";
import App from "./App";
import AddTicket from "./Pages/AddTicket";
import EventPage from "./Pages/MoreEvents";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/Profile";
import CreateEvent from "./Pages/CreateEvent";
import MoreEvents from "./Pages/MoreEvents";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/add-ticket", element: <AddTicket /> },
      {path:"/events/:id", element: <EventPage/>},
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      {path:"/profile", element: <ProfilePage/>},      
      { path:"/create-event",element: <CreateEvent /> },
      {path:"/more-events", element:<MoreEvents />}
    ],
  },
];

export default routes;
