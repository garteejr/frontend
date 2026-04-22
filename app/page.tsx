import Navbar from "@/components/Navbar";
import CardMenu from "@/components/CardMenu";
import { menu } from "@/data/menu";
import { JSX } from "react/jsx-runtime";

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-teal-500 to-red-400 p-6">
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
        {menu.map((item) => (
          <CardMenu
            key={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
}