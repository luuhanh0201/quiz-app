import classNames from "classnames/bind";
import styles from "./Footer.module.scss"
import Button from "@/components/Form/Button";
const cx = classNames.bind(styles)
function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("add-slide-group")}>
                <span className={cx("add-slide-text")}>Add slide</span>
                <Button className={cx("add-slide-btn")}>＋</Button>
            </div>
        </div>
    );
}

export default Footer;