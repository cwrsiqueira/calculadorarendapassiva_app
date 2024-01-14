import { useRef, useState } from "react";
import {
  Header,
  MainView,
  Footer,
  Body,
  LogoImage,
  FlipCard,
  CalcArea,
  CalcLabel,
  CalcInput,
  CalcButton,
  CalcButtonText,
  ResultArea,
  ResultTitle,
  ResultLabel,
  ResultText,
  ResultLabelArea,
  ResultButton,
  ResultButtonText,
  Divider,
} from "./assets/css/style";
import { Alert, ScrollView } from "react-native";

export default App = () => {
  const [anos, setAnos] = useState("");
  const [investInicial, setInvestInicial] = useState("");
  const [investRecorrente, setInvestRecorrente] = useState("");
  const [taxa, setTaxa] = useState("");
  const [renda, setRenda] = useState("");

  const [prazo, setPrazo] = useState(0);
  const [vlrAplicado, setVlrAplicado] = useState(0);
  const [vlrRendimentos, setVlrRendimentos] = useState(0);
  const [vlrAcumulado, setVlrAcumulado] = useState(0);
  const [vlrRenda, setVlrRenda] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
  const fifthInputRef = useRef(null);

  const handleCalc = () => {
    if (!anos && !investInicial && !investRecorrente && !taxa && !renda) {
      Alert.alert("Erro! Deixe apenas 1 campo em branco para calculá-lo.");
      return;
    }

    if (anos && investInicial && investRecorrente && taxa && renda) {
      Alert.alert("Erro! Deixe pelo menos 1 campo em branco para calculá-lo.");
      return;
    }

    if (!anos) {
      let rendaClean = renda.replace(/['.']/g, "").replace(",", ".");
      let taxaClean = taxa.replace(/[['.']/g, "").replace(",", ".");
      let investInicialClean = investInicial
        .replace(/['.']/g, "")
        .replace(",", ".");
      let investRecorrenteClean = investRecorrente
        .replace(/['.']/g, "")
        .replace(",", ".");

      let vlrAtual = investInicialClean;
      let montante = rendaClean / (taxaClean / 100);
      let loop = 0;
      let continuar = true;

      while (continuar) {
        if (
          vlrAtual * (1 + taxaClean / 100) + parseFloat(investRecorrenteClean) <
          montante
        ) {
          vlrAtual =
            vlrAtual * (1 + taxaClean / 100) +
            parseFloat(investRecorrenteClean);
        } else {
          continuar = false;
        }
        loop++;
      }

      setPrazo(loop - 1);
      setVlrAplicado(
        parseFloat(investInicialClean) + investRecorrenteClean * (loop - 1)
      );
      setVlrAcumulado(vlrAtual);
      setVlrRendimentos(
        vlrAtual - investRecorrenteClean * (loop - 1) - investInicialClean
      );
      setVlrRenda(vlrAtual * (taxaClean / 100));

      setIsFlipped(!isFlipped);
      return;
    }

    if (!investInicial) {
      Alert.alert("Calcular Investimento Inicial. Em breve, aguarde...");
      return;
    }

    if (!investRecorrente) {
      Alert.alert("Calcular Investimento Recorrente. Em breve, aguarde...");
      return;
    }

    if (!taxa) {
      Alert.alert("Calcular Taxa. Em breve, aguarde...");
      return;
    }

    if (!renda) {
      let investInicialClean;
      if (investInicial)
        investInicialClean = investInicial
          .replace(/['.']/g, "")
          .replace(",", ".");

      let investRecorrenteClean;
      if (investRecorrente)
        investRecorrenteClean = investRecorrente
          .replace(/['.']/g, "")
          .replace(",", ".");

      let taxaClean;
      if (taxa) taxaClean = taxa.replace(/['.']/g, "").replace(",", ".");

      const acumulado =
        investRecorrenteClean *
          ((Math.pow(1 + taxaClean / 100, anos * 12) - 1) / (taxaClean / 100)) +
        investInicialClean * Math.pow(1 + taxaClean / 100, anos * 12);

      setPrazo(anos * 12);
      setVlrAplicado(
        parseFloat(investInicialClean) + investRecorrenteClean * (anos * 12)
      );
      setVlrAcumulado(acumulado);
      setVlrRendimentos(
        acumulado - investRecorrenteClean * (anos * 12) - investInicialClean
      );
      setVlrRenda(acumulado * (taxaClean / 100));

      setIsFlipped(!isFlipped);
      return;
    }
  };

  const formatarValor = (valor) => {
    // Remover caracteres não numéricos e zeros à esquerda
    valor = valor.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");

    // Se o valor estiver vazio após a remoção, retorna string vazia
    if (valor == 0) return "";

    // Adiciona zeros à esquerda se necessário para garantir pelo menos 3 dígitos
    valor = valor.padStart(3, "0");

    // Separa parte inteira e decimal
    let parteInteira = valor.slice(0, -2);
    let parteDecimal = valor.slice(-2);

    // Adiciona pontos como separadores de milhar na parte inteira
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Combina parte inteira e decimal com uma vírgula
    return `${parteInteira},${parteDecimal}`;
  };

  const handleClean = () => {
    setAnos("");
    setInvestInicial("");
    setInvestRecorrente("");
    setTaxa("");
    setRenda("");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header>
        <LogoImage source={require("./assets/logo.png")} />
      </Header>
      <Body>
        <FlipCard>
          <CalcArea isFlipped={isFlipped}>
            <CalcLabel>Prazo (anos): </CalcLabel>
            <CalcInput
              placeholder="Ex.: 25"
              onChangeText={(val) => setAnos(val)}
              value={anos}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => secondInputRef.current.focus()}
              blurOnSubmit={false}
              maxLength={2}
            />
            <CalcLabel>Investimento Inicial ($): </CalcLabel>
            <CalcInput
              ref={secondInputRef}
              placeholder="Ex.: 50.000,00"
              onChangeText={(val) => setInvestInicial(formatarValor(val))}
              value={investInicial}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => thirdInputRef.current.focus()}
              blurOnSubmit={false}
              maxLength={14}
            />
            <CalcLabel>Investimento Recorrente ($): </CalcLabel>
            <CalcInput
              ref={thirdInputRef}
              placeholder="Ex.: 2.500,00"
              onChangeText={(val) => setInvestRecorrente(formatarValor(val))}
              value={investRecorrente}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => fourthInputRef.current.focus()}
              blurOnSubmit={false}
              maxLength={14}
            />
            <CalcLabel>Taxa Líquida Mensal (%): </CalcLabel>
            <CalcInput
              ref={fourthInputRef}
              placeholder="Ex.: 1,00"
              onChangeText={(val) => setTaxa(formatarValor(val))}
              value={taxa}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => fifthInputRef.current.focus()}
              blurOnSubmit={false}
              maxLength={5}
            />
            <CalcLabel>Valor da Renda Passiva Desejada ($): </CalcLabel>
            <CalcInput
              ref={fifthInputRef}
              placeholder="Ex.: 50.000,00"
              onChangeText={(val) => setRenda(formatarValor(val))}
              value={renda}
              keyboardType="numeric"
              maxLength={14}
            />
            <CalcButton onPress={handleCalc}>
              <CalcButtonText>Calcular</CalcButtonText>
            </CalcButton>
            <CalcButton onPress={handleClean} bg={"red"}>
              <CalcButtonText>Limpar</CalcButtonText>
            </CalcButton>
          </CalcArea>

          <ResultArea isFlipped={isFlipped}>
            <ResultTitle>Resultados</ResultTitle>
            <ResultLabelArea style={{ height: 60 }}>
              <ResultLabel style={{ height: 60 }}>Prazo:</ResultLabel>
              <ResultText style={{ height: 60 }}>
                {Math.floor(prazo / 12) > 0 && Math.floor(prazo / 12) + " ano"}
                {Math.floor(prazo / 12) > 0
                  ? Math.floor(prazo / 12) == 1
                    ? ""
                    : "s"
                  : ""}
                {Math.floor(prazo / 12) > 0 &&
                prazo - Math.floor(prazo / 12) * 12 > 0
                  ? " e "
                  : ""}
                {prazo - Math.floor(prazo / 12) * 12 > 0
                  ? prazo - Math.floor(prazo / 12) * 12 == 1
                    ? prazo - Math.floor(prazo / 12) * 12 + " mês"
                    : prazo - Math.floor(prazo / 12) * 12 + " meses"
                  : ""}
                {Math.floor(prazo / 12) > 0
                  ? prazo == 1
                    ? "\nou " + prazo + " mês"
                    : "\nou " + prazo + " meses"
                  : ""}
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultLabelArea>
              <ResultLabel>Valor Aplicado:</ResultLabel>
              <ResultText>
                ${" "}
                {vlrAplicado.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultLabelArea>
              <ResultLabel>Rendimentos:</ResultLabel>
              <ResultText>
                ${" "}
                {vlrRendimentos.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultLabelArea>
              <ResultLabel>Valor Acumulado:</ResultLabel>
              <ResultText>
                ${" "}
                {vlrAcumulado.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultLabelArea>
              <ResultLabel>Taxa Mensal:</ResultLabel>
              <ResultText>
                {taxa.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) || "0.00"}
                %
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultLabelArea style={{ height: 50 }}>
              <ResultLabel style={{ height: 50 }}>
                Valor da Renda Passiva:
              </ResultLabel>
              <ResultText style={{ height: 50 }}>
                ${" "}
                {vlrRenda.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                por mês
              </ResultText>
            </ResultLabelArea>
            <Divider />
            <ResultButton onPress={() => setIsFlipped(false)}>
              <ResultButtonText>Refazer Cálculo</ResultButtonText>
            </ResultButton>
          </ResultArea>
        </FlipCard>
      </Body>
      <Footer></Footer>
    </ScrollView>
  );
};
