import { useState, useEffect} from "react";
import { ToastContainer } from "react-toastify";

import { showErrorToast } from "../utils/toastNot";
import useTasks from "../hooks/useTasks";
import CustomConfirmAlert from "../utils/confirmDialog";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import classes from "../index.module.css";

const TasksBoard = () => {
    const [enteredTask, setEnteredTask] = useState("");
    const [filterValue, setFilter] = useState("All");
    const {allTasks, fetchTasks, addTask, editTask, deleteTask, toggleTaskCompletion, deleteAll} = useTasks();
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

    const newTaskText = (e) => {
        setEnteredTask(e.target.value);
    };

    const addTaskHandler = (e) => {
        e.preventDefault();
        if (!enteredTask.trim()) {
            showErrorToast("Please enter a task");
            return;
        }
        addTask(enteredTask);
        setEnteredTask('');
    };
    // Edit task handler
    const taskEditHandler = (index, newTaskValue) => {
        const task = allTasks[index];
        editTask(task._id, newTaskValue)
    };
    //Task delete handler
    const taskDeleteHandler = (taskToDelete) => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to delete this task?",
            onConfirm: () => {
                deleteTask(taskToDelete._id)
            },
        });
        confirm.submit();
    };

    //Task check handler
    const taskCheckHandler = (index) => {
        const task = allTasks[index];
        toggleTaskCompletion(task._id, !task.completed);
    };
    //clearAll handler
    const clearAllHandler = () => {
        const confirm = CustomConfirmAlert({
            title: "Confirm Delete",
            message: "Are you sure to delete ALL tasks?",
            onConfirm: () => {
                deleteAll();
            },
        });

        confirm.submit();
    };

    return (
        <div className={classes.taskBoardContainer}>
            <ToastContainer />
            <h1 className={classes.taskboardheader}>Get Things Done!</h1>
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
        </div>
    );
};
export default TasksBoard;
