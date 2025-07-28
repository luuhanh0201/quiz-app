import classNames from "classnames/bind";
import styles from "./CreateQuiz.module.scss";
import WrapperForm from "@/components/Form/WrapperForm";
import { forwardRef, useImperativeHandle, useState } from "react";
import InputGroup from "@/components/Form/InputGroup";
import Image from "@/components/Image";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useAuthCheck } from "@/contexts/authContext";
import { baseUrlAPI } from "@/assets/db";

const cx = classNames.bind(styles);

const CreateQuiz = forwardRef((props, ref) => {
    const [isPrivate, setIsPrivate] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
        coverImage: "",
        isPublic: true
    });
    const handleUploadImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const options = {
                maxSize: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true
            }
            const compressedFile = await imageCompression(file, options);
            const imgUrl = await URL.createObjectURL(compressedFile);
            setFormData((prev) => ({ ...prev, coverImage: imgUrl, coverImageFile: compressedFile }));
        } catch (error) {
            console.error('upload image error:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            const formDataReq = new FormData()
            formDataReq.append("title", formData.title)
            formDataReq.append("description", formData.description)
            formDataReq.append("tags", formData.tags)
            formDataReq.append("isPublic", formData.isPublic)
            if (formData.coverImageFile) {
                formDataReq.append("coverImage", formData.coverImageFile);
            }
            try {
                await axios.post(`${baseUrlAPI}/quizzes/create-quizzes`, formDataReq, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    }
                })
            } catch (error) {
                console.log("upload file error:", error)
            }

        }
    }));

    return (
        <WrapperForm className={cx("wrapper")}>
            <div className={cx("media-box")}>
                {!formData.coverImage ? <></> : <Image className={cx("img-cover")} src={formData.coverImage} />}
                <InputGroup
                    onChange={handleUploadImage}
                    styleLabel={{ padding: "16px 0px" }}
                    id="avatar-upload"
                    style={{ display: "none" }}
                    label={formData.coverImage ? "Change Image" : "Upload Image"}
                    className={cx("upload-button")}
                    type="file"
                />
            </div>
            <div className={cx("form-box")}>
                <InputGroup
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    label="Quiz name"
                    type="text"
                />
                <InputGroup
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    label="Description"
                    type="textarea"
                    rows={4}
                />
                <InputGroup
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    label="Tags"
                    placeholder="Ex: Anime, Film,..."
                />
                <div className={cx("dropdown")}>
                    <span>Public</span>
                    <label className={cx("switch")}>
                        <input
                            onClick={() => setIsPrivate(!isPrivate)}
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() =>
                                setIsPrivate((prev) => ({ ...prev, isPublic: !prev.isPublic }))
                            }
                            value={formData.isPublic}
                        />
                        <span className={cx("slider")}></span>
                    </label>
                </div>
            </div>
        </WrapperForm>
    );
});

export default CreateQuiz;
