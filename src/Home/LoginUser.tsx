import { useContext, useState } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userStore";
import Modal from "./utils/Modal";
import Loading from "./utils/Loading";

interface FormData {
  email: string;
  password: string;
}

export default function LoginUser() {
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState("");
  const { token, login } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    setLoading(true);

    axios
      .post("http://localhost:8080/user/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        login(res.data.token);
        console.log(res.data.token);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setErrorModal(true);
        console.log(error.response.data.error);
      });

    setLoading(false);
  };
  if (token) return <Navigate to="/user/dashboard" />;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      {errorModal && (
        <Modal open={errorModal} setOpen={setErrorModal} message={error} />
      )}
      <div className="flex flex-col h-screen w-screen md:flex-row items-center justify-center mx-auto bg-gray-400/50">
        <div className="w-full  md:w-1/2 bg-white rounded-lg shadow-md p-8 m-4">
          <h2 className="text-2xl font-bold mb-4">User Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="userEmail"
                className="block text-gray-700 font-bold"
              >
                User Email
              </label>
              <input
                type="email"
                id="userEmail"
                {...register("email", { required: true })}
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-500">User Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="userPassword"
                className="block text-gray-700 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                {...register("password", { required: true })}
                className={`w-full p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-2 mt-4 bg-blue-500 text-white rounded ${
                loading ? "cursor-wait" : "hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "login"}
            </button>
            <div className="flex justify-between mt-4 text-sm">
              <Link to="/user/register" className="text-blue-500">
                Not an Existing User? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
