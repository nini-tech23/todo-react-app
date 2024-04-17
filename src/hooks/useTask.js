import { useState } from "react";
const useTask = (task, onEdit) => {
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
    return { isEditing, setIsEditing, editValue, handleEditClick, handleInputChange, handleKeyPress};
};
export default useTask;
