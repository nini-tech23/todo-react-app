import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../utils/toastNot";
import CustomConfirmAlert from "../utils/confirmDialog";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import classes from "../index.module.css";
const HomePage = () => {
    const [enteredTask, setEnteredTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [filterValue, setFilter] = useState("All");
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await axios.get(apiUrl);
            setAllTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, [apiUrl]);

    // Fetch tasks from the server
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const filteredTasks = allTasks.filter((task) => {
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
    // Add task handler
    // function newTaskText(e) {
    //     setEnteredTask(e.target.value);
    // }

    const newTaskText = (e) => {
        setEnteredTask(e.target.value);
    };

    const addTaskHandler = (e) => {
        e.preventDefault();
        if (!enteredTask.trim()) {
            showErrorToast("Please enter a task");
            return;
        }
        axios
            .post(apiUrl, {
                taskBody: enteredTask,
                completed: false,
            })
            .then(() => {
                fetchTasks();
                showSuccessToast("Task successfully added!");
                setEnteredTask("");
            })
            .catch((error) => {
                console.error("Error adding task:", error);
                showErrorToast("Failed to add task");
            });
    };
    // Edit task handler
    const taskEditHandler = (index, newTaskValue) => {
        const task = allTasks[index];
        axios
            .put(`${apiUrl}/${task._id}`, {
                ...task,
                taskBody: newTaskValue,
            })
            .then(() => {
                fetchTasks();
                showSuccessToast("Task successfully edited!");
            })
            .catch((error) => {
                console.error("Error updating task:", error);
                showErrorToast("Failed to edit task");
            });
    };
    //Task delete handler
    const taskDeleteHandler = (taskToDelete) => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this task?",
            onConfirm: () => {
                axios
                    .delete(`${apiUrl}/${taskToDelete._id}`)
                    .then(() => {
                        fetchTasks();
                        showSuccessToast("Task successfully deleted!");
                    })
                    .catch((error) => {
                        console.error("Error deleting task:", error);
                        showErrorToast("Failed to delete task");
                    });
            },
        });

        confirm.submit();
    };

    //Task check handler
    const taskCheckHandler = (index) => {
        const task = allTasks[index];
        axios
            .put(`${apiUrl}/${task._id}`, {
                ...task,
                completed: !task.completed,
            })
            .then(() => {
                fetchTasks();
                showSuccessToast("Task completion status updated!");
            })
            .catch((error) => {
                console.error("Error updating task status:", error);
                showErrorToast("Failed to update task status");
            });
    };
    //clearAll handler
    const clearAllHandler = () => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure to delete ALL tasks?",
            onConfirm: () => {
                axios
                    .delete(`${apiUrl}/all`)
                    .then(() => {
                        fetchTasks();
                        showSuccessToast("All tasks deleted successfully");
                    })
                    .catch((error) => {
                        console.error("Error deleting all tasks:", error);
                        showErrorToast("Failed to delete all");
                    });
            },
        });

        confirm.submit();
    };

    return (
        <>
            <ToastContainer />
            <NewTask
                newTaskText={newTaskText}
                onAdd={addTaskHandler}
                enteredTask={enteredTask}
            />
            <div className={classes.filteringTasks}>
                <button
                    className={filterValue === "All" ? classes.activeFilter : classes.nonactiveFilter}
                    onClick={() => setFilter("All")}>
                    All Tasks
                </button>
                <button
                    className={filterValue === "Pending" ? classes.activeFilter : classes.nonactiveFilter}
                    onClick={() => setFilter("Pending")}>
                    Pending
                </button>
                <button
                    className={filterValue === "Completed" ? classes.activeFilter : classes.nonactiveFilter}
                    onClick={() => setFilter("Completed")}>
                    Completed
                </button>
            </div>
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                    <Task
                        key={task._id}
                        task={task}
                        onEdit={(newTaskValue) => taskEditHandler(index, newTaskValue)}
                        onDelete={() => taskDeleteHandler(task)}
                        onCheckboxChange={() => taskCheckHandler(index)}
                    />
                ))
            ) : (
                <p className={classes.notask}>No Added Tasks Yet</p> // Display this message when there are no tasks
            )}
            <div className={classes.clearBtnContainer}>
                <button
                    className={classes.clearBtn}
                    onClick={clearAllHandler}>
                    Clear All
                </button>
            </div>
        </>
    );
};
export default HomePage;
