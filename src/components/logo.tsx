
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center" style={{ fontSize: '24px', fontWeight: 'normal' }}>
        <span style={{ position: 'relative', top: '-0.05em' }}>O</span>
        <span style={{ position: 'relative', top: '-0.05em', left: '-0.2em' }}>&lt;</span>
      </div>
      <span className="font-normal tracking-tight font-headline" style={{ fontSize: '24px' }}>Okidex</span>
    </Link>
  );
};

export default Logo;
