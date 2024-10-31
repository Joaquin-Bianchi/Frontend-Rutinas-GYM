const LoginForm = () => {
  return (
    <form className="login-form">
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          placeholder="tu@email.com"
        />
      </div>
      <div className="form-group">
        <label>Contraseña</label>
        <input 
          type="password" 
          placeholder="********"
        />
      </div>
      <button type="submit">
        Ingresar
      </button>
    </form>
  );
};

export default LoginForm; 