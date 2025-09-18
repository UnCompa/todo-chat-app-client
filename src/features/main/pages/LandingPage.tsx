// src/pages/LandingPage.jsx

import { Helmet } from 'react-helmet';
import Header from "../../../components/layout/Header";
import Hero from "../components/Hero";
function LandingPage() {

  return (
    <>
      <Helmet>
        <title>Saberium | Herramienta de Productividad</title>
        <meta name="description" content="Saberium es una herramienta de productividad diseñada para optimizar tu flujo de trabajo." />
      </Helmet>
      <Header></Header>
      <Hero/>
    </>
  );
}

export default LandingPage;
