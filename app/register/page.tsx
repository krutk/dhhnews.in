"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/alertDialog";
import Loader from "@/components/Loader";

const Register = () => {
  const router = useRouter();
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [registered, setRegistered] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const emailRegex =
    /^([A-Za-z0-9-+_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,}$/;

  const registerUser = async (e: any) => {
    e.preventDefault();
    if (e.target.checkValidity() && validateForm()) {
      try {
        setLoading(true);
        await axios.post("/api/register", data);
        setLoading(false);
        setRegistered(true); // Set registration status to true
      } catch (error) {
        setLoading(false);
        console.log("error --> register", error);
        setModalMessage(
          "Email or Username already registered for another user!"
        );
        setModalVisible(true);
        setData(initialState);
      }
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!usernameRegex.test(data.username)) {
      newErrors.username = "Username is invalid.";
    }

    if (!emailRegex.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return <Loader />;
  }

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
          {registered ? (
            // Show the verification message after successful registration
            <div className="flex flex-col items-center space-y-4">
              <p className="text-green-600 font-semibold">
                User has been registered!
              </p>
              <p className="text-gray-500">
                Please verify your email to proceed.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-[#FF6D00] text-white rounded-md hover:bg-[#FFB600]"
                onClick={() => router.push("/signin")}
              >
                Sign In
              </button>
            </div>
          ) : (
            // Show the registration form
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
                    className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                  />
                  {errors.username && (
                    <p className="text-[#FF6D00] text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
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
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-[#FF6D00] text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
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
                    className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-[#FF6D00] text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
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
          )}
          <p className="mt-5 text-center text-sm text-gray-500">
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
      {modalVisible && (
        <AlertDialog
          modalMessage={modalMessage}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default Register;
