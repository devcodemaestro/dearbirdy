import Image from "next/image";

interface BuddyImageProps {
  birdName: string;
}

const BuddyImage = ({ birdName }: BuddyImageProps) => {
  return (
    <div className="mb-4 mt-4 flex justify-center">
      <Image
        src={`/images/birds/${birdName}_280.png`}
        alt={birdName}
        width={200}
        height={200}
      />
    </div>
  );
};

export default BuddyImage;
