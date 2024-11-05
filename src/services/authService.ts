import api from "@/lib/axios";

type LoginFormData = {
  email: string;
  password: string;
};
interface JwtPayload {
  exp?: number;
}

export const signIn = async (credentials: LoginFormData) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error: any) {
    console.log('Error completo:', error);
    console.log('Response data:', error.response?.data);
    console.log('Error message:', error.response?.data?.error);
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    // Decodificar el token (que está en base64)
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;

    // Verificar si el token ha expirado
    if (payload.exp) {
      const expired = payload.exp * 1000 < Date.now();
      if (expired) {
        localStorage.removeItem("token");
        return false;
      }
    }

    return true;
  } catch {
    // Si hay algún error al decodificar el token, lo consideramos inválido
    localStorage.removeItem("token");
    return false;
  }
};
