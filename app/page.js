import Video from './components/Video';
import MultiStepForm from './components/MultiStepForm';
import Header from './components/Header';
import Footer from './components/Footer';
import TextoImagen from './components/TextoImagen';
import fetchGraphQL from './lib/fetchGraphQL';

const VIDEO_QUERY = `
  query GetVideo {
    page(id: "9", idType: DATABASE_ID) {
      paginaInicio {
        grupoHero {
          video
        }
      }
    }
  }
`;

const TITULO_QUERY = `
  query GetVideo {
    page(id: "9", idType: DATABASE_ID) {
      paginaInicio {
        grupoTitulo {
          titulo
        }
        mostrarTitulo
      }
    }
  }
`;

const TEXTO_IMAGEN_QUERY = `
  query GetTextoImagen {
    page(id: "9", idType: DATABASE_ID) {
      paginaInicio {
        mostrarTextoImagen
        grupoTextoImagen {
          descripcion
          titulo
          items {
            imagen {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

const IMAGEN_TEXTO__QUERY = `
  query GetTextoImagen {
    page(id: "9", idType: DATABASE_ID) {
      paginaInicio {
        mostrarImagenTexto
        grupoImagenTexto {
          descripcion
          titulo
          items {
            imagen {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

const FOOTER_QUERY = `
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

export default async function Home() {
  const videoData = await fetchGraphQL(VIDEO_QUERY);
  const tituloData = await fetchGraphQL(TITULO_QUERY);
  const textoImagenData = await fetchGraphQL(TEXTO_IMAGEN_QUERY);
  const imagenTextoData = await fetchGraphQL(IMAGEN_TEXTO__QUERY);
  const footerData = await fetchGraphQL(FOOTER_QUERY);

  const videoUrl = videoData?.page?.paginaInicio?.grupoHero?.video;

  const titulo = tituloData?.page?.paginaInicio?.grupoTitulo?.titulo;

  const mostrarTextoImagen = textoImagenData?.page?.paginaInicio?.mostrarTextoImagen;
  const grupoTextoImagen = textoImagenData?.page?.paginaInicio?.grupoTextoImagen;

  const mostrarTitulo = imagenTextoData?.page?.paginaInicio?.mostrarTitulo;
  const mostrarImagenTexto = imagenTextoData?.page?.paginaInicio?.mostrarImagenTexto;
  const grupoImagenTexto = imagenTextoData?.page?.paginaInicio?.grupoImagenTexto;

  const grupoFooter = footerData?.page?.paginaInicio?.grupoFooter;

  return (
    <main className="">
      <Header />
      <div className="mb-5">
        <Video videoUrl={videoUrl} />
      </div>

      {mostrarTitulo && (
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7 m-auto text-center">
              <h1>{titulo}</h1>
            </div>
          </div>
        </div>
      )}

      {mostrarTextoImagen && <TextoImagen grupo={grupoTextoImagen} className="flex-column-reverse flex-lg-row" />}
      {mostrarImagenTexto && <TextoImagen grupo={grupoImagenTexto} className="flex-column-reverse flex-lg-row-reverse" />}

      <div className="row">
        <div className="col-md-12">
          <MultiStepForm />
        </div>
      </div>
      <Footer grupoFooter={grupoFooter} />
    </main>
  );
}
