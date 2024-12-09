import api from "@/lib/axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post(`/uploadImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};
