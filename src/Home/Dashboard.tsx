import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userStore";
import { Navigate } from "react-router-dom";
interface UserProfile {
  id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Dashboard() {
  const { token, logout } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/auth/profile", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserProfile(res.data.user);
      });
  }, []);
  if (!token) return <Navigate to="/user/login" />;
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-6">
            <div className="text-lg font-bold">Dashboard</div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">
              Welcome, {userProfile?.username}!
            </h2>
            <p>Email: {userProfile?.email}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Order History</h2>
            {/* Display order history here */}
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Saved Items</h2>
            {/* Display saved items here */}
          </div>
        </div>
      </main>
    </div>
  );
}
