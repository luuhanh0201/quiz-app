import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrlAPI } from "@/assets/db";


export default function useQuizzes() {
    const [quizzes, setQuizzes] = useState({
        all: [],
        mostLiked: [],
        latest: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get(`${baseUrlAPI}/quizzes/all`);
                const allQuizzes = res.data.quizzes.allQuizzes
                const latestQuizzes = res.data.quizzes.latest
                const mostLiked = res.data.quizzes.mostLiked
                setQuizzes({
                    allQuizzes,
                    mostLiked: mostLiked,
                    latest: latestQuizzes,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    return { quizzes, loading, error };
}
