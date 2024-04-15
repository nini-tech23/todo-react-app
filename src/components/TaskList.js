import Task from "./Task";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../utils/toastNot";
import classes from "./TaskList.module.css";
import CustomConfirmAlert from "../utils/confirmDialog";
export default function TaskList() {
    const [enteredTask, setEnteredTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [filterValue, setFilter] = useState("All");
    // Fetch tasks from the server
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/tasks");
                const data = await response.json();
                setAllTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);
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

    let newTaskText = (e) => {
        setEnteredTask(e.target.value);
    };

    function addTaskHandler(e) {
        e.preventDefault();
        if (!enteredTask.trim()) {
            showErrorToast("Please enter a task");
            return;
        }
        fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskBody: enteredTask,
                completed: false,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setAllTasks((prevTasks) => [...prevTasks, data]);
                showSuccessToast("Task successfully added!");
                setEnteredTask("");
            })
            .catch((error) => {
                console.error("Error adding task:", error);
                showErrorToast("Failed to add task");
            });
    }
    // Edit task handler
    function taskEditHandler(index, newTaskValue) {
        const task = allTasks[index];
        fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...task,
                taskBody: newTaskValue,
            }),
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                setAllTasks((prevTasks) => prevTasks.map((item, idx) => (idx === index ? updatedTask : item)));
                showSuccessToast("Task successfully edited!");
            })
            .catch((error) => {
                console.error("Error updating task:", error);
                showErrorToast("Failed to edit task");
            });
    }
    //Task delete handler
    function taskDeleteHandler(taskToDelete) {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this task?",
            onConfirm: () => {
                fetch(`http://localhost:5000/tasks/${taskToDelete._id}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then(() => {
                        setAllTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete._id));
                        showSuccessToast("Task successfully deleted!");
                    })
                    .catch((error) => {
                        console.error("Error deleting task:", error);
                        showErrorToast("Failed to delete task");
                    });
            },
        });

        confirm.submit();
    }

    //Task check handler
    function taskCheckHandler(index) {
        const task = allTasks[index];
        fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...task,
                completed: !task.completed,
            }),
        })
            .then((response) => response.json())
            .then((updatedTask) => {
                setAllTasks((prevTasks) => prevTasks.map((item, idx) => (idx === index ? updatedTask : item)));
                showSuccessToast("Task completion status updated!");
            })
            .catch((error) => {
                console.error("Error updating task status:", error);
                showErrorToast("Failed to update task status");
            });
    }
    //clearAll handler
    function clearAllHandler() {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to delete ALL tasks?",
            onConfirm: () => {
                fetch("http://localhost:5000/tasks/all", {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        showSuccessToast("All tasks deleted successfully");
                    })
                    .catch((error) => {
                        console.error("Error deleting all tasks:", error);
                        showErrorToast("Failed to delete all");
                    });
            },
        });

        confirm.submit();
    }

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
}
