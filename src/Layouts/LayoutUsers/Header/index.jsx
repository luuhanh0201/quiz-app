import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "@/assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Image from "@/components/Image";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Header() {
    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState({})
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setIsUser(true);
            const user = JSON.parse(localStorage.getItem("user"))
            setUser(user)
        } else {
            setIsUser(false);
        }

    }, [isUser]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link to={"/"}>
                    <img className={cx("logo")} src={logo} />
                </Link>

                <div className={cx("input-search")}>
                    <p className={cx("label")}>Join room: </p>
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
                        {isUser ? (
                            <div className={cx("user-toolbar")}>
                                <div className={cx("search-wrapper")}>
                                    <input className={cx("search-input")} type="text" placeholder="Search quiz..." />
                                    <FontAwesomeIcon className={cx("icon-search")} icon={faMagnifyingGlass} />
                                </div>
                                <Link className={cx("avatar-user")} to={"/profile/me"}>
                                    <Image className={cx("avatar-user")} src={user.avatar} />
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/signin"} className={cx("btn-signin")} type="submit">
                                    Sign In
                                </Link>
                                <Link to={"/signup"} className={cx("btn-signup")} type="submit">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
