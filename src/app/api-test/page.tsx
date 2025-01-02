"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const ProtectedPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return;
    }

    // Decode token to check expiration
    const decodedToken = jwtDecode<DecodedToken>(token);
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
    if (isTokenExpired) {
      localStorage.removeItem("token"); // Remove expired token
      router.push("/login"); // Redirect to login
    } else {
      setIsAuthenticated(true); // User is authenticated
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>; // Show a loading state
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Only accessible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;
