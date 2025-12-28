import type { APIRoute } from "astro";
import { google } from "googleapis";
import type { FormData } from "@/types/types.ts";

const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : "credentials.json";

if (!credentials) {
  throw new Error("GOOGLE_CREDENTIALS environment variable is not set.");
}

console.log("ENV loaded?", process.env.GOOGLE_CREDENTIALS?.length);

const auth = new google.auth.GoogleAuth({
  credentials,
  // keyFile: "credentials.json", //probar en local
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetId = "1CMW7Glyym4bnOdiGo4HMRlJ-bgz6L8a-Kg9GUD1QjPA";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = (await request.json()) as FormData;

    const {
      name,
      lastname,
      email,
      attending,
      bus,
      partnerJoining,
      partnerName,
      allergies,
      comments,
    } = body;

    // Inicializar Google Sheets
    const client = (await auth.getClient()) as any;
    const sheets = google.sheets({ version: "v4", auth: client });

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Hoja1!A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            name,
            lastname,
            email,
            attending,
            bus,
            partnerJoining,
            partnerName,
            allergies,
            comments,
            new Date().toISOString(),
          ],
        ],
      },
    });

    return new Response(
      JSON.stringify({
        message: {
          name,
          lastname,
          email,
          attending,
          bus,
          partnerJoining,
          partnerName,
          allergies,
          comments,
        },
      }),
      {
        status: 200,
      }
    );
  }

  return new Response(null, { status: 400 });
};
