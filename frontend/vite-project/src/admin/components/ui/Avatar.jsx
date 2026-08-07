import { User } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { initials } from '../../utils/format';
import { getMediaUrl } from '../../utils/helpers';

const SIZES = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

export const Avatar = ({ name, src, size = 'md', className }) => {
  const url = getMediaUrl(src);
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-semibold text-primary-700 dark:bg-primary-500/20 dark:text-primary-300',
        SIZES[size],
        className
      )}
    >
      {url ? (
        <img src={url} alt={name || 'Avatar'} className="h-full w-full object-cover" loading="lazy" />
      ) : name ? (
        initials(name)
      ) : (
        <User className="h-1/2 w-1/2" />
      )}
    </div>
  );
};

export default Avatar;
