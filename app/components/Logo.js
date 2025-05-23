'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="logo-container">
      <Link href="/">
        <Image
          src="/images/logo-casaselvaggio.svg"
          alt="Logo de la empresa"
          width={220}
          height={95}
          priority
        />
      </Link>
    </div>
  );
};

export default Logo; 