import { useParams, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import Modal from "../components/Modal";
import classes from "../index.module.css";
const TaskDetail = () => {
    let { taskId } = useParams();
    let navigate = useNavigate();
    const handleCloseClick = () => {
        navigate("/");
    };
    return (
        <Modal>
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
        </Modal>
    );
};
export default TaskDetail;
