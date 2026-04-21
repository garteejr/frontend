export type MenuType = {
  id: number;
  title: string;
  image: string;
  link: string;
};

export const menu: MenuType[] = [
  {
    id: 1,
    title: "Dashboard",
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/f_auto,q_auto/heckpast-removebg-preview_pwnqkk",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Mulai Skrining!",
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/f_auto,q_auto/heckpast-removebg-preview_pwnqkk",
    link: "/skrining",
  },
  {
    id: 3,
    title: "Belajar",
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/f_auto,q_auto/heckpast-removebg-preview_pwnqkk",
    link: "/belajar",
  },
];