import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";
import Button from "@/components/Form/Button";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import QuizItem from "../components/QuizItems";
import useQuizzes from "@/hooks/useQuizzes.hook";
const cx = classNames.bind(styles);
const tags = [
    { id: 1, label: "Start" },
    { id: 5, label: "History" },
];
function HomePage() {
    const [active, setActive] = useState(0);
    const scrollRef = useRef();
    const { quizzes, err, loading } = useQuizzes()
    const { allQuizzes, latest, mostLiked } = quizzes
    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = container?.offsetWidth * 0.8 || 300;

        container?.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };


    return (
        <div className={cx("wrapper")}>
            <div className={cx("card-container")}>
                <div className={cx("card")}>
                    <h2 className={cx("title")}>Create a quiz</h2>
                    <p className={cx("desc")}>Create a free quiz and <br />play with everyone.</p>
                    <Link to={"/create-quizzes"}><Button className={cx("btn-create-quiz")}>Create now!</Button></Link>
                </div>
                <div className={cx("card")}>
                    <h2 className={cx("title")}>Coming soon</h2>
                </div>
            </div>
            <div className={cx("wrapper-nav")}>
                <button className={cx("navBtn", "left")} onClick={() => scroll("left")}><FontAwesomeIcon icon={faAngleLeft} /></button>

                <nav className={cx("nav")} ref={scrollRef}>
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className={cx("item", { active: active === index })}
                            onClick={() => setActive(index)}
                        >
                            <span>{tag.label}</span>
                        </div>
                    ))}
                </nav>

                <button className={cx("navBtn", "right")} onClick={() => scroll("right")}><FontAwesomeIcon icon={faAngleRight} /></button>
            </div>

            <div className={cx("wrapper-quizzes")}>
                <h2 className={cx("quizzes-title")}>New quizzes</h2>
                <div className={cx("grid-5")}>
                    {
                        latest.map((quiz, index) => {
                            
                            return (<div key={index}>
                                <QuizItem id={quiz.id} title={quiz.title} quizCount={quiz.quizCount} createdAt={quiz.createdAt} coverImage={quiz.coverImage} username={quiz.username} likes={quiz.likes} />
                            </div>)
                        })
                    }
                </div>
            </div>

            <div className={cx("wrapper-quizzes")}>
                <h2 className={cx("quizzes-title")}>Top like</h2>
                <div className={cx("grid-5")}>
                    {
                        mostLiked.map((quiz, index) => {
                        
                            return (<div key={index}>
                                <QuizItem id={quiz.id} title={quiz.title} quizCount={quiz.quizCount} createdAt={quiz.createdAt} coverImage={quiz.coverImage} username={quiz.username} likes={quiz.likes} />
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
