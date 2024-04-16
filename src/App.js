import React from "react";
import RootLayout from "./components/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TasksBoard from "./pages/TasksBoard";
import Modal from "react-modal";
Modal.setAppElement('#root'); 
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <TasksBoard />,
            },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;
export default App;
