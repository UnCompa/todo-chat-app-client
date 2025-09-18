import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import { useAuthStore } from "../../../store/auth/authStore";

function LoginPage() {
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login({ email, password });

    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Saberium</title>
        <meta name="description" content="Inicia sesión en Saberium para acceder a tus herramientas de productividad." />
      </Helmet>
      <Header/>
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="card p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
