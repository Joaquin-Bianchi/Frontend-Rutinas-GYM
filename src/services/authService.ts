import api from "@/lib/axios";

type LoginFormData = {
  email: string;
  password: string;
};

export const signIn = async (credentials: LoginFormData) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const signOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return { isAuthenticated: false, role: null };

  try {
    // Decodificar el token (que está en base64)
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Verificar si el token ha expirado
    if (payload.exp) {
      const expired = payload.exp * 1000 < Date.now();
      if (expired) {
        localStorage.removeItem("token");
        return { isAuthenticated: false, role: null };
      }
    }
  
    // Retornar autenticación verdadera junto con el rol
    return {
      isAuthenticated: true,
      role: payload.role,
      userId: payload.id || null,
    };
  } catch {
    // Si hay algún error al decodificar el token, lo consideramos inválido
    localStorage.removeItem("token");
    return { isAuthenticated: false, role: null };
  }
};
