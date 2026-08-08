import { useState } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  /** Label for the button shown before the address is revealed. */
  label: string;
  /** Prefilled subject for the composed message. */
  subject?: string;
  buttonClassName?: string;
  /** Applied to the address once it is on screen. */
  className?: string;
}

/**
 * Withholds an address behind a button. Clicking opens the visitor's mail client
 * with the subject already filled in and reveals the address, which is the
 * fallback for anyone whose browser has no mail handler and would otherwise be
 * left with nothing to copy.
 *
 * Nothing matching an email pattern exists in the markup until that click, so a
 * harvester has to execute the page and drive the button rather than just read
 * it. The revealed address is broken up by hidden decoy spans, so extracting the
 * raw DOM text still yields a corrupted string.
 */
function ObfuscatedEmail({
  user,
  domain,
  label,
  subject,
  buttonClassName,
  className,
}: ObfuscatedEmailProps) {
  const [revealed, setRevealed] = useState(false);

  const buildHref = () =>
    `mailto:${user}@${domain}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => {
          setRevealed(true);
          window.location.href = buildHref();
        }}
        className={buttonClassName}
      >
        {label}
      </button>
    );
  }

  return (
    <a href={buildHref()} rel="nofollow" className={className}>
      <span>{user}</span>
      <span style={{ display: 'none' }}>nospam</span>
      <span>@</span>
      <span style={{ display: 'none' }}>removethis</span>
      <span>{domain}</span>
    </a>
  );
}

export default ObfuscatedEmail;
