import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";
import Image from "@/components/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import images from "@/assets/images";

const cx = classNames.bind(styles);

function ProfilePage() {
    const HOST = import.meta.env.VITE_HOST
    const { token, user, setUser } = useAuth()
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_GET_PROFILE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
    }, [token]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header-profile")}>
                <div className={cx("title-profile")}>
                    <Image
                        className={cx("avatar-profile")}
                        src={
                            user?.avatar
                                ? user.avatar.startsWith("http")
                                    ? user.avatar
                                    : `${HOST}${user.avatar}`
                                : images.noAvatar
                        }
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
                <Outlet context={{ HOST }} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default ProfilePage;
