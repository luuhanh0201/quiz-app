import classNames from "classnames/bind";
import styles from "./WrapperForm.module.scss";
function WrapperForm({ children, onSubmit, classname, method, title, ...rest }) {
    const cx = classNames.bind(styles);

    const classes = cx("wrapper", classname);
    return (
        <form className={classes} {...rest} onSubmit={onSubmit} method={method}>
            {title && <h2 className={cx("title")}>{title}</h2>}
            {children}
        </form>
    );
}

export default WrapperForm;
