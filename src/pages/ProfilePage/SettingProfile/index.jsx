import classNames from "classnames/bind";
import styles from "./SettingProfile.module.scss";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import Image from "@/components/Image";
import Button from "@/components/Form/Button";
import WrapperForm from "@/components/Form/WrapperForm";
import InputGroup from "@/components/Form/InputGroup";
import { useState, useEffect } from "react";
import images from "@/assets/images";
import axios from "axios";
import { alertSuccess } from "@/components/NotificationModal";
import { useAuth } from "@/contexts/authContext";

const cx = classNames.bind(styles);

function SettingProfile() {
    const navigate = useNavigate()
    const { HOST } = useOutletContext() || {};
    let { setUser, user, logout } = useAuth();
    const [updateProfile, setUpdateProfile] = useState({
        username: user.username,
        email: user.email,
        avatar: user.avatar
    })
    useEffect(() => {
        if (user.username) {
            const fullAvatar = user.avatar?.startsWith("http")
                ? user.avatar
                : `${HOST}${user.avatar}`;
            setUpdateProfile({
                username: user.username,
                email: user.email,
                avatar: fullAvatar,
            });
        }

        return () => {
            if (updateProfile.avatar && updateProfile.avatar.startsWith('blob:')) {
                URL.revokeObjectURL(updateProfile.avatar);
            }
        }
    }, [user]);

    const handleUploadImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const imgUrl = URL.createObjectURL(file);
        setUpdateProfile((prev) => ({ ...prev, avatar: imgUrl, avatarFile: file }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const urlUpdateUser = import.meta.env.VITE_UPDATE_PROFILE + user.userId;
        const formData = new FormData();
        formData.append("username", updateProfile.username);
        if (updateProfile.avatarFile instanceof File) {
            formData.append("avatar", updateProfile.avatarFile);
        }
        try {
            const res = await axios.put(urlUpdateUser, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { newProfile } = res.data;
            const fullAvatarUrl = `${HOST}${newProfile.avatar}`;
            setUser((prev) => ({
                ...prev,
                username: newProfile.username,
                email: newProfile.email,
                avatar: fullAvatarUrl,
            }));
            setUpdateProfile((prev) => ({
                ...prev,
                avatar: fullAvatarUrl
            }));
            localStorage.setItem("user", JSON.stringify({
                ...newProfile,
                avatar: fullAvatarUrl
            }));

    
            await alertSuccess("successfully", 1000)

        } catch (err) {
            console.error(err);
        }
    };


    const handleLogout = () => {
        logout()
        navigate("/")
    }
    return (
        <div className={cx("wrapper")}>
            <WrapperForm onSubmit={handleSubmitForm} className={cx("form")}>
                <Image
                    className={cx("avatar")}
                    src={updateProfile.avatar}
                    fallback={images.noAvatar}
                />
                <InputGroup
                    onChange={handleUploadImage}
                    styleLabel={{ padding: "16px 0px" }}
                    id="avatar-upload"
                    style={{ display: "none" }}
                    label="Change profile picture"
                    className={cx("upload-button")}
                    type="file"
                />

                <InputGroup
                    onChange={(e) =>
                        setUpdateProfile((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className="input"
                    label="Username"
                    type="text"
                    value={updateProfile.username}
                />

                <InputGroup
                    className="input"
                    label="Email"
                    type="email"
                    value={updateProfile.email}
                    disabled={true}
                />

                <div className={cx("button-group")}>
                    <Button className={cx("button")}>Save</Button>
                    <Button type="button" onClick={handleLogout} className={cx("button-logout")}>Logout</Button>
                </div>
            </WrapperForm>
        </div>
    );
}

export default SettingProfile;
