import classNames from "classnames/bind";
import styles from "./Button.module.scss";

function Button({ className, children, type = "submit", onClick, ...rest }) {
    const cx = classNames.bind(styles);
    const classes = cx("btn-submit", className);

    return (
        <button className={classes} type={type} disabled={false} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
