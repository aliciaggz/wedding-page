export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
}

export function addToCalendar(event: CalendarEvent) {
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description || "");
  const location = encodeURIComponent(event.location || "");

  // Formato ISO para Google (YYYYMMDDTHHmmSSZ)
  const startUTC = event.start.toISOString().replace(/-|:|\.\d+/g, "");
  const endUTC = event.end.toISOString().replace(/-|:|\.\d+/g, "");

  const userAgent = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  // Si es Android o Desktop, Google Calendar suele ser lo más cómodo
  if (/Android/i.test(userAgent) || !/iPhone|iPad|iPod/i.test(userAgent)) {
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${description}&location=${location}`;
    window.open(googleUrl, "_blank");
  } else {
    // Para iOS (iPhone/iPad), generamos el ICS limpio sin espacios de sangría
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Boda//ES",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ""}`,
      `LOCATION:${event.location || ""}`,
      `DTSTART:${startUTC}`,
      `DTEND:${endUTC}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const icsContent = icsLines.join("\r\n"); // Usamos el salto de línea estándar de red

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "boda.ics"; // Nombre de archivo simple
    document.body.appendChild(a);
    a.click();

    // Pequeño delay para asegurar que iOS procese la descarga antes de limpiar
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}
