'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  image: string;
  description: React.ReactNode;
}

export default function PortfolioModal({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  description,
}: PortfolioModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* Backdrop — click outside closes */
    <div className="portfolio-modal" onClick={onClose}>
      {/* Close X button */}
      <button className="close-modal" onClick={onClose} aria-label="Close">
        <div className="lr">
          <div className="rl" />
        </div>
      </button>

      {/* Content — stop propagation so clicking inside doesn't close */}
      <div
        className="max-w-3xl mx-auto px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p className="item-intro">{subtitle}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} />
        <div>{description}</div>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded transition-colors duration-200 cursor-pointer border-none mt-4"
          style={{ backgroundColor: '#ee3030' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#c01010')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ee3030')
          }
        >
          <FontAwesomeIcon icon={faTimes} />
          Close Project
        </button>
      </div>
    </div>
  );
}
