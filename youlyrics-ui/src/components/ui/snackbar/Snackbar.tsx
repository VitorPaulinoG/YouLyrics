import { useEffect } from 'react';
import clsx from 'clsx';

type SnackbarProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

export function Snackbar({ message, visible, onClose }: SnackbarProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        'bg-primary-07 text-primary-01 subtitle-2/primary-01',
        'px-5 py-3 rounded-lg shadow-lg',
        'transition-all duration-200 ease-out',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none',
      )}
    >
      {message}
    </div>
  );
}
