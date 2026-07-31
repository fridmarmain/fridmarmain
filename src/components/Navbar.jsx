import { getCategories, getMegaMenuList, getSiteSettings } from "@/lib/sanity";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [categories, practices, settings] = await Promise.all([
    getCategories(),
    getMegaMenuList(), // Retains your key structural data mapping
    getSiteSettings(), // Fetches your editable text, links, and buttons
  ]);

  return (
    <NavbarClient
      categories={categories || []}
      practices={practices || []}
      settings={settings || {}}
    />
  );
}
