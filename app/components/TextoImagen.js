"use client";

import Image from 'next/image';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TextoImagen = ({ grupo, className }) => {
  const items = grupo?.items?.node;
  let descripcion = grupo?.descripcion || '';
  const fraseResaltar = "Selvaggio es una comunidad exclusiva";

  return (
    <section className="customSeccionTextoImagen">
      <div className={`container py-lg-5`}>
        <div className={`row d-flex ${className}`}>
          <div className="d-flex flex-column justify-content-center col-12 col-lg-6 pt-4 pt-lg-0">
            <h2>{grupo?.titulo}</h2>
            <div className='mb-4'>
              {parse(descripcion)}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={false}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {grupo?.items?.map((item, idx) => (
                <SwiperSlide key={item.id || idx} className='text-center'>
                  {item.imagen?.node?.mediaItemUrl && (
                    <Image
                      src={item.imagen.node.mediaItemUrl}
                      alt={item.imagen.node.altText || 'Imagen'}
                      className='img-fluid'
                      width={437}
                      height={623}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextoImagen;