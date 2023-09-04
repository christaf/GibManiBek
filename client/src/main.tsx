import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import Root from "./routes/root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import SignIn from "./routes/signin.tsx";
import SignUp from "./routes/signup.tsx";
import Dashboard from "./routes/dashboard.tsx";
import Debt from "./routes/debt.tsx";


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
        children: [
            {
                path: "debt/:debtId",
                element: <Debt/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
