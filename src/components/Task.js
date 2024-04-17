import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";
import useTask from "../hooks/useTask";
import classes from "../index.module.css";
export default function Task({ task, onEdit, onDelete, onCheckboxChange }) {
    const { isEditing, setIsEditing, editValue, modalIsOpen, handleEditClick, handleInputChange, handleKeyPress, openModal, closeModal } = useTask(task, onEdit);
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
                        onBlur={() => setIsEditing(false)} // Exit editing mode when focus is lost
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
                    onClick={openModal}>
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Task Details"
                className={classes.modal}
                overlayClassName={classes.overlay}>
                <h2>Task Details</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Task ID: &nbsp; &nbsp; &nbsp; </td>
                            <td>{task._id}</td>
                        </tr>
                        <tr>
                            <td>Task Description: &nbsp; &nbsp; &nbsp; </td>
                            <td>{task.taskBody}</td>
                        </tr>
                        <tr>
                            <td>Task Completence: &nbsp; &nbsp; &nbsp; </td>
                            <td>{task.completed ? "Completed" : "Pending"}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={classes.closeBtnContainer}>
                    <button
                        className={classes.closeBtn}
                        onClick={closeModal}>
                        Close
                    </button>
                </div>
            </Modal>
        </li>
    );
}
