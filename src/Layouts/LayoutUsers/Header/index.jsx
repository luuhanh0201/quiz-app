import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "@/assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Image from "@/components/Image";
import { useAuth } from "@/contexts/authContext";
import images from "@/assets/images";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Header() {
    const { user } = useAuth()
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className={cx("wrapper", { sticky: isSticky })}>
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
                        {user ? (
                            <div className={cx("user-toolbar")}>
                                <div className={cx("search-wrapper")}>
                                    <input className={cx("search-input")} type="text" placeholder="Search quiz..." />
                                    <FontAwesomeIcon className={cx("icon-search")} icon={faMagnifyingGlass} />
                                </div>
                                <Link className={cx("avatar-user")} to={"/profile/me"}>
                                    <Image
                                        className={cx("avatar-user")}
                                        src={user.avatar?.startsWith("http") ? user.avatar : `${import.meta.env.VITE_HOST}${user.avatar}`}
                                        fallback={images.noAvatar}
                                    />
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
