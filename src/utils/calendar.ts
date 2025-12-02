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

  const startUTC = event.start.toISOString().replace(/-|:|\.\d+/g, "");
  const endUTC = event.end.toISOString().replace(/-|:|\.\d+/g, "");

  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  if (isAndroid) {
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${description}&location=${location}&sf=true&output=xml`;
    window.open(googleUrl, "_blank");
  } else if (isIOS) {
    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      BEGIN:VEVENT
      SUMMARY:${event.title}
      DESCRIPTION:${event.description || ""}
      LOCATION:${event.location || ""}
      DTSTART:${startUTC}
      DTEND:${endUTC}
      END:VEVENT
      END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    // Desktop fallback: Google Calendar
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${description}&location=${location}&sf=true&output=xml`;
    window.open(googleUrl, "_blank");
  }
}
