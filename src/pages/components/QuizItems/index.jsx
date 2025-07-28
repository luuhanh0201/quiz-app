import images from "@/assets/images";
import classNames from "classnames/bind";
import styles from "./QuizItems.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHeart, faQuestion, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "@/components/Image";
import { Link } from "react-router-dom";
import { baseUrlAPI } from "@/assets/db";
const cx = classNames.bind(styles)
function QuizItem({ id, title, quizCount, createdAt, coverImage, username, likes }) {

    return (
        <Link to={"/quizzes/detail-quiz/" + id} key={id} className={cx("quiz-item")}>
            <div className={cx("quiz-image-container")}>
                <Image className={cx("quiz-image")} src={`${baseUrlAPI}${coverImage}`} alt={title} />
                <div className={cx("quiz-overlay")}>
                    <span className={cx("question-count")}>
                        <FontAwesomeIcon icon={faQuestion} />
                        {quizCount ?? 0} questions
                    </span>
                </div>
            </div>

            <div className={cx("quiz-content")}>
                <h3 className={cx("quiz-title")}>{title}</h3>

                <div className={cx("quiz-meta")}>
                    <div className={cx("author-info")}>
                        <FontAwesomeIcon icon={faUser} className={cx("author-icon")} />
                        <span className={cx("username")}>@{username}</span>
                    </div>

                    <div className={cx("quiz-stats")}>
                        <div className={cx("like-count")}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{likes ?? 0}</span>
                        </div>

                        <span className={cx("created-date")}>
                            <FontAwesomeIcon icon={faCalendar} />
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default QuizItem
