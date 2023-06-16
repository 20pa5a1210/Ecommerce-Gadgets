import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterUser() {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        setLoading(true);
        axios
            .post("http://localhost:8080/user/register", data)
            .then((response) => {
                alert(response.statusText);
                console.log(response);
                setRegistered(true);
            })
            .catch((error) => {
                setRegistered(false);
                console.log(error.response.data.error);
                alert(error.response.data.error);
            });
        setLoading(false);
    };

    if (registered) {
        return <Navigate to="/user/login" />;
    }

    return (
        <div>
            <Navbar />

            <div className="flex flex-col m-4  md:flex-row items-center justify-center bg-gray-100">
                <div className="w-full  md:w-1/2 bg-white rounded-lg shadow-md p-8 m-4">
                    <h2 className="text-2xl font-bold mb-4">User Registration</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="userName" className="block text-gray-700 font-bold">
                                User Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                {...register("username", { required: true })}
                                className={`w-full p-2 border rounded ${errors.username ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.username && (
                                <span className="text-red-500">User Name is required</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="userEmail" className="block text-gray-700 font-bold">
                                User Email
                            </label>
                            <input
                                type="email"
                                id="userEmail"
                                {...register("email", { required: true })}
                                className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.email && (
                                <span className="text-red-500">User Email is required</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="userPassword" className="block text-gray-700 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="userPassword"
                                {...register("password", { required: true })}
                                className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.password && (
                                <span className="text-red-500">Password is required</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword", { required: true })}
                                className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-500">Confirm Password is required</span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 mt-4 bg-blue-500 text-white rounded ${loading ? "cursor-wait" : "hover:bg-blue-600"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Register"}
                        </button>
                        <div className="flex justify-between mt-4 text-sm">
                            <Link to="/user/login" className="text-blue-500">
                                Existing User? Login
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/2 m-4  bg-gray-200">
                    <img
                        src="https://source.unsplash.com/1200x800?ecommerce,headphones,gadget"
                        alt="Product"
                        className="hidden md:block h-full w-full object-cover"
                    />
                </div>
            </div>

        </div>
    );
}

