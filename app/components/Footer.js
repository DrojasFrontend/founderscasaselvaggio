"use client";

import Image from 'next/image';
import Link from 'next/link';

const Footer = ({ grupoFooter }) => {
  const logo1 = grupoFooter?.logo1?.node?.mediaItemUrl;
  const logo2 = grupoFooter?.logo2?.node?.mediaItemUrl;
  const redes = grupoFooter?.redes || [];

  return (
    <footer className="text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 text-center text-lg-start mb-5 mb-lg-0">
            {logo1 && (
              <Image
                src={logo1}
                alt="Logo 1"
                width={220}
                height={95}
                priority
              />
            )}
          </div>
          <div className="col-12 col-lg-4 text-center mb-5 mb-lg-0">
            {logo2 && (
              <Image
                src={logo2}
                alt="Logo 2"
                width={214}
                height={113}
                priority
              />
            )}
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex justify-content-lg-end justify-content-center gap-3">
              {redes.map((red, idx) => (
                <Link href={red.cta?.url || '#'} target={red.cta?.target || '_blank'} key={idx}>
                  {red.icono?.node?.mediaItemUrl && (
                    <Image
                      src={red.icono.node.mediaItemUrl}
                      alt={`Red social ${idx + 1}`}
                      width={24}
                      height={24}
                      priority
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="copyright text-center mt-5 pt-5 mb-0">© Copyright 2025, CASA SELVAGGIO</p>
      </div>
    </footer>
  );
};

export default Footer; 