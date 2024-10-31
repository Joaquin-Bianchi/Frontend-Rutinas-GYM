const DashboardPage = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Bienvenido, Profesor</span>
          <button>Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <ul>
            <li>
              <a href="/dashboard/clients">Clientes</a>
            </li>
            <li>
              <a href="/dashboard/exercises">Ejercicios</a>
            </li>
            <li>
              <a href="/dashboard/routines">Rutinas</a>
            </li>
          </ul>
        </nav>

        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>Total Clientes</h3>
            <p>0</p>
          </div>
          <div className="summary-card">
            <h3>Rutinas Activas</h3>
            <p>0</p>
          </div>
          <div className="summary-card">
            <h3>Ejercicios</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
