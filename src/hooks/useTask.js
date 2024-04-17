import { useState } from "react";
const useTask = (task, onEdit) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.taskBody);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return { isEditing, setIsEditing, editValue, modalIsOpen, handleEditClick, handleInputChange, handleKeyPress, openModal, closeModal };
};
export default useTask;
