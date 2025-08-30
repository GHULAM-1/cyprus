import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { ParallaxScroll } from "@/components/ui/paralax-scroll";

export default function Home() {
  const images = [
    "/nature.jpeg",
    "/nature-2.avif",
    "/nature.jpeg",
    "/nature-2.avif",
    "/nature.jpeg",

    "/nature-2.avif",
    "/nature.jpeg",
    "/nature.jpeg",
    "/nature-2.avif",
    "/nature.jpeg",

    "/nature.jpeg",
    "/nature-2.avif",
    "/nature-2.avif",
    "/nature.jpeg",
    "/nature.jpeg",

    "/nature.jpeg",
    "/nature-2.avif",
    "/nature.jpeg",
    "/nature.jpeg",
    "/nature-2.avif",

    "/nature-2.avif",
    "/nature.jpeg",
    "/nature.jpeg",
    "/nature-2.avif",
    "/nature.jpeg",
  ];
  return (
    <div className=" flex flex-col h-[100vh] overflow-x-hidden sm:overflow-hidden bg-gray-50">
      <div className="w-full  border-b-[1px] mb-[48px]">
        <Navbar />
      </div>
      <div className="hidden relative overflow-hidden h-full sm:flex items-start w-full px-8 py-0 max-w-[1440px] mx-auto">
        {/* Background - ParallaxScroll component */}
        <div className="absolute h-[35rem] min-w-[1120px] max-w-[1120px] left-[20%] inset-0 z-0 rounded-xl overflow-hidden border border-transparent">
          <div>
            <ParallaxScroll images={images} />
          </div>
        </div>

        {/* Foreground - Booking Card */}
        <div className="relative z-10 mt-20 max-w-md">
          <Card />
        </div>
      </div>
      <div className="sm:hidden flex gap-8 flex-col p-4">
        <div className="rounded-2xl  overflow-hidden">
          <img src="/hero.png" alt="" />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
      </div>
    </div>
  );
}
