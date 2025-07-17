import LayoutAuth from "@/Layouts/AuthLayout";
import LayoutUsers from "@/Layouts/LayoutUsers";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import MyProfile from "@/pages/ProfilePage/MyProfile";
import SettingProfile from "@/pages/ProfilePage/SettingProfile";
import Quiz from "@/pages/Quiz";
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
];
