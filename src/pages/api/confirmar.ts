// src/pages/api/confirmar.ts
import type { APIRoute } from "astro";
import { google } from "googleapis";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!); // parse del JSON

const auth = new google.auth.GoogleAuth({
  keyFile: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetId = "1CMW7Glyym4bnOdiGo4HMRlJ-bgz6L8a-Kg9GUD1QjPA";

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, apellido, asistencia } = body;

    if (!nombre || !apellido || !asistencia) {
      return new Response(
        JSON.stringify({ status: "error", mensaje: "Datos incompletos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Inicializar Google Sheets
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[nombre, apellido, asistencia, new Date().toLocaleString()]],
      },
    });

    return new Response(
      JSON.stringify({
        status: "ok",
        mensaje: "✅ Confirmación guardada en Google Sheets",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al guardar en Sheets:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        mensaje: "Error al guardar la confirmación",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
