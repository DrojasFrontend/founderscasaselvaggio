"use client";

import Image from 'next/image';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState, useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TextoImagen = ({ grupo, className }) => {
  const items = grupo?.items?.node;
  let descripcion = grupo?.descripcion || '';
  const fraseResaltar = "Selvaggio es una comunidad exclusiva";
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = grupo?.items?.map(item => ({
    src: item.imagen?.node?.mediaItemUrl,
    alt: item.imagen?.node?.altText || 'Imagen'
  })) || [];

  return (
    <section className="customSeccionTextoImagen">
      <div className={`container pt-lg-5`}>
        <div className={`row d-flex ${className}`}>
          <div className="d-flex flex-column col-12 col-lg-6">
            <div className='bg-primary p-lg-5 p-4 h-100 mt-4 mt-lg-0'>
              <h2 className='text-center text-white mb-4'>{grupo?.titulo}</h2>
              {descripcion ? (
                parse(descripcion)
              ) : (
                <div className=''>
                  <Swiper
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={false}
                    pagination={false}
                    className="mySwiper"
                  >
                    {grupo?.bloques?.map((bloque, idx) => (
                      <SwiperSlide key={idx}>
                        {parse(bloque.texto)}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="swiper-navigation-buttons d-flex justify-content-center mt-5">
                    <button
                      className="btn btn-light me-2"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
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
                <SwiperSlide key={item.id || idx} className='text-center position-relative'>
                  {item.imagen?.node?.mediaItemUrl && (
                    <>
                      <Image
                        src={item.imagen.node.mediaItemUrl}
                        alt={item.imagen.node.altText || 'Imagen'}
                        className='img-fluid custom-image-height'
                        width={800}
                        height={500}
                        quality={100}
                        priority
                        style={{
                          cursor: 'pointer',
                          objectFit: 'cover',
                          width: '100%'
                        }}
                      />
                      <div
                        className="position-absolute top-0 end-0 m-2 bg-white rounded-circle p-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setIndex(idx);
                          setOpen(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <Lightbox
              slides={slides}
              open={open}
              close={() => setOpen(false)}
              index={index}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextoImagen;