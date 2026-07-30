import { useState } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
  /**
   * Withhold the address until the visitor asks for it. Nothing resembling an
   * address exists in the DOM until then, so a scraper has to execute the page
   * and simulate a click rather than just read the markup.
   */
  revealOnClick?: boolean;
  /** Prefilled subject for the mailto link shown after revealing. */
  subject?: string;
}

/**
 * Renders an address with hidden decoy spans, so anything reading the raw DOM
 * text collects a broken string while a human sees the real one.
 *
 * The address is never assembled into a single string in the source either,
 * which keeps the compiled bundle free of anything an email regex would match.
 */
function ObfuscatedEmail({
  user,
  domain,
  className,
  revealOnClick = false,
  subject,
}: ObfuscatedEmailProps) {
  const [revealed, setRevealed] = useState(!revealOnClick);

  const parts = (
    <>
      <span>{user}</span>
      <span style={{ display: 'none' }}>nospam</span>
      <span>@</span>
      <span style={{ display: 'none' }}>removethis</span>
      <span>{domain}</span>
    </>
  );

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className={`inline-flex items-center gap-2 underline decoration-dotted underline-offset-4 ${className ?? ''}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Show email address
      </button>
    );
  }

  // Assembled only in response to a click, so it is absent from the initial DOM.
  const href = `mailto:${user}@${domain}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

  return (
    <a href={href} rel="nofollow" className={className}>
      {parts}
    </a>
  );
}

export default ObfuscatedEmail;
