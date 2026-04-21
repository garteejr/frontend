"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    title: string;
    image: string;
    link: string;
};

export default function CardMenu({ title, image, link }: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(link)}
            className="bg-white rounded-3xl p-4 w-[300px] h-[450px] text-center cursor-pointer 
            border border-black/20 shadow-md 
            flex flex-col
            transform transition duration-300 
            hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="rounded-2xl overflow-hidden border border-black/20 flex-1">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={500}
                    className="object-cover w-full h-full"
                />
            </div>

            <h2 className="mt-3 text-lg font-medium text-gray-700">
                {title}
            </h2>
        </div>
    );
}