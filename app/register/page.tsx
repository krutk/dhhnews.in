"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const initialState = {
        username: "",
        email: "",
        password: "",
    };

    const [data, setData] = useState(initialState);

    const registerUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post('/api/register', data);
            alert('User has been registered!');
            router.push("/signin")
        } catch (error) {
            setData(initialState);
            alert('Something went wrong!');
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto rounded-full"
                        src="../images/logo.png"
                        alt="DHH News"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={registerUser}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                User Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={data.username}
                                    onChange={(e) =>
                                        setData({ ...data, username: e.target.value })
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-[#FF6D00] hover:text-[#FFB600]">
                      Forgot password?
                    </a>
                  </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(e) =>
                                        setData({ ...data, password: e.target.value })
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#FF6D00] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FFB600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{" "}
                        <a
                            href="/signin"
                            className="font-semibold leading-6 text-[#FF6D00] hover:text-[#FFB600]"
                        >
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
