import { useState, useCallback } from "react";
import { showSuccessToast, showErrorToast } from "../utils/toastNot";
import API from "../Api";

const useTasks = () => {
    const [allTasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await API.get("/tasks");
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            showErrorToast("Failed to fetch tasks");
        }
    }, []);

    const addTask = async (enteredTask) => {
        try {
            await API.post("/tasks", { taskBody: enteredTask, completed: false });
            await fetchTasks();
            showSuccessToast("Task successfully added!");
        } catch (error) {
            console.error("Error adding task:", error);
            showErrorToast("Failed to add task");
        }
    };

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

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            await fetchTasks();
            showSuccessToast("Task successfully deleted!");
        } catch (error) {
            console.error("Error deleting task:", error);
            showErrorToast("Failed to delete task");
        }
    };

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
    const deleteAll = async () => {
        try {
            await API.delete("/tasks/all");
            await fetchTasks();
            showSuccessToast("All tasks successfully deleted!");
        } catch (error) {
            console.error("Error deleting all tasks:", error);
            showErrorToast("Failed to delete all tasks");
        }
    };

    return { allTasks, fetchTasks, addTask, editTask, deleteTask, toggleTaskCompletion, deleteAll };
};

export default useTasks;
