import { useParams, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import classes from "../index.module.css";
const TaskDetail = () => {
    let { taskId } = useParams();
    let navigate = useNavigate();
    const handleCloseClick = () => {
        navigate("/");
    };
    return (
        <div className={classes.taskdetailcontainer}>
            <div className={classes.iconcontainer}>
                <button
                    className={classes.closeicon}
                    onClick={handleCloseClick}>
                    <IoMdCloseCircle />
                </button>
            </div>
            <div>
                <h1>Task Details</h1>
                <p>Details for task ID: {taskId}</p>
            </div>
        </div>
    );
};
export default TaskDetail;
