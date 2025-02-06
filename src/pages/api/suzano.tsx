import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { config } from "dotenv";

config();
// @ts-ignore
export default async function (req, res) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.email,
      // @ts-ignore
      key: process.env.key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      // @ts-ignore
      process.env.apiGoogle,
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const data = rows.map((row) => ({
      // @ts-ignore
      marcaTemporal: row._rawData[0],
      // @ts-ignore
      dataDaActividade: row._rawData[1],
      // @ts-ignore
      horaInicio: row._rawData[2],
      // @ts-ignore
      horaFim: row._rawData[3],
      // @ts-ignore
      kmPercorrido: row._rawData[4],
      // @ts-ignore
      ltsCombustivel: row._rawData[5],
      // @ts-ignore
      toneladasCarga: row._rawData[6],
      // @ts-ignore
      nomeFazenda: row._rawData[7],
      // @ts-ignore
      nomeMotorista: row._rawData[8],
      // @ts-ignore
      cpfMotorista: row._rawData[9],
      // @ts-ignore
      transportador: row._rawData[10],
      // @ts-ignore
      marcaCaminhao: row._rawData[11],
      // @ts-ignore
      modelo: row._rawData[12],
      // @ts-ignore
      instrutor: row._rawData[13],
    }));

    res.status(200).json(data);
  } catch (e) {
    console.error("Error!:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
