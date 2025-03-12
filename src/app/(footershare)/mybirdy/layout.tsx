export default function MybirdyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col text-black bg-[#292D32]">
      <div className="flex-1">{children}</div>
    </div>
  );
}
