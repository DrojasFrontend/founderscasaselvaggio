"use client";

import Image from 'next/image';

const TextoImagen = ({ grupo, className }) => {
  const imagen = grupo?.imagen?.node;

  return (
    <div className={`container py-lg-5`}>
      <div className={`row d-flex ${className}`}>
        <div className="d-flex flex-column justify-content-center col-12 col-lg-6 pt-4 pt-lg-0">
          <h2>{grupo?.titulo}</h2>
          <p className='mb-4' dangerouslySetInnerHTML={{ __html: grupo?.descripcion }} />
        </div>
        <div className="col-12 col-lg-6 text-center">
          {imagen?.mediaItemUrl && (
            <Image src={imagen.mediaItemUrl} alt={imagen.altText || 'Imagen'} className='img-fluid' width={437} height={623} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TextoImagen;