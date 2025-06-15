import { google } from "googleapis";
import { NextResponse } from "next/server";

interface requestBody {
  index: string;
  price: string;
}

export async function POST(req: Request) {
  const body: requestBody = await req.json();
  let column = "K";
  const price = body.price;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const sheet = google.sheets({
      auth,
      version: "v4",
    });
    const response = await sheet.spreadsheets.values.update({
      spreadsheetId: process.env.SHEETID,
      range: `物件總表!${column}${Number(body.index) + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[price]],
      },
    });
    return NextResponse.json({ message: "ok", price: price }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 },
    );
  }
}
