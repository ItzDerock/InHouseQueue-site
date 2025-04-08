import type { Testimonial } from "@/data/testimonials";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

/**
 * Renders a main testimonial (big quote and profile/server info)
 * @param props - the testimonial to render
 * @returns
 */
export function MainTestimonialDisplay({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center md:px-0">
      {" "}
      <FaQuoteLeft size={"2rem"} className="text-gray-600" />
      <p
        className="
          text-xl text-white
          [&_em:hover]:bg-primary
          [&_em:hover]:text-white
          [&_em:hover]:no-underline
          [&_em]:not-italic
          [&_em]:underline
          [&_em]:decoration-primary
          [&_em]:decoration-2
          [&_em]:underline-offset-2
          [&_em]:transition-[background-color,color]
          [&_em]:duration-300
          [&_em]:ease-in-out
        "
      >
        {testimonial.quote}
      </p>
      <div className="mt-4">
        <Image
          src={testimonial.author.icon}
          width={52}
          height={52}
          alt={`${testimonial.author.name}'s icon`}
          className="mx-auto rounded-full"
        />
        <p className="mt-2 text-sm text-gray-400">
          <span className="font-semibold text-gray-200">
            {testimonial.author.name}
          </span>
          <br />
          {testimonial.author.role}
          {testimonial.author.role && testimonial.server?.name && " @ "}
          {testimonial.server?.href ? (
            // if href provided, wrap it around server name
            <a
              href={testimonial.server.href}
              target="_blank"
              className="underline"
            >
              {testimonial.server?.name}
            </a>
          ) : (
            testimonial.server?.name
          )}
          {testimonial.server?.size && (
            <>
              <br />
              {testimonial.server.size} members
            </>
          )}
        </p>
      </div>
    </article>
  );
}
