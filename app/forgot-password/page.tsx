"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reseted, setReseted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/forgot-password", { email });
      console.log("response-->", response);
      setReseted(true);
      setMessage(response.data.message);
    } catch (error) {
      setModalVisible(true);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto rounded-full"
            src="../images/logo.png"
            alt="DHH News"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {reseted ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-green-600 font-semibold">
                Email has been sent!
              </p>
              <p className="text-gray-500">
                An email with instructions on how to reset your password has
                been sent to your inbox. Please check your email and follow the
                instructions to reset your password.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-[#FF6D00] text-white rounded-md hover:bg-[#FFB600]"
                onClick={() => router.push("/signin")}
              >
                Sign In
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#FF6D00] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FFB600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* <div className="flex text-center min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {error && <p>{error}</p>}
      </div> */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#FF6D00] text-white rounded-md font-semibold hover:bg-[#FFB600]"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
      {/* <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Reset Password</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>} */}
    </div>
  );
};

export default ForgotPasswordPage;
