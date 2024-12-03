import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MessageCategory } from '../types/MessageCategories';

interface MessageCategoryProps {
  category?: MessageCategory;
  onCategoryChange?: (category: MessageCategory) => void;
  readonly?: boolean;
}

const categoryColors = {
  general: 'bg-gray-500',
  health: 'bg-green-500',
  nutrition: 'bg-blue-500',
  exercise: 'bg-orange-500',
  medication: 'bg-purple-500'
};

export function MessageCategoryBadge({ category, onCategoryChange, readonly }: MessageCategoryProps) {
  if (!category) return null;

  return (
    <Badge 
      className={`${categoryColors[category]} cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={() => !readonly && onCategoryChange?.(category)}
    >
      {category}
    </Badge>
  );
}