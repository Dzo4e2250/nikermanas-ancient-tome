import { cn } from "@/lib/utils";

interface AncientTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

const AncientTitle = ({ children, level = 1, className }: AncientTitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    1: "text-4xl md:text-6xl font-bold",
    2: "text-2xl md:text-4xl font-semibold", 
    3: "text-xl md:text-2xl font-medium"
  };

  return (
    <Tag className={cn(
      "font-gothic text-black text-center",
      "drop-shadow-sm tracking-wide",
      sizeClasses[level],
      className
    )}>
      {children}
    </Tag>
  );
};

export default AncientTitle;