import { useEffect, useState } from "react";
import api from "../../utils/api";
import { QuestionType } from "@/utils/types";
import Link from "next/link";

export default function QuestionTypes() {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/question-types");
        setQuestionTypes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Question Types</h1>
      <Link href="/question-types/create">
        <a className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
          Add Question Type
        </a>
      </Link>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionTypes.map((type) => (
            <tr key={type.id}>
              <td className="border p-2">{type.id}</td>
              <td className="border p-2">{type.name}</td>
              <td className="border p-2">
                <Link href={`/question-types/${type.id}`}>
                  <a className="text-blue-500">Edit</a>
                </Link>
                {" | "}
                <button
                  className="text-red-500"
                  onClick={async () => {
                    try {
                      await api.delete(`/question-types/${type.id}`);
                      setQuestionTypes((prev) => prev.filter((q) => q.id !== type.id));
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
