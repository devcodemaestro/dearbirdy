import Image from "next/image";

interface RoleCardProps {
  role: "MENTEE" | "MENTOR";
  selectedRole: "MENTEE" | "MENTOR" | null;
  onSelect: (role: "MENTEE" | "MENTOR") => void;
  imageSrc: string;
  title: string;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  selectedRole,
  onSelect,
  imageSrc,
  title,
  description,
}) => {
  return (
    <div
      onClick={() => onSelect(role)}
      className={`w-[168px] h-[224px] flex flex-col items-center justify-center px-4 rounded-lg border-2 cursor-pointer transition-all ${
        selectedRole === role ? "border-[#84A667]" : "border-[#D1D1D6]"
      }`}
    >
      {/* ✅ 캐릭터 이미지 */}
      <Image src={imageSrc} alt={title} width={100} height={100} />

      {/* ✅ 텍스트 박스 */}
      <p className="mt-1 text-sm text-center text-[#6B7178]">{description}</p>
      <p className="mt-2 text-lg font-bold">{title}</p>
    </div>
  );
};

export default RoleCard;
