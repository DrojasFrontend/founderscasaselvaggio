import Video from './components/Video';
import MultiStepForm from './components/MultiStepForm';
import Header from './components/Header';
import Footer from './components/Footer';
import TextoImagen from './components/TextoImagen';

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="mb-5">
        <Video />
      </div>

      <TextoImagen />

      <div className="row">
        <div className="col-md-12">
          <MultiStepForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
