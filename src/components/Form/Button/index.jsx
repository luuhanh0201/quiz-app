import classNames from "classnames/bind";
import styles from "./Button.module.scss";

function Button({ className, children, type = "submit", onClick, ...rest }) {
    const cx = classNames.bind(styles);
    const classes = cx("wrapper", className);

    return (
        <div className={classes} {...rest}>
            <button className={cx("btn-submit")} type={type} disabled={false} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}

export default Button;
