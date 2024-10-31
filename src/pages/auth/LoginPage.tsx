import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Acceso Profesores</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
