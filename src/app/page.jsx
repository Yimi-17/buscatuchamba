function HomePage() {
  return (
    <section className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-8">Bienvenido a Nuestra Plataforma</h1>
        <p className="text-lg mb-6">
          Somos una plataforma dedicada a ayudarte a encontrar empleo de manera rápida y eficiente.
          Conectamos a empresas con profesionales como tú, facilitando el proceso de búsqueda y
          postulación.
        </p>
        <p className="text-lg mb-6">
          Explora nuestras categorías de empleo, busca oportunidades que se ajusten a tu perfil y
          comienza a chambear hoy mismo.
        </p>
        <p className="text-lg mb-6">
          Regístrate ahora para acceder a todas nuestras funcionalidades y mantenerte al día con las
          últimas oportunidades laborales.
        </p>
        <a
          href="/auth/register"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md inline-block mt-4 transition duration-300"
        >
          Regístrate Ahora
        </a>
      </div>
    </section>
  );
}

export default HomePage;
