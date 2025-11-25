// src/pages/api/confirmar.ts
import type { APIRoute } from "astro";
import { google } from "googleapis";
import type { FormData } from "@/types/types.ts";

const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : "credentials.json";

// parse del JSON
if (!credentials) {
  throw new Error("GOOGLE_CREDENTIALS environment variable is not set.");
}

// const tempKeyFilePath = join(tmpdir(), "google-credentials.json");
// writeFileSync(tempKeyFilePath, credentials);

// if (!raw) {
//   throw new Error("Missing GOOGLE_CREDENTIALS env");
// }

console.log("ENV loaded?", process.env.GOOGLE_CREDENTIALS?.length);

const auth = new google.auth.GoogleAuth({
  keyFile: credentials,
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
      range: "A:J",
      valueInputOption: "USER_ENTERED",
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
            new Date().toLocaleString(),
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
