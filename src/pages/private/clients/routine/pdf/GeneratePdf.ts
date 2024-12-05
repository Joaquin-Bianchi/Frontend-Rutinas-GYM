import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Routine } from "@/interfaces/routine.interface";

export const generarPDFRutina = (routine: Routine) => {
  const doc = new jsPDF();
  const nombreDia =
    routine.day === "miercoles"
      ? "Miércoles"
      : routine.day === "sabado"
      ? "Sábado"
      : routine.day.charAt(0).toUpperCase() + routine.day.slice(1);

  doc.setFontSize(18);
  doc.text(`Rutina del Día: ${nombreDia}`, 14, 22);

  if (routine.routineExercises?.length > 0) {
    const columnas = [
      "Ejercicio",
      "Series",
      "Repeticiones",
      "Tiempo",
      "Comentarios",
    ];
    const filas = routine.routineExercises.map((ejercicio) => [
      ejercicio.exercise.name,
      ejercicio.sets || "N/A",
      ejercicio.reps || "N/A",
      ejercicio.time ? `${ejercicio.time} min` : "N/A",
      ejercicio.comment || "-",
    ]);

    (doc as any).autoTable({
      startY: 45,
      head: [columnas],
      body: filas,
      theme: "grid",
    });
  } else {
    doc.text("No hay ejercicios asignados para este día.", 14, 45);
  }

  doc.save(`Rutina_${nombreDia.toLowerCase()}.pdf`);
};
