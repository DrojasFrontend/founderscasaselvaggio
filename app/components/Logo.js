'use client';

import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="logo-container">
      <Image
        src="/images/logo-casaselvaggio.svg"
        alt="Logo de la empresa"
        width={220}
        height={95}
        priority
      />
    </div>
  );
};

export default Logo; 