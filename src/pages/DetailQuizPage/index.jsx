import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from "./DetailQuizPage.module.scss";
import Button from '@/components/Form/Button';
import { useAuth } from '@/contexts/authContext';
import { useParams } from 'react-router-dom';
import Image from '@/components/Image';
import useDetailQuiz from '@/hooks/useDetailQuiz.hook';
import { baseUrlAPI } from '@/assets/db';

const cx = classNames.bind(styles);

function DetailQuiz() {
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(2);
    const { id } = useParams();
    const { user } = useAuth()
    const { quiz, loading, error } = useDetailQuiz(id);
    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!quiz) return <div>No quiz found</div>;

    console.log("Quiz id: ", quiz.userId)
    console.log("user id: " + user.userId)
    const handleLike = () => {
        setIsLiked(!isLiked);
        setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className={cx("detail-quiz-container")}>
            {/* Quiz Image */}
            <div className={cx("quiz-image-section")}>
                <Image
                    src={baseUrlAPI + quiz.coverImage}
                    className={cx("quiz-cover-image")}
                />
                <div className={cx("image-overlay")}>
                    <button
                        className={cx("like-btn", { "liked": isLiked })}
                        onClick={handleLike}
                    >
                        <span className={cx("heart-icon")}>❤️</span>
                        <span>{currentLikes}</span>
                    </button>
                </div>
            </div>

            {/* Quiz Info */}
            <div className={cx("quiz-info-section")}>
                {/* User Info */}
                <div className={cx("user-info")}>
                    <span className={cx("user-icon")}>👤</span>
                    <span className={cx("username")}>{quiz.username}</span>
                </div>

                {/* Quiz Title */}
                <h1 className={cx("quiz-title")}>{quiz.title}</h1>

                {/* Quiz Meta */}
                <div className={cx("quiz-info")}>
                    <span className={cx("info-item")}>
                        <span className={cx("icon")}>❓</span>
                        {quiz.questions || 0} questions
                    </span>
                    <span className={cx("info-item")}>
                        <span className={cx("icon")}>{quiz.isPublic ? '🌐' : '🔒'}</span>
                        {quiz.isPublic ? 'Public' : 'Private'}
                    </span>
                    <span className={cx("info-item")}>
                        <span className={cx("icon")}>🕒</span>
                        Created {new Date(quiz.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className={cx("action-buttons")}>
                    <Button className={cx("btn-action")}>
                        <span className={cx("icon")}>▶️</span>
                        Play Now
                    </Button>
                    {quiz.userId === user.userId && (<Button className={cx("btn-action")}>
                        <span className={cx("icon")}>✏️</span>
                        Edit
                    </Button>)}
                    <Button className={cx("btn-icon")}>
                        <span className={cx("icon")}>📤</span>
                    </Button>
                    {
                        quiz.userId === user.userId && (<Button className={cx("btn-icon")}>
                            <span className={cx("icon")}>⋯</span>
                        </Button>)
                    }
                </div>

                {/* Quiz Description */}
                {quiz.description && (
                    <div className={cx("quiz-description")}>
                        <p>{quiz.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailQuiz;