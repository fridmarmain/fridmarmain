// app/(admin)/layout.js
export const metadata = {
  title: "Sanity Studio",
  description: "Admin Backend",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
