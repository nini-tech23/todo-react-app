import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useTasks from "../hooks/useTasks";
import Task from "../components/Task";
import NewTask from "../components/NewTask";
import classes from "../index.module.css";

const TasksBoard = () => {
    const [filterValue, setFilter] = useState("All");
    const { newTaskText, fetchTasks, filterList, addTask, editTask, deleteTask, toggleTaskCompletion, deleteAll } = useTasks();
    // Fetch tasks from the server
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className={classes.taskBoardContainer}>
            <ToastContainer />
            <h1 className={classes.taskboardheader}>Get Things Done!</h1>
            <NewTask
                newTaskText={(e) => newTaskText(e)}
                onAdd={(e) => addTask(e)}
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
            {filterList(filterValue).length > 0 ? (
                filterList(filterValue).map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        onEdit={(newTaskValue) => editTask(task._id, newTaskValue)}
                        onDelete={() => deleteTask(task._id)}
                        onCheckboxChange={() => toggleTaskCompletion(task._id, !task.completed)}
                    />
                ))
            ) : (
                <p className={classes.notask}>No Added Tasks Yet</p> // Display this message when there are no tasks
            )}
            <div className={classes.clearBtnContainer}>
                <button
                    className={classes.clearBtn}
                    onClick={deleteAll}>
                    Clear All
                </button>
            </div>
        </div>
    );
};
export default TasksBoard;
