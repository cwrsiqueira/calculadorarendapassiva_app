import { useRef, useState } from "react";
import {
  Header,
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
  const [vlrTotalAplicado, setVlrTotalAplicado] = useState(0);
  const [vlrInicialAplicado, setVlrInicialAplicado] = useState(0);
  const [vlrRecorrenteAplicado, setVlrRecorrenteAplicado] = useState(0);
  const [vlrRecorrenteAplicadoTotal, setVlrRecorrenteAplicadoTotal] =
    useState(0);
  const [vlrRendimentos, setVlrRendimentos] = useState(0);
  const [vlrAcumulado, setVlrAcumulado] = useState(0);
  const [vlrRenda, setVlrRenda] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);
  const fifthInputRef = useRef(null);

  const handleCalc = () => {
    let investInicialClean;
    if (investInicial) investInicialClean = limparValor(investInicial);

    let investRecorrenteClean;
    if (investRecorrente) investRecorrenteClean = limparValor(investRecorrente);

    let taxaClean;
    if (taxa) taxaClean = limparValor(taxa);

    let rendaClean;
    if (renda) rendaClean = limparValor(renda);

    if (anos && investInicial && investRecorrente && taxa && renda) {
      Alert.alert("Erro! Deixe pelo menos 1 campo em branco para calculá-lo.");
      return;
    }

    // Calcular Prazo
    else if (!anos && investInicial && investRecorrente && taxa && renda) {
      let vlrAtual = investInicialClean;
      let montante = rendaClean / (taxaClean / 100);
      let loop = 0;
      let continuar = true;

      while (continuar) {
        if (
          vlrAtual * (1 + taxaClean / 100) + investRecorrenteClean <
          montante
        ) {
          vlrAtual = vlrAtual * (1 + taxaClean / 100) + investRecorrenteClean;
        } else {
          continuar = false;
        }
        loop++;
      }

      let newPrazo = loop - 1;
      let newAplicadoInicial = investInicialClean;
      let newAplicadoRecorrente = investRecorrenteClean;
      let newAplicadoRecorrenteTotal = newAplicadoRecorrente * newPrazo;
      let newAplicadoTotal = newAplicadoInicial + newAplicadoRecorrenteTotal;
      let newAcumulado = parseFloat(vlrAtual.toFixed(2));
      let newRendimentos =
        newAcumulado - newAplicadoRecorrente * newPrazo - newAplicadoInicial;
      let newRenda = parseFloat((newAcumulado * (taxaClean / 100)).toFixed(2));

      setPrazo(newPrazo);
      setVlrInicialAplicado(newAplicadoInicial);
      setVlrRecorrenteAplicado(newAplicadoRecorrente);
      setVlrRecorrenteAplicadoTotal(newAplicadoRecorrenteTotal);
      setVlrTotalAplicado(newAplicadoTotal);
      setVlrAcumulado(newAcumulado);
      setVlrRendimentos(newRendimentos);
      setVlrRenda(newRenda);

      setIsFlipped(!isFlipped);
      return;
    }

    // Calcular Investimento Inicial
    else if (anos && !investInicial && investRecorrente && taxa && renda) {
      let montante = rendaClean / (taxaClean / 100);
      let taxaAtualizada = Math.pow(1 + taxaClean / 100, anos * 12);
      let investRecorrenteAtualizado =
        investRecorrenteClean * ((taxaAtualizada - 1) / (taxaClean / 100));
      let investInicialAtualizado = montante - investRecorrenteAtualizado;
      let investInicial = investInicialAtualizado / taxaAtualizada;

      let newPrazo = anos * 12;
      let newAplicadoInicial = parseFloat(investInicial.toFixed(2));
      let newAplicadoRecorrente = investRecorrenteClean;
      let newAplicadoRecorrenteTotal = newAplicadoRecorrente * newPrazo;
      let newAplicadoTotal = newAplicadoInicial + newAplicadoRecorrenteTotal;
      let newAcumulado = parseFloat(montante.toFixed(2));
      let newRendimentos =
        newAcumulado - newAplicadoRecorrente * newPrazo - newAplicadoInicial;
      let newRenda = parseFloat((newAcumulado * (taxaClean / 100)).toFixed(2));

      setPrazo(newPrazo);
      setVlrInicialAplicado(newAplicadoInicial);
      setVlrRecorrenteAplicado(newAplicadoRecorrente);
      setVlrRecorrenteAplicadoTotal(newAplicadoRecorrenteTotal);
      setVlrTotalAplicado(newAplicadoTotal);
      setVlrAcumulado(newAcumulado);
      setVlrRendimentos(newRendimentos);
      setVlrRenda(newRenda);

      setIsFlipped(!isFlipped);
      return;
    }

    // Calcular Investimento Recorrente
    else if (anos && investInicial && !investRecorrente && taxa && renda) {
      let montante = rendaClean / (taxaClean / 100);
      let investInicialCalc =
        investInicialClean * Math.pow(1 + taxaClean / 100, anos * 12);
      let taxaCalc =
        (Math.pow(1 + taxaClean / 100, anos * 12) - 1) / (taxaClean / 100);

      let investRecorrente = (montante - investInicialCalc) / taxaCalc;

      let newPrazo = anos * 12;
      let newAplicadoInicial = investInicialClean;
      let newAplicadoRecorrente = parseFloat(investRecorrente.toFixed(2));
      let newAplicadoRecorrenteTotal = newAplicadoRecorrente * newPrazo;
      let newAplicadoTotal = newAplicadoInicial + newAplicadoRecorrenteTotal;
      let newAcumulado = parseFloat(montante.toFixed(2));
      let newRendimentos =
        newAcumulado - newAplicadoRecorrente * newPrazo - newAplicadoInicial;
      let newRenda = parseFloat((newAcumulado * (taxaClean / 100)).toFixed(2));

      setPrazo(newPrazo);
      setVlrInicialAplicado(newAplicadoInicial);
      setVlrRecorrenteAplicado(newAplicadoRecorrente);
      setVlrRecorrenteAplicadoTotal(newAplicadoRecorrenteTotal);
      setVlrTotalAplicado(newAplicadoTotal);
      setVlrAcumulado(newAcumulado);
      setVlrRendimentos(newRendimentos);
      setVlrRenda(newRenda);

      setIsFlipped(!isFlipped);
      return;
    }

    // Calcular Taxa
    else if (anos && investInicial && investRecorrente && !taxa && renda) {
      Alert.alert("Calcular Taxa. Em breve, aguarde...");
      return;
    }

    // Calcular Renda Passiva
    else if (anos && investInicial && investRecorrente && taxa && !renda) {
      const acumulado =
        investRecorrenteClean *
          ((Math.pow(1 + taxaClean / 100, anos * 12) - 1) / (taxaClean / 100)) +
        investInicialClean * Math.pow(1 + taxaClean / 100, anos * 12);

      let newPrazo = anos * 12;
      let newAplicadoInicial = investInicialClean;
      let newAplicadoRecorrente = investRecorrenteClean;
      let newAplicadoRecorrenteTotal = newAplicadoRecorrente * newPrazo;
      let newAplicadoTotal = newAplicadoInicial + newAplicadoRecorrenteTotal;
      let newAcumulado = parseFloat(acumulado.toFixed(2));
      let newRendimentos =
        newAcumulado - newAplicadoRecorrente * newPrazo - newAplicadoInicial;
      let newRenda = parseFloat((newAcumulado * (taxaClean / 100)).toFixed(2));

      setPrazo(newPrazo);
      setVlrInicialAplicado(newAplicadoInicial);
      setVlrRecorrenteAplicado(newAplicadoRecorrente);
      setVlrRecorrenteAplicadoTotal(newAplicadoRecorrenteTotal);
      setVlrTotalAplicado(newAplicadoTotal);
      setVlrAcumulado(newAcumulado);
      setVlrRendimentos(newRendimentos);
      setVlrRenda(newRenda);

      setIsFlipped(!isFlipped);
      return;
    } else {
      Alert.alert("Erro! Deixe apenas 1 campo em branco para calculá-lo.");
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

  const limparValor = (valor) => {
    return parseFloat(valor.replace(/['.']/g, "").replace(",", "."));
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
            {renda && taxa && (
              <CalcLabel>
                Valor Acumulado Desejado:{" "}
                {(
                  limparValor(renda) /
                  (limparValor(taxa) / 100)
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </CalcLabel>
            )}
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
              <ResultLabel>Valor Investido:</ResultLabel>
              <ResultText>
                ${" "}
                {vlrTotalAplicado.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </ResultText>
            </ResultLabelArea>
            <ResultLabelArea>
              <ResultLabel>Valor Inicial:</ResultLabel>
              <ResultText>
                ${" "}
                {vlrInicialAplicado.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </ResultText>
            </ResultLabelArea>
            <ResultLabelArea style={{ height: 40 }}>
              <ResultLabel style={{ height: 40 }}>
                Valor Recorrente:
              </ResultLabel>
              <ResultText style={{ height: 40 }}>
                ${" "}
                {vlrRecorrenteAplicado.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                x {prazo} ={" "}
                {vlrRecorrenteAplicadoTotal.toLocaleString(undefined, {
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
