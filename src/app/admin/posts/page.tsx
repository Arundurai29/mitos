// app/admin/posts/page.tsx
'use client';

import { useState } from 'react';
import { createQuestionstype } from '../api/addItem';

const UploadPage = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Upload Data</h1>
      <form action={createQuestionstype} className="space-y-4 w-full max-w-md">
      

        <input
          type="text"
          name="name"
          placeholder="Name"
         
          required
          className="w-full border rounded p-2"
        />

       

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
