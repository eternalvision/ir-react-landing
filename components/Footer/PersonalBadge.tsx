'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type SVGProps,
} from 'react';
import { createPortal } from 'react-dom';

const PORTFOLIO_URL = 'https://portfolio.eternalvision.cc';

export const Monogram = ({
  children,
  ...props
}: SVGProps<SVGSVGElement> & { children: string }) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <rect
      x="0.75"
      y="0.75"
      width="30.5"
      height="30.5"
      rx="9"
      stroke="currentColor"
      strokeOpacity="0.22"
    />

    <text
      x="16"
      y="17.4"
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        font: 'italic 400 17px var(--font-instrument-serif, Georgia, serif)',
        fill: 'currentColor',
      }}
    >
      {children}
    </text>
  </svg>
);

const styles = `
  :host {
    display: inline-block;
    contain: content;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .personal-badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-height: 36px;
    padding: 5px 12px 5px 5px;

    border: 1px solid rgba(241, 239, 237, 0.12);
    border-radius: 999px;

    background:
      linear-gradient(
        180deg,
        rgba(24, 22, 21, 0.92),
        rgba(11, 10, 10, 0.9)
      );

    color: #aaa5a1;

    box-shadow:
      inset 0 1px 0 rgba(215, 210, 206, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.58),
      0 16px 32px -22px rgba(0, 0, 0, 0.9);

    font-family:
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      "Liberation Mono",
      "Courier New",
      monospace;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.035em;
    text-decoration: none;
    white-space: nowrap;

    -webkit-backdrop-filter: blur(18px) saturate(125%);
    backdrop-filter: blur(18px) saturate(125%);

    transition:
      color 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
  }

  .personal-badge:hover {
    color: #f1efed;
    border-color: rgba(226, 221, 216, 0.28);

    background:
      linear-gradient(
        180deg,
        rgba(36, 33, 31, 0.96),
        rgba(18, 16, 15, 0.94)
      );

    box-shadow:
      inset 0 1px 0 rgba(226, 221, 216, 0.16),
      inset 0 -1px 0 rgba(0, 0, 0, 0.62),
      0 18px 38px -22px rgba(0, 0, 0, 0.95);

    transform: translateY(-1px);
  }

  .personal-badge:active {
    transform: translateY(0);
  }

  .personal-badge:focus-visible {
    outline: 1px solid rgba(226, 221, 216, 0.72);
    outline-offset: 3px;
  }

  .personal-badge__monogram {
    display: block;
    width: 26px;
    height: 26px;
    flex: 0 0 26px;

    color: #d7d2ce;

    filter:
      drop-shadow(0 1px 0 rgba(255, 255, 255, 0.06))
      drop-shadow(0 8px 12px rgba(0, 0, 0, 0.45));

    transition:
      color 180ms ease,
      transform 180ms ease;
  }

  .personal-badge:hover .personal-badge__monogram {
    color: #ffffff;
    transform: rotate(-2deg) scale(1.02);
  }

  .personal-badge__label {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
  }

  .personal-badge__prefix {
    color: #77716d;
  }

  .personal-badge__name {
    color: #d7d2ce;
    transition: color 180ms ease;
  }

  .personal-badge:hover .personal-badge__name {
    color: #ffffff;
  }

  @media (prefers-reduced-motion: reduce) {
    .personal-badge,
    .personal-badge__monogram,
    .personal-badge__name {
      transition: none;
    }
  }
`;

export interface PersonalBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  className?: string;
  style?: CSSProperties;
  prefix?: string;
  name?: string;
  href?: string;
}

export function PersonalBadge({
  className,
  style,
  prefix = 'Crafted by',
  name = 'AP',
  href = PORTFOLIO_URL,
  ...props
}: PersonalBadgeProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    setShadowRoot(root);
  }, []);

  return (
    <span
      ref={hostRef}
      className={className}
      style={{
        display: 'inline-block',
        lineHeight: 0,
        ...style,
      }}
      {...props}
    >
      {shadowRoot &&
        createPortal(
          <>
            <style>{styles}</style>

            <a
              className="personal-badge"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${prefix} ${name} - open portfolio`}
            >
              <Monogram className="personal-badge__monogram">
                {name}
              </Monogram>

              <span className="personal-badge__label">
                <span className="personal-badge__prefix">{prefix}</span>
                <span className="personal-badge__name">{name}</span>
              </span>
            </a>
          </>,
          shadowRoot,
        )}
    </span>
  );
}