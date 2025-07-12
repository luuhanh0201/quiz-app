import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "@/assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link to={"/"}>
                    <img className={cx("logo")} src={logo} />
                </Link>

                <div className={cx("input-search")}>
                    <p className={cx("lable")}>Join room: </p>
                    <input
                        className={cx("input")}
                        type="text"
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key) || e.target.value.length >= 6) {
                                e.preventDefault();
                            }
                        }}
                        placeholder="Enter PIN"
                    />
                </div>

                <div className={cx("action-btn")}>
                    <div>
                        <FontAwesomeIcon className={cx("icon-search")} icon={faMagnifyingGlass} />
                    </div>
                    <Link to={"/signin"} className={cx("btn-signin")} type="submit">
                        Sign In
                    </Link>
                    <Link to={"/signup"} className={cx("btn-signup")} type="submit">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
