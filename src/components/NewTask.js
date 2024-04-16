import classes from "../index.module.css";
const NewTask = ({ onAdd, newTaskText, enteredTask}) => {
    return (
            <form
                className={classes.addtask}
                onSubmit={onAdd}>
                <input
                    type="text"
                    placeholder="What is the task today?"
                    className={classes.taskbody}
                    onChange={newTaskText}
                    value={enteredTask}
                />
                <button
                    className={classes.submitBtn}
                    type="submit">
                    Add Task
                </button>
            </form>
    );
};
export default NewTask;
