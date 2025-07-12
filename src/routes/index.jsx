import LayoutAuth from "@/Layouts/AuthLayout";
import LayoutUsers from "@/Layouts/LayoutUsers";
import HomePage from "@/pages/HomePage";
import Quiz from "@/pages/Quizz";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const publicRoutes = [
    {
        path: "/",
        component: HomePage,
        layout: LayoutUsers,
    },
    {
        path: "/quiz",
        component: Quiz,
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
];
