import { useEffect, useState } from "react";
import axios from "axios"; // You can use your preferred HTTP library
import { useRouter } from "next/router";

const VerifyEmailToken = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verificationStatus, setVerificationStatus] = useState("loading"); // "loading", "success", or "error"

  useEffect(() => {
    if (token) {
      // Call your backend API to verify the token and update the emailVerified field
      axios
        .post("/api/auth/verify-email", { token })
        .then((response) => {
          // Verification successful
          setVerificationStatus("success");
        })
        .catch((error) => {
          // Verification failed
          setVerificationStatus("error");
        });
    }
  }, [token]);

  let message = "";

  if (verificationStatus === "loading") {
    message = "Verifying your email...";
  } else if (verificationStatus === "success") {
    message = "Email verification successful!";
  } else if (verificationStatus === "error") {
    message = "Email verification failed. Please try again.";
  }

  return (
    <div>
      <p>{message}</p>
      {/* You can display loading spinners or other UI elements here */}
    </div>
  );
};

export default VerifyEmailToken;
