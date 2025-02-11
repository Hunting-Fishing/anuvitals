
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};

export function LoadingSpinner({ 
  size = "md", 
  message, 
  className 
}: LoadingSpinnerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "flex flex-col items-center justify-center p-4 space-y-2",
        className
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn(
          sizeClasses[size],
          "text-primary"
        )} />
      </motion.div>
      {message && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground animate-pulse"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
}
