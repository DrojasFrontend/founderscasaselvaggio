"use client";

import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 text-center text-lg-start mb-5 mb-lg-0">
            <Image
              src="/images/logo-casaselvaggio-dorado.svg"
              alt="Logo de la empresa"
              width={220}
              height={95}
              priority
            />
          </div>
          <div className="col-12 col-lg-4 text-center mb-5 mb-lg-0">
            <Image
              src="/images/logo-casaselvaggio-founders.svg"
              alt="Logo de la empresa"
              width={214}
              height={113}
              priority
            />
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex justify-content-lg-end justify-content-center gap-3">
              <Link href="https://www.instagram.com/forestiacocinalocal/" target="_blank">
                <Image
                  src="/images/icon-instagram.svg"
                  alt="Logo de la empresa"
                  width={24}
                  height={24}
                  priority
                />
              </Link>

              <Link href="https://www.facebook.com/casaselvaggio/" target="_blank">
                <Image
                  src="/images/icon-facebook.svg"
                  alt="Logo de la empresa"
                  width={24}
                  height={24}
                  priority
                />
              </Link>

              <Link href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ" target="_blank">
                <Image
                  src="/images/icon-youtube.svg"
                  alt="Logo de la empresa"
                  width={24}
                  height={24}
                  priority
                />
              </Link>

              <Link href="https://www.waze.com/ul?ll=4.60972960%2C-74.08467270&navigate=yes&utm_campaign=waze_website&utm_source=waze_website&utm_medium=lm_share_location" target="_blank">
                <Image
                  src="/images/icon-waze.svg"
                  alt="Logo de la empresa"
                  width={24}
                  height={24}
                  priority
                />
              </Link>

              <Link href="https://wa.me/573178000000" target="_blank">
                <Image
                  src="/images/icon-whatsapp.svg"
                  alt="Logo de la empresa"
                  width={24}
                  height={24}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
        <p className="copyright text-center mt-5 pt-5 mb-0">© Copyright 2025, CASA SELVAGGIO</p>
      </div>
    </footer>
  );
};

export default Footer; 