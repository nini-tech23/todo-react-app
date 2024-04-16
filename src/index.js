import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TasksBoard from "./routes/TasksBoard";
import RootLayout from "./routes/RootLayout";
import TaskDetail from "./routes/TaskDetail";
import "./index.module.css";
import "@fontsource/poppins";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <TasksBoard/>
            },
            {
                path: '/tasks/:taskId',
                element: <TaskDetail/>
            }
        ]
    },
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
