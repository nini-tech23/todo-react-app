import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import useTask from "../hooks/useTask";
import { default as openModal } from "../hooks/useDetailView";
import classes from "../index.module.css";
const Task = ({ task, onEdit, onDelete, onCheckboxChange }) => {
    const { isEditing, setIsEditing, editValue, handleEditClick, handleInputChange, handleKeyPress } = useTask(task, onEdit);
    return (
        <li>
            <div>
                <input
                    type="checkbox"
                    className={classes.checkbox}
                    checked={task.completed}
                    onChange={onCheckboxChange}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => handleInputChange(e)}
                        onKeyDown={(e) => handleKeyPress(e)}
                        onBlur={() => setIsEditing(false)}
                        className={classes.editingTaskInput}
                        autoFocus
                    />
                ) : (
                    <span
                        className={task.completed ? classes.strikeThrough : ""}
                        onDoubleClick={handleEditClick}>
                        {task.taskBody}
                    </span>
                )}
            </div>
            <div>
                <button
                    className={classes.detailBtn}
                    onClick={() => openModal(task)}>
                    <CgDetailsMore />
                </button>
                <button
                    className={classes.editBtn}
                    onClick={handleEditClick}>
                    <FaEdit />
                </button>
                <button
                    className={classes.delBtn}
                    onClick={onDelete}>
                    <MdDelete />
                </button>
            </div>
        </li>
    );
};
export default Task;
