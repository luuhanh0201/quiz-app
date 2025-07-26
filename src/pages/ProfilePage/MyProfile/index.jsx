import classNames from "classnames/bind";
import styles from "./MyProfile.module.scss";
import Image from "@/components/Image";
import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
const cx = classNames.bind(styles);
function MyProfile() {
    const HOST = import.meta.env.VITE_HOST
    const profile = useOutletContext()
    const [quizzes, setQuizzes] = useState([])
    const { token } = useAuth()
    useEffect(() => {
        axios.get(import.meta.env.VITE_GET_QUIZZES, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                setQuizzes(res.data.data)
            })
            .catch(err => {
                console.log("Lỗi khi gọi get quizzes:", err.response);
            });
    }, [])
    console.log(quizzes)
    const ItemQuizzes = quizzes.map((item) => {
        return (
            <div key={item.id} className={cx("quiz-item")}>
                <Image className={cx("image-item")} src={
                    item?.coverImage
                        ? item.coverImage.startsWith("http")
                            ? item.coverImage
                            : `${HOST}${item.coverImage}`
                        : images.noAvatar
                } />
                <div className={cx("content-item")}>
                    <span className={cx("name-quiz")}>{item.title}</span>
                    <p>
                        <span className={cx("quantity-quiz")}>
                            <FontAwesomeIcon icon={faQuestion} /> 22
                        </span>
                        <span className={cx("date-create-quizzes")}>45/6</span>
                    </p>
                </div>
            </div>
        )
    })
    return (
        <div>
            <div className={cx("container-profile")}>
                <ul className={cx("filter")}>
                    <li>
                        <NavLink>All</NavLink>
                    </li>
                    <li>
                        <NavLink>Public</NavLink>
                    </li>
                    <li>
                        <NavLink>Private</NavLink>
                    </li>
                </ul>
                <div className={cx("list-quiz", "grid-5")}>
                    <div className={cx("button-create-quiz")}>
                        <Link to={"/create-quizzes"} className={cx("button")}>Create Quiz</Link>
                    </div>

                    {ItemQuizzes}
                    {/* <div className={cx("quiz-item")}>
                        <Image className={cx("image-item")} src={profile.avatar || images.noImage} />
                        <div className={cx("content-item")}>
                            <span className={cx("name-quiz")}>hello, this is name quiz</span>
                            <p>
                                <span className={cx("quantity-quiz")}>
                                    <FontAwesomeIcon icon={faQuestion} /> 22
                                </span>
                                <span className={cx("date-create-quizzes")}>45/6</span>
                            </p>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default MyProfile;
