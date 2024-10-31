const ClientList = () => {
  return (
    <div className="client-list">
      <header className="section-header">
        <h2>Clientes</h2>
        <a href="/dashboard/clients/create" className="btn-create">
          Nuevo Cliente
        </a>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Rutina Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irán los clientes */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList; 