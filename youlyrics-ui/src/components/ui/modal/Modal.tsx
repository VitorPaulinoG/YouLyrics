import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function Modal({ children, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div aria-modal="true" className="modal" role="dialog">
      <button aria-label="Close modal" className="modal__backdrop" onClick={onClose} type="button" />
      <div className="modal__panel">{children}</div>
    </div>,
    document.getElementById('modal-root') ?? document.body,
  );
}
