import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey: string = process.env.APIKEY || "";
    const sheetId: string = process.env.SHEETID || "";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/物件總表?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(
      { message: "ok", data: data.values },
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
