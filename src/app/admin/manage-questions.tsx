import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ManageQuestions: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch questions when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setQuestions(data);
        } else {
          setError(data.message || "Failed to fetch questions.");
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    };
    fetchQuestions();
  }, [router]);

  const handleAddQuestion = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: newQuestion }),
      });
      const data = await res.json();
      if (res.ok) {
        setQuestions([...questions, data]);
        setNewQuestion("");
      } else {
        setError(data.message || "Failed to add question.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Manage Questions</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Add new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Add Question
        </button>
      </div>

      <ul className="mt-4">
        {questions.map((question) => (
          <li key={question.id} className="flex justify-between">
            <span>{question.question}</span>
            <div>
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500 ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuestions;
