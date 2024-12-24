import { MenuItem } from "../models/menu.model";

export const MenuItems: MenuItem[] = [
  {
    id: 1,
    text: 'لیست محصولات',
    icon: 'toc',
    path: '/',
  },
  {
    id: 2,
    text: 'ثبت محصول',
    icon: 'library_add',
    path: '/panel/create',
  },
];
