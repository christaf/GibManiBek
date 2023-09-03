import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import SignIn from "./routes/signin.tsx";
import SignUp from "./routes/signup.tsx";
import Dashboard, {
    loader as dashboardLoader,
    action as dashboardAction,
} from "./routes/dashboard.tsx";
import Contact from "./routes/contact.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/login",
        element: <SignIn/>,
    },
    {
        path: "/register",
        element: <SignUp/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        errorElement: <ErrorPage/>,
        loader: dashboardLoader,
        action: dashboardAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
