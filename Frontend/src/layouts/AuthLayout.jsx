import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <Outlet />
    </div>
  );
}

export default AuthLayout;