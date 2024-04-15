import classes from "./NewTask.module.css";
export default function NewTask(props) {
    

    return (
        <>
            <form className={classes.addtask} onSubmit={props.onAdd}>
                <input type="text" placeholder="What is the task today?" className={classes.taskbody} onChange={props.newTaskText} value={props.enteredTask} />
                <button className={classes.submitBtn} type="submit">
                    Add Task
                </button>
            </form>
        </>
    );
}
