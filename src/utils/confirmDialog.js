import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS

const CustomConfirmAlert = ({ title, message, onConfirm }) => {
    const submit = () => {
        confirmAlert({
            title: title,
            message: message,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => onConfirm(),
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
            overlayClassName: "overlay-custom-class-name",
        });
    };

    return { submit };
};

export default CustomConfirmAlert;
