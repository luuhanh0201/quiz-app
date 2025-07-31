import classNames from "classnames/bind";
import styles from "./Footer.module.scss"
import Button from "@/components/Form/Button";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("add-slide-group")}>
                <span className={cx("add-slide-text")}>Add slide</span>
                <Link to={"create-question"}><Button className={cx("add-slide-btn")}>＋</Button></Link>
            </div>
        </div>
    );
}

export default Footer;