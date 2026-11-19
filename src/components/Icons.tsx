import React from 'react';

interface IconProps {
  className?: string;
}

export function IconCheck({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconArrowRight({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconBolt({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPlus({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconInstagram({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.2h.01" />
    </svg>
  );
}

export function IconTikTok({ className = 'icone' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.6 2 4.2 4.5 4.5" />
    </svg>
  );
}

export function StatusSignalIcons() {
  return (
    <span className="icones">
      <svg viewBox="0 0 18 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.4-1.5C13.2 1.5 10.7.5 8 .5S2.8 1.5.9 3.3l1.4 1.5C3.8 3.4 5.8 2.6 8 2.6zm0 3.5c1.2 0 2.4.5 3.2 1.3l1.4-1.5C11.4 4.7 9.8 4 8 4s-3.4.7-4.6 1.9l1.4 1.5c.8-.8 2-1.3 3.2-1.3zm0 3.4c-.6 0-1.1.2-1.5.6L8 11.8l1.5-1.7c-.4-.4-.9-.6-1.5-.6z" />
      </svg>
      <svg viewBox="0 0 27 12" fill="none">
        <rect x="0.5" y="0.5" width="23" height="11" rx="3.2" stroke="currentColor" opacity="0.45" />
        <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
        <path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4z" fill="currentColor" opacity="0.45" />
      </svg>
    </span>
  );
}

export function BrowserLockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
