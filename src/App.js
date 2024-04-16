import React from "react";
import RootLayout from "./components/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksBoard from "./pages/TasksBoard";
import TaskDetail from "./pages/TaskDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <TasksBoard />,
            },
            {
                path: "/tasks/:taskId",
                element: <TaskDetail />,
            },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;
export default App;
