interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
}

/**
 * Renders an address with hidden decoy spans so scrapers reading the raw DOM
 * collect a broken string while a human sees the real one. Matches the pattern
 * already used on the Contact page.
 */
function ObfuscatedEmail({ user, domain, className }: ObfuscatedEmailProps) {
  return (
    <span className={className}>
      <span>{user}</span>
      <span style={{ display: 'none' }}>nospam</span>
      <span>@</span>
      <span style={{ display: 'none' }}>removethis</span>
      <span>{domain}</span>
    </span>
  );
}

export default ObfuscatedEmail;
