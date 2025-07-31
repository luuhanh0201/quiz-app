import LayoutAuth from "@/Layouts/AuthLayout";
import LayoutCreateQuizzes from "@/Layouts/LayoutCreateQuiz";
import LayoutUsers from "@/Layouts/LayoutUsers";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import MyProfile from "@/pages/ProfilePage/MyProfile";
import SettingProfile from "@/pages/ProfilePage/SettingProfile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import CreateQuiz from "@/pages/CreateQuiz";
import DetailQuiz from "@/pages/DetailQuizPage";

function NotFound() {
    return <h1>404 Not Found</h1>
}

export const publicRoutes = [
    {
        path: "/",
        component: HomePage,
        layout: LayoutUsers,
    },
    {
        path: "/create-quizzes",
        component: CreateQuiz,
        layout: LayoutCreateQuizzes,
        useRefLayout: true,
        isCheckAuth: true,
    },

    {
        path: "/quizzes/detail-quiz/:id",
        component: DetailQuiz,
        layout: LayoutUsers,
    },
    {
        path: "/signin",
        component: SignIn,
        layout: LayoutAuth,
    },
    {
        path: "/signup",
        component: SignUp,
        layout: LayoutAuth,
    },

    {
        path: "/profile/me",
        component: ProfilePage,
        layout: LayoutUsers,
        children: [
            {
                index: true,
                component: MyProfile,
            },
            {
                path: "settings",
                component: SettingProfile,
            },
        ],
    },
    {
        path: "/*",
        component: NotFound,
        layout: LayoutUsers,
    }
];
