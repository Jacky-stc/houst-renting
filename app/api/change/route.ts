import { google } from "googleapis";
import { NextResponse } from "next/server";

interface requestBody {
  index: string;
  rentingStatus: "已上架" | "未上架" | "待出租" | "已下架" | string;
}

const statusSwitchList = {
  已上架: ["未上架", "B"],
  未上架: ["已上架", "B"],
  待出租: ["已下架", "A"],
  已下架: ["待出租", "A"],
};

export async function POST(req: Request) {
  const body: requestBody = await req.json();
  let updateStatus = "";
  let column = "";
  if (Object.keys(statusSwitchList).includes(body.rentingStatus)) {
    updateStatus =
      statusSwitchList[body.rentingStatus as keyof typeof statusSwitchList][0];
    column =
      statusSwitchList[body.rentingStatus as keyof typeof statusSwitchList][1];
  } else {
    updateStatus = body.rentingStatus;
    column = "V";
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
      range: `物件總表!${column}${Number(body.index) + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[updateStatus]],
      },
    });
    return NextResponse.json(
      { message: "ok", rentingStatus: updateStatus },
      { status: 200 },
    );
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
