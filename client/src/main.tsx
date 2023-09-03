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
import Contact, {loader as contactLoader} from "./routes/contact.tsx";
import EditContact, {action as editAction} from "./routes/edit.tsx";
import {action as destroyAction} from "./routes/destroy.tsx"


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
                element: <Contact/>,
                loader: contactLoader
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact/>,
                loader: contactLoader,
                action: editAction
            },
            {
                path:"contacts/:contactId/destroy",
                action: destroyAction,
                errorElement: <div>Error when deleting!</div>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
