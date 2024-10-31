const ExerciseList = () => {
  return (
    <div className="exercise-list">
      <header className="section-header">
        <h2>Ejercicios</h2>
        <a href="/dashboard/exercises/create" className="btn-create">
          Nuevo Ejercicio
        </a>
      </header>

      <div className="exercise-grid">
        {/* Grid de tarjetas de ejercicios */}
      </div>
    </div>
  );
};

export default ExerciseList; 