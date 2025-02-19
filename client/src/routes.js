import LandingPage from "./Pages/LandingPage";
import App from "./App";
import AddTicket from "./Pages/AddTicket";
import EventPage from "./Pages/EventPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/add-ticket", element: <AddTicket /> },
      {path:"/events/:id", element: <EventPage/>}
      
    ],
  },
];

export default routes;
