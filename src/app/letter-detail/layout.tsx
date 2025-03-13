export default function LetterDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="box-border font-pretendard max-w-[357px] max-h-[852px] w-full min-h-[852px] min-w-[375px] xs:min-h-[852px] sm:min-h-screen sm:w-full"> */}
      <div className="box-border font-pretendard max-w-[476px] max-h-[852px] min-w-[375px] xs:min-h-[852px] sm:min-h-screen sm:w-full mx-auto">
        {children}
      </div>
    </>
  );
}
