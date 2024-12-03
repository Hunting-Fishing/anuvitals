import React from 'react';
import { Message } from '../types';
import { cn } from '@/lib/utils';
import { MessageCategoryBadge } from './MessageCategory';
import { MessageShare } from './MessageShare';
import { format } from 'date-fns';

interface MessageItemProps {
  message: Message;
  virtualRef?: (element: HTMLElement | null) => void;
  style?: React.CSSProperties;
}

export function MessageItem({ message, virtualRef, style }: MessageItemProps) {
  const isUser = message.role === 'user';
  const timestamp = message.timestamp || new Date().toISOString();

  return (
    <div
      ref={virtualRef}
      style={style}
      className={cn(
        'flex gap-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
      role="listitem"
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-4',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted',
          message.error ? 'border-red-500 border' : ''
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          {message.metadata?.category && (
            <MessageCategoryBadge 
              category={message.metadata.category} 
              readonly={true}
            />
          )}
          <span className="text-xs text-gray-500">
            {format(new Date(timestamp), 'HH:mm')}
          </span>
        </div>
        
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        
        <div className="flex justify-end mt-2">
          <MessageShare content={message.content} />
        </div>
      </div>
    </div>
  );
}