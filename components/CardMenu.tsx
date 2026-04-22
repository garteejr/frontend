"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  image: string;
  link: string;
  requireSubscription?: boolean;
  isSubscribed?: boolean;
};

export default function CardMenu({ title, image, link, requireSubscription, isSubscribed }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (requireSubscription && !isSubscribed) {
      router.push("/pricing");
      return;
    }
    router.push(link);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-3xl p-4 w-[300px] h-[450px] text-center cursor-pointer 
        border border-black/20 shadow-md 
        flex flex-col relative z-10
        transform transition duration-300 
        hover:scale-105 hover:-translate-y-2 hover:shadow-xl
        ${requireSubscription && !isSubscribed ? "opacity-70" : ""}
      `}
    >
      <div className="rounded-2xl overflow-hidden border border-black/20 flex-1 relative">
        <Image
          src={image}
          alt={title}
          width={300}
          height={500}
          className="object-cover w-full h-full pointer-events-none"
        />
        {/* Badge kunci kalau belum langganan */}
        {requireSubscription && !isSubscribed && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl">
            <span className="text-white text-4xl">🔒</span>
          </div>
        )}
      </div>

      <h2 className="mt-3 text-lg font-medium text-gray-700">
        {title}
      </h2>

      {requireSubscription && !isSubscribed && (
        <p className="text-xs text-orange-500 font-semibold mt-1">Perlu Langganan</p>
      )}
    </div>
  );
}