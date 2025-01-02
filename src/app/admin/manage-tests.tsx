import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ManageTests: React.FC = () => {
  const router = useRouter();
  const [tests, setTests] = useState<any[]>([]);
  const [newTest, setNewTest] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch tests when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }

    const fetchTests = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/tests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTests(data);
        } else {
          setError(data.message || "Failed to fetch tests.");
        }
      } catch (err) {
        setError("Something went wrong.");
      }
    };
    fetchTests();
  }, [router]);

  const handleAddTest = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newTest }),
      });
      const data = await res.json();
      if (res.ok) {
        setTests([...tests, data]);
        setNewTest("");
      } else {
        setError(data.message || "Failed to add test.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Manage Tests</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Add new test"
          value={newTest}
          onChange={(e) => setNewTest(e.target.value)}
        />
        <button
          onClick={handleAddTest}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Add Test
        </button>
      </div>

      <ul className="mt-4">
        {tests.map((test) => (
          <li key={test.id} className="flex justify-between">
            <span>{test.name}</span>
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

export default ManageTests;
