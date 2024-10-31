const SearchForm = () => {
  return (
    <div className="search-form">
      <form>
        <div className="form-group">
          <label>Ingresa tu DNI o Email</label>
          <input 
            type="text" 
            placeholder="DNI o Email"
          />
        </div>
        <button type="submit">
          Buscar mi Rutina
        </button>
      </form>
    </div>
  );
};

export default SearchForm; 