export default function SendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-col items-start pt-14 pb-11 px-4 min-h-screen mx-auto">
        <main>{children}</main>
      </div>
    </>
  );
}
