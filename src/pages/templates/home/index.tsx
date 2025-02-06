import * as S from "../../../styles/HomeStyles";

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

interface HomeProps {
  data: Atividade[];
}

const Home: React.FC<HomeProps> = ({ data }) => {
  console.log(data);

  if (!Array.isArray(data)) {
    return <p>Erro: Dados inválidos.</p>;
  }

  return (
    <S.Holder>
      {data.length > 0 ? (
        data.map((atividade, index) => (
          <div key={index}>
            <h2>Atividade {index + 1}</h2>
            <p>
              <strong>Data da Atividade:</strong> {atividade.dataDaActividade}
            </p>
            <p>
              <strong>Hora Início:</strong> {atividade.horaInicio}
            </p>
            <p>
              <strong>Hora Fim:</strong> {atividade.horaFim}
            </p>
            <p>
              <strong>Km Percorrido:</strong> {atividade.kmPercorrido}
            </p>
            <p>
              <strong>Lts de Combustível:</strong> {atividade.ltsCombustivel}
            </p>
            <p>
              <strong>Toneladas de Carga:</strong> {atividade.toneladasCarga}
            </p>
            <p>
              <strong>Nome da Fazenda:</strong> {atividade.nomeFazenda}
            </p>
            <p>
              <strong>Nome do Motorista:</strong> {atividade.nomeMotorista}
            </p>
            <p>
              <strong>CPF do Motorista:</strong> {atividade.cpfMotorista}
            </p>
            <p>
              <strong>Transportador:</strong> {atividade.transportador}
            </p>
            <p>
              <strong>Marca do Caminhão:</strong> {atividade.marcaCaminhao}
            </p>
            <p>
              <strong>Modelo:</strong> {atividade.modelo}
            </p>
            {atividade.instrutor && (
              <p>
                <strong>Instrutor:</strong> {atividade.instrutor}
              </p>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>Nenhuma atividade encontrada.</p>
      )}
    </S.Holder>
  );
};
export default Home;
