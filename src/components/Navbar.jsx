import { getCategories, getMainPractices } from "@/lib/sanity";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [categories, practices] = await Promise.all([
    getCategories(),
    getMainPractices(),
  ]);
  return (
    <NavbarClient categories={categories || []} practices={practices || []} />
  );
}
