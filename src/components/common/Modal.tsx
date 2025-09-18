"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-backdrop)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Contenedor del modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-surface text-text font-WorkSans rounded-2xl shadow-lg w-full max-w-lg mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-4">{children}</div>

            {/* Footer opcional */}
            {footer && (
              <div className="p-4 border-t border-[var(--color-border)] flex justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
