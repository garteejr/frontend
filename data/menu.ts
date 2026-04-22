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
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/v1776855979/Card_Image_2_z5sxky",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Mulai Skrining!",
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/f_auto,q_auto/Card_Image_qcgeno",
    link: "/form",
  },
  {
    id: 3,
    title: "Pembelajaran",
    image: "https://res.cloudinary.com/dliqoyywv/image/upload/v1776856547/Card_Image_1_drq9ti",
    link: "/belajar",
  },
];