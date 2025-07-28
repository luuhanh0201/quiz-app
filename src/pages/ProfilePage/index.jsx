import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";
import Image from "@/components/Image";
import { useEffect } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import images from "@/assets/images";
import { baseUrlAPI } from "@/assets/db";

const cx = classNames.bind(styles);

function ProfilePage() {
    const { token, user } = useAuth()
    console.log(`${baseUrlAPI}/users/profile-user`)
    if (!token) return <p>Loading...</p>;
    console.log(user)
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header-profile")}>
                <div className={cx("title-profile")}>
                    <Image
                        key={user?.avatar}
                        className={cx("avatar-profile")}
                        src={user?.avatar}
                        fallback={images.noAvatar}
                    />
                    <h3 className={cx("")}>{user?.username}</h3>
                </div>
                <nav className={cx("menu-profile")}>
                    <NavLink
                        to=""
                        className={({ isActive }) => cx("menu-item", { active: isActive })}
                        end
                    >
                        My Quizzes
                    </NavLink>
                    <NavLink
                        to="settings"
                        className={({ isActive }) => cx("menu-item", { active: isActive })}
                    >
                        Settings
                    </NavLink>
                </nav>
            </div>
            {user?.username ? (
                <Outlet context={{ baseUrlAPI }} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default ProfilePage;
