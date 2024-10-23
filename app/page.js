"use client";

import Image from "next/image";
import { useChat } from "ai/react";

export default function Home() {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat();

  const noMessages = !messages || messages.length === 0;

  return (
    <main className="relative h-screen w-full">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          layout="fill"
          src="/background_image.jpg"
          alt="Portfolio Banner"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 py-10">
        {/* Header */}
        <h1 className="text-4xl font-Kanit md:text-5xl font-bold text-white drop-shadow-lg mt-10">
          Kartik Yadav&rsquo;s AI Portfolio
        </h1>

        {/* Chat Section */}
        <section className="w-full flex-1 flex flex-col gap-4 overflow-y-auto bg-black/30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
          {noMessages ? (
            <p className="text-center text-xl text-gray-200">Ask me Anything</p>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  className={`rounded-3xl p-4 px-6 w-[70%] md:w-[80%] mt-4 text-gray-100 shadow-lg transition-all duration-300 ${
                    message.role === "user"
                      ? "bg-blue-600 self-end text-right"
                      : "bg-orange-600 self-start text-left"
                  }`}
                  key={`message-${index}`}
                >
                  <b>{message.role === "user" ? "User:" : "Kartik:"}</b>{" "}
                  {message.content}
                </div>
              ))}

              {isLoading && (
                <span className="ml-auto text-gray-200 animate-pulse">
                  Thinking... 🤔
                </span>
              )}
            </>
          )}
        </section>

        {/* Input Section */}
        <form
          className="w-full flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <input
            onChange={handleInputChange}
            value={input}
            type="text"
            placeholder="Who are you?"
            className="flex-1 py-3 px-5 rounded-full text-black text-xl border-2 border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full text-xl px-6 py-3 shadow-lg cursor-pointer transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
