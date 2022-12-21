import Head from "next/head";
import { useState, useEffect, Fragment } from "react";

export default function Home() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch API*
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  // Front-End
  return (
    <Fragment>
      <Head>
        <title>Jillien's Simple JS App</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <div className="bg-white dark:bg-gray-800 min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <main className="flex flex-col justify-center max-w-3xl w-full align-center">
          <h1 className="text-4xl text-center font-extrabold text-gray-800 dark:text-white drop-shadow sm:text-5xl mb-1">
            Hi! I am Bot Butler.
          </h1>
          <p className="block text-sm text-center font-medium text-gray-500 dark:text-gray-300">
            Bot Butler is powered by GPT-3 by OpenAI. Bot Butler helps in summarizing texts, articles etc.
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md ring-1 ring-black ring-opacity-0 p-4 ">
            <textarea
              className="block p-5 max-w shadow-sm min-h-64 block w-full focus:ring-fuchsia-300 focus:border-blue-700 sm:text-sm border border-gray-300 rounded-md"
              type="textarea"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter text you want to summarize......."
            />

            {/* This button will call the API */}
            <button
              className="inline-flex mt-5 items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-300"
              type="button"
              onClick={() => setSearch(query)}
            >
              Click Me!
            </button>
            {/* End of Button */}

            <div className="mt-5 p-5 text-sm text-gray-900 dark:text-gray-300 border-t-2 border-slate-200 ">
              {isLoading ? <div>Please wait, I am processing your information.</div> : <span> {data.text} </span>}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
