import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { X } from 'lucide-react';

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

export const useDialog = () => useContext(DialogContext);

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open = false, onOpenChange = () => {}, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(true);
    };

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);
DialogTrigger.displayName = 'DialogTrigger';

export interface DialogPortalProps {
  children: React.ReactNode;
}

export const DialogPortal: React.FC<DialogPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
};

export interface DialogOverlayProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
}

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className = '', style = {}, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      onOpenChange(false);
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        className={`modal-backdrop-frosted ${className}`}
        style={style}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = 'DialogOverlay';

export interface DialogContentProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonAriaLabel?: string;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className = '', children, style = {}, showCloseButton = true, closeButtonAriaLabel = 'Close dialog', ...props }, ref) => {
    const { open, onOpenChange } = useDialog();
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Close on Escape key
    useEffect(() => {
      if (!open) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onOpenChange]);

    // Lock body scroll when open
    useEffect(() => {
      if (!open || typeof document === 'undefined') return;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [open]);

    return (
      <AnimatePresence>
        {open && (
          <DialogPortal>
            <div className="modal-backdrop-frosted" onClick={() => onOpenChange(false)} role="presentation">
              <motion.div
                ref={(node) => {
                  contentRef.current = node;
                  if (typeof ref === 'function') ref(node);
                  else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`case-study-modal-content ${className}`}
                style={style}
                {...props}
              >
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label={closeButtonAriaLabel}
                    className="modal-close-btn"
                  >
                    <X size={18} />
                  </button>
                )}
                {children}
              </motion.div>
            </div>
          </DialogPortal>
        )}
      </AnimatePresence>
    );
  }
);
DialogContent.displayName = 'DialogContent';

export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, style = {}, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogHeader.displayName = 'DialogHeader';

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, style = {}, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        style={{
          fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          lineHeight: 1.25,
          margin: 0,
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, style = {}, ...props }, ref) => {
    return (
      <p
        ref={ref}
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.65,
          margin: 0,
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </p>
    );
  }
);
DialogDescription.displayName = 'DialogDescription';

export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, style = {}, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          marginTop: '1.5rem',
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DialogFooter.displayName = 'DialogFooter';

export const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onOpenChange(false);
    };

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);
DialogClose.displayName = 'DialogClose';

export default Dialog;
