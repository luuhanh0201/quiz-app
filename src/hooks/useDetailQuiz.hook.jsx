import { useEffect, useState } from "react";
import axios from "axios";


export default function useDetailQuiz(quizId) {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!quizId) return;

        const fetchQuiz = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_GET_DETAIL_QUIZ}${quizId}`
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
