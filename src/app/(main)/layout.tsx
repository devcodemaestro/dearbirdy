export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="relative w-full min-h-screen px-4"
      style={{
        backgroundImage: "url('/images/common/background_main.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </main>
  );
}
