import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MessageProps {
  isUser: boolean;
  children: React.ReactNode;
}

export const Message = ({ isUser, children }: MessageProps) => {
  return (
    <Card
      className={cn(
        "p-0 max-w-[75%]",
        isUser
          ? "bg-[#FF6D8D] text-white rounded-2xl rounded-br-sm"
          : "border border-muted bg-white rounded-2xl rounded-bl-sm"
      )}
    >
      <div className="p-3 text-sm">{children}</div>
    </Card>
  );
};
