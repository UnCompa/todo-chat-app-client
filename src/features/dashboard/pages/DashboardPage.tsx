import { useAuthStore } from "../../../store/auth/authStore";

function DashboardPage() {
  const { logout } = useAuthStore((state) => state);

  const handleLogout = () => {
    logout();
    // Aquí podrías redirigir, si usas React Router (ej: navigate('/login'))
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Hola mundo</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
