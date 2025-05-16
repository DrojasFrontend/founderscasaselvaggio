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
      <div className={`container pt-lg-5`}>
        <div className={`row d-flex ${className}`}>
          <div className="d-flex flex-column col-12 col-lg-6">
            <div className='bg-primary p-5 h-100 mt-4 mt-lg-0'>
              <h2 className='text-center text-white mb-4'>{grupo?.titulo}</h2>
              <div className=''>
                {parse(descripcion)}
              </div>
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
                      width={1000}
                      height={100}
                      quality={100}
                      priority
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