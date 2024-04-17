import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const goToHome = () => navigate('/');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
            {!!user && (<h1 className="text-xl text-gray-700 mb-4">Hi {user.name}!</h1>)}
            <button
                onClick={goToHome}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
                Go to Home
            </button>
        </div>
    );
}
