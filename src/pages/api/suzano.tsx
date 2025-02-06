import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import credentials from "../../config/config.json";

export default async function (req, res) {
  try {
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      "1ladXmldMggj8VjDH884MW9Rnv6ahsWFit-FaP8llczA",
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const data = rows.map((row) => ({
      marcaTemporal: row._rawData[0],
      dataDaActividade: row._rawData[1],
      horaInicio: row._rawData[2],
      horaFim: row._rawData[3],
      kmPercorrido: row._rawData[4],
      ltsCombustivel: row._rawData[5],
      toneladasCarga: row._rawData[6],
      nomeFazenda: row._rawData[7],
      nomeMotorista: row._rawData[8],
      cpfMotorista: row._rawData[9],
      transportador: row._rawData[10],
      marcaCaminhao: row._rawData[11],
      modelo: row._rawData[12],
      instrutor: row._rawData[13],
    }));

    res.status(200).json(data);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
