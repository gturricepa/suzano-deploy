"use client";

import { useEffect, useState } from "react";
import Home from "@/pages/templates/home";

interface Atividade {
  marcaTemporal: string;
  dataDaActividade: string;
  horaInicio: string;
  horaFim: string;
  kmPercorrido: string;
  ltsCombustivel: string;
  toneladasCarga: string;
  nomeFazenda: string;
  nomeMotorista: string;
  cpfMotorista: string;
  transportador: string;
  marcaCaminhao: string;
  modelo: string;
  instrutor?: string;
}

type Atividades = Atividade[];

function HomePath() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://suzano-cepa.vercel.app/api/suzano"
        );
        if (!response.ok) throw new Error("Erro na resposta da API");
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // @ts-ignore

        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Erro: {error}</div>;
  if (!data.length) return <div>Carregando...</div>;

  return <Home data={data} />;
}

export default HomePath;
