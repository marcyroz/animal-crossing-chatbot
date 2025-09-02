import { cn } from "@/lib/utils";

interface MessageProps {
    isUser: boolean;
    content: string;
}

export const Message = ({ isUser, content }: MessageProps) => {
    return (
        <div className={cn("flex", isUser ? "bg-[#FF6D8D]" : "border-[#FF6D8D]")}>
           
        </div>
    );
}
