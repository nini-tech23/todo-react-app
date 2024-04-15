import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import classes from "../index.module.css";

export default function Task({ task, onEdit, onDelete, onCheckboxChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.taskBody);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleInputChange = (e) => {
        setEditValue(e.target.value);
    };

    // Handle key press events in the input field
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onEdit(editValue); // Save the changes
            setIsEditing(false); // Exit editing mode
        }
    };
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
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
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
}
