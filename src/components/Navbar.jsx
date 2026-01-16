import { getCategories, getMegaMenuList } from "@/lib/sanity";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [categories, practices] = await Promise.all([
    getCategories(),
    getMegaMenuList(), // 👈 THIS is the key change
  ]);

  return (
    <NavbarClient categories={categories || []} practices={practices || []} />
  );
}
