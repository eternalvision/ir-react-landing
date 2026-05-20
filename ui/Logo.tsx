import Image from 'next/image';
import { useConfig } from '@lib/config';

export const Logo = () => {
  const config = useConfig();
  return (
    <Image
      src={config.logoUrl}
      alt={config.companyName}
      width={36}
      height={36}
      className='h-9 w-auto'
      priority
    />
  );
};

Logo.displayName = 'Logo';
