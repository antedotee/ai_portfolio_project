"use client";

import Image from "next/image";
import { useChat } from "ai/react";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
// import type { Engine } from "tsparticles-engine";
// import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { isLoading, messages, input, handleInputChange, handleSubmit } =
    useChat();

  const noMessages = !messages || messages.length === 0;

  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadFull(engine);
  // }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
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

      {/* Particle Background */}
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-10"
      /> */}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-between h-full px-4 py-10">
        {/* Header */}
        <h1 className="text-4xl font-Kanit md:text-5xl font-bold text-white drop-shadow-lg mt-10">
          <TypeAnimation
            sequence={[
              "Kartik Yadav's AI Portfolio",
              1000,
              "Innovative. Creative. Intelligent.",
              1000,
              "Welcome to the Future of AI",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>

        {/* Chat Section */}
        <section className="w-full max-w-4xl flex-1 flex flex-col gap-4 overflow-y-auto bg-black/30 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/20 custom-scrollbar">
          {noMessages ? (
            <p className="text-center text-xl text-gray-200 animate-pulse">
              Ask me Anything
            </p>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-3xl p-4 px-6 w-[70%] md:w-[80%] mt-4 text-gray-100 shadow-lg transition-all duration-300 hover:scale-105 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 self-end text-right"
                      : "bg-gradient-to-r from-orange-600 to-orange-400 self-start text-left"
                  }`}
                  key={`message-${index}`}
                >
                  <b>{message.role === "user" ? "You:" : "Kartik:"}</b>{" "}
                  {message.content}
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {isLoading && (
            <span className="ml-auto text-gray-200 animate-pulse">
              Thinking... 🤔
            </span>
          )}
        </section>

        {/* Input Section */}
        <form
          className="w-full max-w-4xl flex gap-3 mt-4"
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
            className="flex-1 py-3 px-5 rounded-full text-white text-xl bg-black/30 backdrop-blur-lg border-2 border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xl px-6 py-3 shadow-lg cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(0,0,0,0)",
                "0px 0px 20px 10px rgba(59,130,246,0.5)",
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Submit
          </motion.button>
        </form>
      </div>
    </main>
  );
}
