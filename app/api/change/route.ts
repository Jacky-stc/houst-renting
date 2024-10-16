import { google } from "googleapis";
import { NextResponse } from "next/server";

interface requestBody {
  index: string;
  region: string;
  rentingStatus: string;
}

export async function POST(req: Request) {
  const body: requestBody = await req.json();
  console.log(body);
  let updateStatus = "";
  if (body.rentingStatus === "未上架") {
    updateStatus = "已上架";
  } else {
    updateStatus = "未上架";
  }
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
      range: `${body.region}!B${body.index}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[updateStatus]],
      },
    });
    console.log(response);
    return NextResponse.json(
      { message: "ok", rentingStatus: updateStatus },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error,
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: privateKey,
      },
      { status: 500 },
    );
  }
}
