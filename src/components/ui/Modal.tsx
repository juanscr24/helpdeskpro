import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDangerous = false,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        <div className="px-6 py-4">{children}</div>

        <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              variant={isDangerous ? 'danger' : 'primary'}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
