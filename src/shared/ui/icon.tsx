import Image from "next/image";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <div className="bg-surface-highest px-6 py-5 w-fit max-w-17.5 max-h-12 h-fit mt-10 flex items-center justify-center rounded-sm">
      <Image
        src={`/icons/${name}.svg`}
        alt={`${name} Icon`}
        width={size}
        height={size}
        className={className}
      />
    </div>
  );
}
