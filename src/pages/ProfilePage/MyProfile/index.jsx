import classNames from "classnames/bind";
import styles from "./MyProfile.module.scss";
import Image from "@/components/Image";
import images from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useOutletContext } from "react-router-dom";
const cx = classNames.bind(styles);
function MyProfile() {
    const profile = useOutletContext()
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
                        <Link className={cx("button")}>Create Quiz</Link>
                    </div>
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>{" "}
                    <div className={cx("quiz-item")}>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
