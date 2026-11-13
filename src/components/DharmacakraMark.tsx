import React from 'react';

interface DharmacakraMarkProps {
  className?: string;
}

export const DharmacakraMark: React.FC<DharmacakraMarkProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="32" cy="32" r="16.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.65" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="26" />
        <line x1="32" y1="38" x2="32" y2="58" />
        <line x1="6" y1="32" x2="26" y2="32" />
        <line x1="38" y1="32" x2="58" y2="32" />
        <line x1="13.6" y1="13.6" x2="27.7" y2="27.7" />
        <line x1="36.3" y1="36.3" x2="50.4" y2="50.4" />
        <line x1="50.4" y1="13.6" x2="36.3" y2="27.7" />
        <line x1="27.7" y1="36.3" x2="13.6" y2="50.4" />
      </g>
    </svg>
  );
};
