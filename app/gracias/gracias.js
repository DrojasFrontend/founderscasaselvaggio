'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GET_GRACIAS_PAGE = gql`
  query GetGraciasPage {
    page(id: "240", idType: DATABASE_ID) {
      paginaGracias {
        grupo {
          imagen {
            node {
              altText
              mediaItemUrl
            }
          }
          logo1 {
            node {
              altText
              mediaItemUrl
            }
          }
          logo2 {
            node {
              altText
              mediaItemUrl
            }
          }
          fondo {
            node {
              altText
              mediaItemUrl
            }
          }
          titulo
          descripcion
          cta {
            target
            title
            url
          }
        }
      }
    }
  }
`;

const FOOTER_QUERY = gql`
  query GetFooter {
    page(id: "9", idType: DATABASE_ID) {
      paginaInicio {
        grupoFooter {
          logo1 { node { mediaItemUrl } }
          logo2 { node { mediaItemUrl } }
          redes {
            icono { node { mediaItemUrl } }
            cta { url target }
          }
        }
      }
    }
  }
`;

export default function GraciasPage() {
    const { data: dataGracias } = useQuery(GET_GRACIAS_PAGE);
    const { data: dataFooter } = useQuery(FOOTER_QUERY);

    const grupo = dataGracias?.page?.paginaGracias?.grupo;
    const grupoFooter = dataFooter?.page?.paginaInicio?.grupoFooter;

    return (
        <main>
            <Header />
            <section>
                <div className="container pt-lg-5" style={{ minHeight: '100vh' }}>
                    <div className="row align-items-center" style={{ minHeight: '100vh' }}>
                        <div className="col-12 col-lg-5">
                            {grupo?.imagen?.node?.mediaItemUrl && (
                                <Image
                                    src={grupo.imagen.node.mediaItemUrl}
                                    alt={grupo.imagen.node.altText || 'Imagen'}
                                    width={407}
                                    height={585}
                                    priority
                                    quality={100}
                                    style={{
                                        cursor: 'pointer',
                                        objectFit: 'contain',
                                        width: '100%'
                                    }}
                                    className="mb-4"
                                />
                            )}
                        </div>
                        <div className="col-12 col-lg-7">
                            <div className="row d-flex align-items-center h-100">
                                <div className="col-12 col-lg-6 text-center">
                                    {grupo?.logo1?.node?.mediaItemUrl && (
                                        <Image
                                            src={grupo.logo1.node.mediaItemUrl}
                                            alt={grupo.logo1.node.altText || 'Logo 1'}
                                            width={179}
                                            height={95}
                                            priority
                                            className="mb-4"
                                        />
                                    )}
                                </div>
                                <div className="col-12 col-lg-6 text-center">
                                    {grupo?.logo2?.node?.mediaItemUrl && (
                                        <Image
                                            src={grupo.logo2.node.mediaItemUrl}
                                            alt={grupo.logo2.node.altText || 'Logo 2'}
                                            width={221}
                                            height={95}
                                            priority
                                            className="mb-4"
                                        />
                                    )}
                                </div>
                                <div className="col-12 text-center">
                                    {grupo?.titulo && <h1 className="fs-3 mb-4">{parse(grupo.titulo)}</h1>}
                                </div>
                                <div className="col-12 col-lg-9 mx-auto text-center">
                                    {grupo?.descripcion && <p className="mb-4">{parse(grupo.descripcion)}</p>}
                                </div>
                                <div className="col-12 text-center">
                                    {grupo?.cta && (
                                        <Link
                                            href={grupo.cta.url}
                                            target={grupo.cta.target}
                                            className="btn btn-success"
                                        >
                                            {grupo.cta.title}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer grupoFooter={grupoFooter} />
        </main>
    );
} 