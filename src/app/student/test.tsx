import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TestPage: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }

    const fetchTest = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/tests/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setQuestions(data.questions);
        } else {
          setError(data.message || "Failed to fetch questions.");
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    };
    fetchTest();
  }, [router]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/tests/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/student/results");
      } else {
        setError(data.message || "Failed to submit answers.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Test</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        {questions.map((question) => (
          <div key={question.id} className="mt-4">
            <p>{question.question}</p>
            <input
              type="text"
              className="border p-2 w-full"
              value={answers[question.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [question.id]: e.target.value })
              }
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default TestPage;
