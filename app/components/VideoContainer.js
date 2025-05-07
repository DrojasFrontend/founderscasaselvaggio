'use client';
import { gql, useQuery } from '@apollo/client';
import Video from './Video';

const VIDEO_QUERY = gql`
  query GetVideo {
    page(id: "9", idType: DATABASE_ID) {
      id
      paginaInicio {
        grupoHero {
          video
        }
      }
    }
  }
`;

export default function VideoContainer() {
  const { data, loading, error } = useQuery(VIDEO_QUERY, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <p>Cargando video...</p>;
  if (error) return <p>Error al cargar el video.</p>;

  const videoUrl = data?.page?.paginaInicio?.grupoHero?.video;

  return <Video videoUrl={videoUrl} />;
} 