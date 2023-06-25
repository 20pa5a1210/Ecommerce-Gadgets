import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userStore";
import { Link, Navigate } from "react-router-dom";
interface UserProfile {
  id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Dashboard() {
  const { token, setUser, logout } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  console.log(userProfile);

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    axios
      .get("http://localhost:8080/user/auth/profile", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setUserProfile(res.data.user);
        setUser(res.data.user.username);
      });
  };

  useEffect(() => {
    handleProfile();
  }, []);
  if (!token) return <Navigate to="/user/login" />;
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center py-6">
            <div className="text-lg font-bold">Dashboard</div>
            <Link to="/">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="black"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="text-black text-2xl font-bold ml-2">ShopCart</h1>
              </div>
            </Link>
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
