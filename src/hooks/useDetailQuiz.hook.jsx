import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrlAPI } from "@/assets/db";


export default function useDetailQuiz(quizId) {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!quizId) return;

        const fetchQuiz = async () => {
            try {
                const res = await axios.get(
                    `${baseUrlAPI}/quizzes/detail-quiz/${quizId}`
                );
                setQuiz(res.data.quiz || res.data.data);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    return { quiz, loading, error };
}
