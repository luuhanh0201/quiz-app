import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "@/assets/logo.svg";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link to={"/"}>
                    <img className={cx("logo")} src={logo} />
                </Link>
            </div>
        </div>
    );
}

export default Header;
