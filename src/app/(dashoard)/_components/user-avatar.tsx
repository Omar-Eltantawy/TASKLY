type UserAvatarProps = {
  name: string;
  className?: string;
};

const getNameInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export default function UserAvatar({ name, className }: UserAvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl 
        bg-primary-container text-white font-semibold text-sm select-none
        ${className ?? "w-10 h-10"}`}
    >
      {getNameInitials(name)}
    </div>
  );
}
