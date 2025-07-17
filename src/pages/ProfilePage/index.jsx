import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";
import Image from "@/components/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiGetProfile } from "@/assets/db";
import { NavLink, Outlet } from "react-router-dom";

const cx = classNames.bind(styles);

function ProfilePage() {
    const HOST = import.meta.env.VITE_HOST
    const [profile, setProfile] = useState({});
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        axios
            .get(apiGetProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProfile(res.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
        }, []);
      
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header-profile")}>
                <div className={cx("title-profile")}>
                    <Image className={cx("avatar-profile")} src={HOST+profile.avatar} />
                    <h3 className={cx("")}>{profile.username}</h3>
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
            {profile.username ? (
                <Outlet context={{ profile, setProfile,HOST }} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default ProfilePage;
