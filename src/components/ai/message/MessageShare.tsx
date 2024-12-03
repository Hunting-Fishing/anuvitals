import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

interface MessageShareProps {
  content: string;
  onShare?: (method: 'copy' | 'email' | 'link') => void;
}

export function MessageShare({ content, onShare }: MessageShareProps) {
  const handleShare = async (method: 'copy' | 'email' | 'link') => {
    try {
      switch (method) {
        case 'copy':
          await navigator.clipboard.writeText(content);
          toast({
            title: "Copied to clipboard",
            description: "Message content has been copied to your clipboard.",
          });
          break;
        case 'email':
          window.location.href = `mailto:?body=${encodeURIComponent(content)}`;
          break;
        case 'link':
          // Generate a shareable link (you'll need to implement this based on your requirements)
          const shareableLink = `${window.location.origin}/shared/${btoa(content)}`;
          await navigator.clipboard.writeText(shareableLink);
          toast({
            title: "Link copied",
            description: "Shareable link has been copied to your clipboard.",
          });
          break;
      }
      onShare?.(method);
    } catch (error) {
      toast({
        title: "Error sharing message",
        description: "Failed to share the message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-gray-700/50">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share message</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleShare('copy')}>
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('email')}>
          Share via email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('link')}>
          Copy share link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}