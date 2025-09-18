import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authClient } from '../../../lib/authClient';
import { useInvitationStore } from '../../../store/onboarding/invitationStore';
import type { User } from '../../../types/auth';

function InviteUserPage() {
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { invitation, setInvitation, clearInvitation } = useInvitationStore();

  useEffect(() => {
    const initialize = async () => {
      const searchParams = new URLSearchParams(location.search);
      const inviteId = searchParams.get('inviteId');
      const email = searchParams.get('email');

      if (!inviteId) {
        setError('ID de invitación no válido');
        setLoading(false);
        return;
      }

      try {
        const { data: session } = await authClient.getSession();
        const user = session?.user || null;
        if (email == user?.email) {
          setUser(user);
        }

        setInvitation({ id: inviteId, email: email ?? '' });
      } catch (err) {
        console.error('Error al obtener la sesión:', err);
        setError('Error al cargar la invitación');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [location.search, setInvitation]);

  const handleAcceptInvite = async () => {
    if (!user) {
      navigate(`/login?callback=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }

    if (!invitation?.id) {
      setError('No se encontró una invitación válida');
      return;
    }

    setAccepting(true);
    setError(null);

    try {
      const { data, error } = await authClient.organization.acceptInvitation({
        invitationId: invitation.id
      });

      if (error) {
        throw new Error(error.message || 'Error al aceptar la invitación');
      }

      setSuccess(true);
      clearInvitation();

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error al aceptar invitación:', err);
      setError(err.message || 'Error al aceptar la invitación');
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectInvite = async () => {
    if (!user || !invitation?.id) return;

    try {
      await authClient.organization.rejectInvitation({
        invitationId: invitation.id
      });

      clearInvitation();
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al rechazar invitación:', err);
      setError('Error al rechazar la invitación');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Invitación Aceptada!</h2>
          <p className="text-gray-600 mb-4">Te has unido exitosamente a la organización.</p>
          <p className="text-sm text-gray-500">Redirigiendo al dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Invitación a Organización
          </h1>
          <p className="text-gray-600">
            Has sido invitado a unirte a una organización
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!user ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Necesitas una cuenta para poder ingresar
            </p>
            <button
              onClick={() => navigate(`/register?callback=invitation_request`)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Registrarse
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Usuario:</strong> {user.email}
              </p>
              <p className="text-sm text-blue-800 mt-1">
                <strong>Invitación ID:</strong> {invitation?.id}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAcceptInvite}
                disabled={accepting}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {accepting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Aceptando...
                  </span>
                ) : (
                  'Aceptar Invitación'
                )}
              </button>

              <button
                onClick={handleRejectInvite}
                disabled={accepting}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                Rechazar Invitación
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteUserPage;