export default function SendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative px-4 max-w-[375px] max-h-[852px]">
        <main>{children}</main>
      </div>
    </>
  );
}
