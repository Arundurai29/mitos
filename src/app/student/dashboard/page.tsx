"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

const StudentDashboard: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const decodedToken = jwtDecode<any>(token);
    const role = decodedToken.role;
    if (role !== "student") {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <ul className="mt-4">
        <li><a href="/student/test" className="text-blue-500">Start Test</a></li>
        <li><a href="/student/results" className="text-blue-500">View Results</a></li>
      </ul>
    </div>
  );
};

export default StudentDashboard;
