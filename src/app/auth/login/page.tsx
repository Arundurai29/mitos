"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the user is an admin
        if (data.role !== "admin") {
          setError("Access restricted to admin users only.");
          return;
        }

        // Save token and role to local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Navigate to admin dashboard
        router.push("/admin/dashboard");
      } else {
        // Set error message from server response
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err); // Debugging log
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container p-10">
      <div className="flex w-full">
        <div className="w-[40%]">
          <div className="login">
            <div className="login_img">
              <img src="/images/login/login_img.png" alt="" />
            </div>
            <div className="flying_logo">
              <img src="/images/login/pop1.png" alt="" />
              <img src="/images/login/pop2.png" alt="" />
            </div>
          </div>
        </div>
        <div className="w-[60%] ">
          <div className="login_content">
            <div className="logo">
              <img src="/images/logo/logo.png" alt="" />
            </div>

            <h1 className="font-bold text-center pt-6">Admin Login!</h1>
            <form onSubmit={handleSubmit} className="mt-6">
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email">
                  Email address<span>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 
                  placeholder="Enter email address"
                  required
                />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {/* Submit Button */}
              <div
                className="forgot"
              >
              <a
                href="/auth/register"
              >
                Forgot your password?
              </a>
              </div>
              <button
                type="submit"
                className="login_btn"
              >
                Login
              </button>
            </form>
            {/* Registration Link */}
            {/* <p className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="text-blue-500 hover:underline"
              >
                Register here
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
