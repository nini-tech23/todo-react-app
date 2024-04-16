import { useState, useCallback } from "react";
import { showSuccessToast, showErrorToast } from "../utils/toastNot";
import CustomConfirmAlert from "../utils/confirmDialog";
import API from "../Api";

const useTasks = () => {
    const [enteredTask, setEnteredTask] = useState("");
    const [allTasks, setTasks] = useState([]);
    // fetch all tasks
    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await API.get("/tasks");
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            showErrorToast("Failed to fetch tasks");
        }
    }, []);
    //filter tasks based on the filtervalue
    const filterList = (filterValue) => {
        return allTasks.filter((task) => {
            switch (filterValue) {
                case "All":
                    return true;
                case "Pending":
                    return !task.completed;
                case "Completed":
                    return task.completed;
                default:
                    return true;
            }
        });
    };

    //get entered text from new task
    const newTaskText = (e) => {
        setEnteredTask(e.target.value);
    };
    //add task
    const addTask = async (e) => {
        e.preventDefault();
        if (!enteredTask.trim()) {
            showErrorToast("Please enter a task");
            return;
        }
        try {
            await API.post("/tasks", { taskBody: enteredTask, completed: false });
            await fetchTasks();
            showSuccessToast("Task successfully added!");
            setEnteredTask("");
        } catch (error) {
            console.error("Error adding task:", error);
            showErrorToast("Failed to add task");
        }
    };
    //edit task
    const editTask = async (id, newTaskBody) => {
        try {
            await API.put(`/tasks/${id}`, { taskBody: newTaskBody });
            await fetchTasks();
            showSuccessToast("Task successfully edited!");
        } catch (error) {
            console.error("Error updating task:", error);
            showErrorToast("Failed to edit task");
        }
    };
    //delete task
    const deleteTask = async (id) => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this task?",
            onConfirm: async () => {
                try {
                    await API.delete(`/tasks/${id}`);
                    await fetchTasks();
                    showSuccessToast("Task successfully deleted!");
                } catch (error) {
                    console.error("Error deleting task:", error);
                    showErrorToast("Failed to delete task");
                }
            },
        });
        confirm.submit();
    };
    //change task status
    const toggleTaskCompletion = async (id, completed) => {
        try {
            await API.put(`/tasks/${id}`, { completed: completed });
            await fetchTasks();
            showSuccessToast("Task completion status updated!");
        } catch (error) {
            console.error("Error updating task status:", error);
            showErrorToast("Failed to update task status");
        }
    };
    //delete all tasks
    const deleteAll = () => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure to delete ALL tasks?",
            onConfirm: async () => {
                try {
                    await API.delete("/tasks/all");
                    await fetchTasks();
                    showSuccessToast("All tasks successfully deleted!");
                } catch (error) {
                    console.error("Error deleting all tasks:", error);
                    showErrorToast("Failed to delete all tasks");
                }
            },
        });
        confirm.submit();
    };

    return { newTaskText, fetchTasks, filterList, addTask, editTask, deleteTask, toggleTaskCompletion, deleteAll };
};

export default useTasks;
