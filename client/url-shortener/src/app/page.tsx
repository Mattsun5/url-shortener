"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/url")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.shortenedUrls);
        setUrls(data.shortenedUrls);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-6 md:p-12">
      <form
        action="http://localhost:8001/api/url"
        method="post"
        className="max-w-xl mx-auto mb-8 flex flex-col sm:flex-row gap-4"
      >
        <input
          placeholder="Enter URL"
          name="url"
          type="url"
          required
          className="flex-grow rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 font-semibold transition"
        >
          Shorten
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4 max-w-xl mx-auto">List of shortened URLs</h2>

      <div className="overflow-x-auto max-w-5xl mx-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">Serial</th>
              <th className="px-4 py-2">URL</th>
              <th className="px-4 py-2">Shortened Version</th>
              <th className="px-4 py-2">Visits</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {urls.map((url: any, index: number) => (
              <tr
                key={url.shortId}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 break-words max-w-xs">{url.redirectURL}</td>
                <td className="px-4 py-3">
                  <a
                    href={`http://localhost:8001/url/${url.shortId}`}
                    className="text-indigo-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`http://localhost:8001/url/${url.shortId}`}
                  </a>
                </td>
                <td className="px-4 py-3">{url.visitHistory.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
