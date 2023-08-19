"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AlertDialog from "@/components/alertDialog";
const ResetPassword = () => {
  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const searchParams = useSearchParams();
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const resetPassword = async (e: any) => {
    e.preventDefault();
    if (e.target.checkValidity() && validateForm()) {
      const token = searchParams.get("token");
      try {
        const password = data.newPassword;
        console.log("new---password-->", password, data.newPassword);
        await axios.post("/api/reset-password", { token, password });
        // Perform your reset password logic here
        setModalMessage("Password reset successfully!");
        setModalVisible(true);
      } catch (error) {
        setModalMessage("Password reset successfully!");
        setModalVisible(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validate newPassword and confirmPassword
    if (data.newPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Validate password using regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~]{8,}$/;
    if (!passwordRegex.test(data.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
            Reset Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={resetPassword}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={data.newPassword}
                  onChange={(e) =>
                    setData({ ...data, newPassword: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                />
                {errors.newPassword && (
                  <p className="text-[#FF6D00] text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 pl-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6D00] sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-[#FF6D00] text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
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

export default ResetPassword;
