"use client";
import { cn } from "@/lib/utils";

const TITLES = [
  "Troodos Mountains",
  "Hala Sultan Tekke",
  "Nicosia",
  "Protaras Boat Tour",
  "Akamas Gorge",
  "Larnaca Salt Lake",
  "Kykkos Monastery",
  "Cape Greco",
];

const HOURS = [2, 3, 4, 5, 6];

function titleFor(i: number) {
  return TITLES[i % TITLES.length];
}

function hoursFor(i: number) {
  return HOURS[i % HOURS.length];
}

function ratingFor(i: number) {
  // 3.7 → 4.9 spread; deterministic by index
  const vals = [3.7, 3.8, 4.0, 4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.9];
  return vals[i % vals.length].toFixed(1);
}

function gradientFor(i: number) {
  // Alternate between two different gradients
  const gradients = [
    "bg-gradient-to-r from-pink-500 to-violet-600",
    "bg-gradient-to-r from-[#00B5F1] via-[#00AEEF] to-[#0066B3]"
  ];
  return gradients[i % gradients.length];
}

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const third = Math.ceil(images.length / 4);
  // third = Math.ceil(24 / 3) = Math.ceil(8) = 8

  const col1 = images.slice(0, 5); // Images 0-7
  const col2 = images.slice(5, 10); // Images 8-15
  const col3 = images.slice(15, 20); // Images 16-23
  const col4 = images.slice(20, 25); // Images 16-23

  // varied heights for organic masonry
  const heights = ["h-90"];

  const Card = ({ src, i }: { src: string; i: number }) => (
    <div
      className={cn(
        "relative overflow-hidden rounded-4xl shadow-sm",
        heights[i % heights.length]
      )}
    >
      <img
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        alt={titleFor(i)}
      />
      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* content */}
      <div className="absolute left-4 right-4 bottom-4 space-y-2">
        <h3 className="text-white text-lg font-semibold drop-shadow-sm">
          {titleFor(i)}
        </h3>

        <div
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-white shadow/20 ring-1 ring-white/20",
            gradientFor(i)
          )}
        >
          <span className="text-xs font-semibold">{hoursFor(i)} Hour Trip</span>

          {/* divider */}
          <span aria-hidden className="mx-2 h-4 w-px bg-white/40" />

          <span className="inline-flex items-center gap-1 text-xs font-semibold">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927a1 1 0 011.902 0l1.062 3.272a1 1 0 00.95.69h3.44c.969 0 1.371 1.24.588 1.81l-2.783 2.022a1 1 0 00-.364 1.118l1.062 3.272c.3.925-.755 1.688-1.54 1.118l-2.783-2.022a1 1 0 00-1.175 0L6.658 16.23c-.785.57-1.84-.193-1.54-1.118l1.062-3.272a1 1 0 00-.364-1.118L3.033 8.7c-.783-.57-.38-1.81.588-1.81h3.44a1 1 0 00.95-.69l1.038-3.273z" />
            </svg>
            {ratingFor(i)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("relative w-full  overflow-hidden", className)}>
      <div className="flex  gap-3 max-w-6xl mx-auto -my-24">
        {/* Column 1 - starts at normal position */}
        <div className="grid gap-3 w-[25%] pt-0">
          {col1.map((src, i) => (
            <Card key={`c1-${i}`} src={src} i={i} />
          ))}
        </div>

        {/* Column 2 - starts offset by half a card height to create brick pattern */}
        <div className="grid gap-3 w-[25%] transform -translate-y-42">
          {col2.map((src, i) => (
            <Card key={`c2-${i}`} src={src} i={i + col1.length} />
          ))}
        </div>

        {/* Column 3 - starts at normal position (aligned with column 1) */}
        <div className="grid gap-3 w-[25%] pt-0">
          {col3.map((src, i) => (
            <Card
              key={`c3-${i}`}
              src={src}
              i={i + col1.length + col2.length}
            />
          ))}
        </div>

        {/* Column 4 - starts offset by half a card height (aligned with column 2) */}
        <div className="grid gap-3 w-[25%] transform -translate-y-42">
          {col4.map((src, i) => (
            <Card
              key={`c4-${i}`}
              src={src}
              i={i + col1.length + col2.length + col3.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
