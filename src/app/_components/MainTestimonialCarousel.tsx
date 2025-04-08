"use client";

import type { Testimonial } from "@/data/testimonials";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MainTestimonialDisplay } from "./MainTestimonialDisplay";

const AUTOPLAY_INTERVAL = 7000;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export function MainTestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Changes the testimonial by one slide in the specified direction (1, or -1)
   * @param newDirection - 1 = next, -1 = prev
   */
  const changeTestimonial = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setIndex((prevIndex) => {
        const newIndex =
          (prevIndex + newDirection + testimonials.length) %
          testimonials.length;
        return newIndex;
      });
    },
    [testimonials.length],
  );

  /**
   * Goes to next testimonial
   */
  const nextTestimonial = useCallback(
    () => changeTestimonial(1),
    [changeTestimonial],
  );

  /**
   * Goes to previous testimonial
   */
  const prevTestimonial = useCallback(
    () => changeTestimonial(-1),
    [changeTestimonial],
  );

  /**
   * Enables "autoplay" where it will auto advance to the next slide after a specified delay
   */
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextTestimonial, AUTOPLAY_INTERVAL);
  }, [nextTestimonial]);

  /**
   * Stops "autoplay"
   */
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // enable autoplay on mount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay]);

  /**
   * Wraps an action function with stopping and starting autoplay so it doesn't interfere.
   * "resets" the autoplay timer
   * @param action - action to perform
   */
  const handleInteraction = (action: () => void) => {
    stopAutoplay();
    action();
    startAutoplay();
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    // REMOVED absolute inset-0. Added relative for button positioning.
    // Added w-full and flex column structure.
    <div
      className="relative flex w-full flex-col items-center justify-center"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <button
        onClick={() => handleInteraction(prevTestimonial)}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full fill-gray-600 p-1 transition hover:fill-gray-500 focus:outline-none focus:ring-2 focus:ring-primary sm:p-2 md:left-0"
        aria-label="Previous testimonial"
      >
        <FaChevronLeft className="fill-inherit sm:h-6 sm:w-6" />
      </button>

      {/* set a min/max width for stability during animations */}
      <div className="relative w-full max-w-3xl flex-grow overflow-hidden">
        <div className="relative min-h-[280px] w-full md:min-h-[320px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="flex items-center justify-center p-4"
            >
              {testimonials[index] && (
                <MainTestimonialDisplay testimonial={testimonials[index]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => handleInteraction(nextTestimonial)}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 transform rounded-full fill-gray-600 p-1 transition hover:fill-gray-500 focus:outline-none focus:ring-2 focus:ring-primary sm:p-2 md:right-0"
        aria-label="Next testimonial"
      >
        <FaChevronRight size="1.2rem" className="fill-inherit sm:h-6 sm:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="relative mt-6 flex space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              stopAutoplay();
              setDirection(i > index ? 1 : -1);
              setIndex(i);
              startAutoplay();
            }}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-primary" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
