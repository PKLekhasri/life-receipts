import React from 'react';
import { ReceiptCategory } from '../../types/receipt';
import { getCategoryTheme } from '../../utils/categoryUtils';
import { Music, Film, MapPin, CreditCard, Camera, MessageSquare, Search, Calendar, FileText } from 'lucide-react';

const iconMap: Record<string, any> = {
  Music,
  Film,
  MapPin,
  CreditCard,
  Camera,
  MessageSquare,
  Search,
  Calendar,
  FileText
};

interface CategoryBadgeProps {
  category: ReceiptCategory;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, showIcon = true, size = 'md' }) => {
  const theme = getCategoryTheme(category);
  const IconComponent = iconMap[theme.iconName] || FileText;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-semibold'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${theme.badgeBg} ${theme.borderColor} ${theme.badgeText} font-medium ${sizeClasses}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{category}</span>
    </span>
  );
};
