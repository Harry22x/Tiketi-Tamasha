import React from "react";
import App from "./App";
import ReactDOM from 'react-dom/client';
import "./index.css";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { createRoot } from "react-dom/client";
import routes from "./routes";
 

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  <RouterProvider router={router} />)