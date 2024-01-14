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
import { Alert } from "react-native";

export default App = () => {
  const [anos, setAnos] = useState("");
  const [investInicial, setInvestInicial] = useState("");
  const [investRecorrente, setInvestRecorrente] = useState("");
  const [taxa, setTaxa] = useState("");

  const [prazo, setPrazo] = useState(0);
  const [vlrAplicado, setVlrAplicado] = useState(0);
  const [vlrRendimentos, setVlrRendimentos] = useState(0);
  const [vlrAcumulado, setVlrAcumulado] = useState(0);
  const [vlrRenda, setVlrRenda] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCalc = () => {
    if ((!anos, !investInicial, !investRecorrente, !taxa)) {
      Alert.alert("Erro! Todos os campos são obrigatórios.");
      return;
    }

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

  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  return (
    <MainView>
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
              maxLength={5}
            />
            <CalcButton onPress={handleCalc}>
              <CalcButtonText>Calcular</CalcButtonText>
            </CalcButton>
          </CalcArea>
          <ResultArea isFlipped={isFlipped}>
            <ResultTitle>Resultados</ResultTitle>
            <ResultLabelArea>
              <ResultLabel>Prazo:</ResultLabel>
              <ResultText>{prazo} meses</ResultText>
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
            <ResultLabelArea>
              <ResultLabel>Valor da Renda Passiva:</ResultLabel>
              <ResultText>
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
    </MainView>
  );
};
