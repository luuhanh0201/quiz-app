import classNames from "classnames/bind";
import styles from "./InputGroup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function InputGroup({
    error,
    label,
    rightIcon,
    type = "text",
    placeholder,
    className,
    value,
    onChange,
    onClick,
    autoComplete,
    ...rest
}) {
    const classes = cx("wrapper", className);
    return (
        <div className={classes} {...rest}>
            <label className={cx("label")}>
                {label}
                {rightIcon && (
                    <span className={cx("icon")} onClick={onClick}>
                        {<FontAwesomeIcon icon={rightIcon} />}
                    </span>
                )}
            </label>
            <input
                className={cx("input")}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
            />
            <p className={cx("error")}>{error}</p>
        </div>
    );
}

export default InputGroup;
