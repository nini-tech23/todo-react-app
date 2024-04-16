import classes from "../index.module.css";
const Modal = (props) => {
    return (
        <>
            <div className={classes.backdrop} />
            <dialog className={classes.modal}>{props.children}</dialog>
        </>
    )
};
export default Modal;
