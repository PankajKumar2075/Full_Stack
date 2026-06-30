import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import NotificationsPage from "../pages/Notifications/NotificationsPage";
import SearchPage from "../pages/Search/SearchPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;