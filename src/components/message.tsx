import { cls } from "@/libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string | null;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}>
      {avatarUrl ? (
        <Image
          src={`https://imagedelivery.net/-iJxaZY5qULn22hrA5P1Cg/${avatarUrl}/avatar`}
          className="w-8 h-8 rounded-full bg-slate-400"
          alt="profile"
          width={32}
          height={32}
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      )}
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
