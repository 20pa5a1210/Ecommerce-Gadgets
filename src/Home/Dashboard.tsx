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
    <div className="flex flex-wrap">
      <h1>Dashboard</h1>

      {userProfile && (
        <div>
          <h1>{userProfile.username}</h1>
          <h1>{userProfile.email}</h1>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
