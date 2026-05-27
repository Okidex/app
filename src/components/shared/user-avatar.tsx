
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatarUrl: string;
  className?: string;
}

const getInitials = (name: string) => {
  if (!name) return '';
  const names = (name || "User").split(' ');
  const initials = names.map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return initials;
};

const UserAvatar = ({ name, avatarUrl, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
