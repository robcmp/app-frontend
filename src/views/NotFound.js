import "../styles/notfound.css";

const NotFound = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>

          <h2>Oops! Nothing was found</h2>
          <p>
            La pagina que usted esta buscando podria haber sido removida, haber
            cambiado su nombre o esta temporalmente fuera servicio.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
