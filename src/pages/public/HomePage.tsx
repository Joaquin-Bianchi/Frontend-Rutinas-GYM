import SearchForm from "./components/SearchForm";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Consulta tu Rutina</h1>
      <div className="search-section">
        <SearchForm />
      </div>
      <div className="results-section">lista de rutinas</div>
    </div>
  );
};

export default HomePage;
