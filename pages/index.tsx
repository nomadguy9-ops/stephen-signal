import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  "https://kennyn.com/stephens/images/p35.jpg",
  "https://kennyn.com/stephens/images/p36.jpg",
  "https://kennyn.com/stephens/images/p38.jpg",
  "https://kennyn.com/stephens/images/p40.jpg",
];

const journalQuotes = [
  "The brush knows what the mind fears.",
  "Color is just memory on canvas.",
  "Not every silence is empty.",
  "I didn’t choose the red. The red arrived first.",
  "They'll say they discovered him. But he was always here."
];

const testimonials = [
  "I couldn’t breathe for a moment. I just stared.",
  "It reminded me of something I’ve never seen.",
  "Who is this? Why haven’t we seen this before?",
  "It feels like the painting knew me.",
];

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % journalQuotes.length);
    }, 7000);
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 9000);
    return () => {
      clearInterval(quoteInterval);
      clearInterval(testimonialInterval);
    };
  }, [revealed]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-0 relative">
      <audio autoPlay loop muted id="ambient-audio">
        <source src="/ambient_background.mp3" type="audio/mpeg" />
      </audio>

      {!revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="w-full h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://kennyn.com/stephens/images/p35.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center pb-20 px-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
              className="text-xl md:text-2xl italic tracking-wide max-w-3xl text-center"
            >
              "You were never supposed to find this. But now that you have... everything changes."
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 2 }}
            className="absolute bottom-10 w-full flex justify-center"
          >
            <button
              onClick={() => setRevealed(true)}
              className="bg-white text-black px-6 py-3 text-lg rounded-2xl hover:bg-gray-200 transition"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}

      {revealed && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full min-h-screen bg-black py-20 px-4 flex flex-col items-center"
        >
          <div className="text-2xl md:text-3xl font-light italic text-center mb-8 max-w-3xl">
            {journalQuotes[quoteIndex]}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mb-16">
            {galleryImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Artwork ${i + 1}`}
                className="w-full rounded-2xl shadow-lg hover:scale-105 transition transform"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>

          <div className="text-lg md:text-xl italic text-gray-400 text-center max-w-2xl">
            “{testimonials[testimonialIndex]}”
          </div>
        </motion.section>
      )}
    </main>
  );
}
