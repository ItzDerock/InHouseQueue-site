import { Suspense } from "react";
import { MAIN_TESTIMONIALS } from "@/data/testimonials";
import { MainTestimonialsClient } from "./MainTestimonialCarousel";
import { MainTestimonialDisplay } from "./MainTestimonialDisplay";

export function MainTestimonials() {
  if (!MAIN_TESTIMONIALS || MAIN_TESTIMONIALS.length === 0) {
    return null;
  }

  // Fallback: Render the first testimonial within a container that respects min-height
  const fallbackContent = (
    <div className="flex min-h-[350px] w-full items-center justify-center md:min-h-[400px]">
      <MainTestimonialDisplay testimonial={MAIN_TESTIMONIALS[0]!} />
    </div>
  );

  return (
    // Section: Relative for button positioning, overflow hidden for animations
    // Responsive padding added here
    <section className="relative overflow-hidden px-4 pb-8 sm:px-6 md:px-12">
      <Suspense fallback={fallbackContent}>
        {/* Client component will now determine its own height */}
        <MainTestimonialsClient testimonials={MAIN_TESTIMONIALS} />
      </Suspense>
    </section>
  );
}
