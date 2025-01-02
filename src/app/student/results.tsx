import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ResultsPage: React.FC = () => {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }

    const fetchResults = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/tests/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setResults(data);
        } else {
          setError(data.message || "Failed to fetch results.");
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    };
    fetchResults();
  }, [router]);

  if (!results) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Your Results</h1>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        You scored {results.score} out of {results.totalQuestions}.
      </p>
    </div>
  );
};

export default ResultsPage;
