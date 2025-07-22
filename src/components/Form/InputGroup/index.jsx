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
    style,
    styleLabel,
    id,
    src,
    disabled = false,
    rows,
    ...rest
}) {
    const classes = cx("wrapper", className);
    let Comp = "input"
    if (type === "textarea") {
        Comp = "textarea"
    } else {
        Comp = "input"
    }
    return (
        <div className={classes} {...rest}>
            <label style={styleLabel} htmlFor={id} className={cx("label")}>
                {label}
                {rightIcon && (
                    <span className={cx("icon")} onClick={onClick}>
                        {<FontAwesomeIcon icon={rightIcon} />}
                    </span>
                )}
            </label>
            <Comp
                src={src}
                id={id}
                style={style}
                className={cx("input")}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                disabled={disabled}
                rows={rows} />
            <p className={cx("error")}>{error}</p>
        </div>
    );
}

export default InputGroup;
