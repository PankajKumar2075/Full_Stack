import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="text-xl mt-3">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 px-5 py-2 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;