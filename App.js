import { Alert, ScrollView } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";

export const LogoArea = styled.SafeAreaView`
  align-items: center;
  background-color: #f1f1f1;
  margin-top: 20px;
`;
export const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export const FlipCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  perspective: 1000px;
`;

export const FlipCardInner = styled.View`
  position: relative;
  width: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

export const Result = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0cf;
  backface-visibility: hidden;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${(props) => (props.isFlipped ? "" : "transform: rotateY(180deg)")};
`;

export const ResultText = styled.Text`
  margin-bottom: 12px;
  text-align: center;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.textColor || "#222"};
`;

export const CalculadoraArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  padding-left: 10%;
  width: 100%;
  backface-visibility: hidden;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${(props) => (props.isFlipped ? "transform: rotateY(-180deg)" : "")};
`;

export const CalculadoraLabel = styled.Text``;

export const CalculadoraInput = styled.TextInput`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 90%;
  margin-bottom: 12px;
`;

export const CalculadoraButton = styled.Pressable`
  background-color: ${(props) => props.bg};
  padding: 12px 6px;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 6px;
  width: 90%;
`;

export const CalculadoraButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.textColor};
`;

export const AdsArea = styled.SafeAreaView`
  align-items: center;
  background-color: #f1f1f1;
  height: 100px;
`;

export default function App() {
  const [anos, setAnos] = useState('');
  const [investInicial, setInvestInicial] = useState('');
  const [investRecorrente, setInvestRecorrente] = useState('');
  const [taxaLiquida, setTaxaLiquida] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const [prazo, setPrazo] = useState(0);
  const [vlrAplicado, setVlrAplicado] = useState(0);
  const [vlrAcumulado, setVlrAcumulado] = useState(0);
  const [vlrRendimentos, setVlrRendimentos] = useState(0);
  const [vlrRenda, setVlrRenda] = useState(0);

  const handleCalc = () => {

    if (!anos, !investInicial, !investRecorrente, !taxaLiquida) {
      Alert.alert('Erro! Todos os campos são obrigatórios.');
      return;
    }

    let investInicialClean = investInicial.replace(/['.']/g, '').replace(',', '.');
    let investRecorrenteClean = investRecorrente.replace(/['.']/g, '').replace(',', '.');
    let taxaLiquidaClean = taxaLiquida.replace(/['.']/g, '').replace(',', '.');

    console.log(investInicialClean);
    console.log(investRecorrenteClean);
    console.log(taxaLiquidaClean);
    console.log(anos);

    const acumulado =
      investRecorrenteClean *
      ((Math.pow(1 + taxaLiquidaClean / 100, anos * 12) - 1) / (taxaLiquidaClean / 100)) + investInicialClean * Math.pow(1 + taxaLiquidaClean / 100, anos * 12);

    setPrazo(anos * 12);
    setVlrAplicado(parseFloat(investInicialClean) + (investRecorrenteClean * (anos * 12)));
    setVlrAcumulado(acumulado);
    setVlrRendimentos(acumulado - (investRecorrenteClean * (anos * 12)) - investInicialClean);
    setVlrRenda(acumulado * (taxaLiquidaClean / 100));

    setIsFlipped(!isFlipped);
  };

  const formatarValor = (valor) => {
    // Remover caracteres não numéricos e zeros à esquerda
    valor = valor.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');

    // Se o valor estiver vazio após a remoção, retorna string vazia
    if (valor == 0) return '';

    // Adiciona zeros à esquerda se necessário para garantir pelo menos 3 dígitos
    valor = valor.padStart(3, '0');

    // Separa parte inteira e decimal
    let parteInteira = valor.slice(0, -2);
    let parteDecimal = valor.slice(-2);

    // Adiciona pontos como separadores de milhar na parte inteira
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combina parte inteira e decimal com uma vírgula
    return `${parteInteira},${parteDecimal}`;
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LogoArea>
        <LogoImage source={require("./assets/logo.png")} />
      </LogoArea>
      <FlipCard>
        <FlipCardInner>
          <CalculadoraArea isFlipped={isFlipped}>
            <CalculadoraLabel>Prazo (anos): {anos}</CalculadoraLabel>
            <CalculadoraInput
              inputMode={'numeric'}
              onChange={(e) => setAnos(e.target.value)}
              placeholder="Ex. 25"
              maxLength={2}
              value={anos}
            />
            <CalculadoraLabel>Investimento Inicial ($):{investInicial}</CalculadoraLabel>
            <CalculadoraInput
              inputMode={'numeric'}
              onChange={(e) => setInvestInicial(formatarValor(e.target.value))}
              placeholder="Ex. 50.000,00"
              maxLength={14}
              value={investInicial}
            />
            <CalculadoraLabel>Investimento Recorrente ($):{investRecorrente}</CalculadoraLabel>
            <CalculadoraInput
              inputMode={'numeric'}
              onChange={(e) => setInvestRecorrente(formatarValor(e.target.value))}
              placeholder="Ex. 5.000,00"
              maxLength={14}
              value={investRecorrente}
            />
            <CalculadoraLabel>Taxa Líquida (%): {taxaLiquida}</CalculadoraLabel>
            <CalculadoraInput
              inputMode={'numeric'}
              onChange={(e) => setTaxaLiquida(formatarValor(e.target.value))}
              placeholder="Ex. 1,25"
              maxLength={5}
              value={taxaLiquida}
            />
            <CalculadoraButton
              onPress={handleCalc}
              bg={"#198754"}
              borderColor={"#198754"}
            >
              <CalculadoraButtonText textColor={"#fff"}>
                Calcular
              </CalculadoraButtonText>
            </CalculadoraButton>
          </CalculadoraArea>
          <Result isFlipped={isFlipped}>
            <ResultText>Resultado</ResultText>
            <ResultText>{prazo} meses</ResultText>
            <ResultText>
              Valor aplicado: ${" "}
              {vlrAplicado.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ResultText>
            <ResultText>
              Valor rendimentos: ${" "}
              {vlrRendimentos.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ResultText>
            <ResultText>
              Valor acumulado: ${" "}
              {vlrAcumulado.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ResultText>
            <ResultText>
              Valor renda passiva: ${" "}
              {vlrRenda.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </ResultText>
            <CalculadoraButton borderColor={"#0cf"} onPress={handleCalc}>
              <CalculadoraButtonText textColor={"#0cf"}>
                Refazer Cálculo
              </CalculadoraButtonText>
            </CalculadoraButton>
          </Result>
        </FlipCardInner>
      </FlipCard>

      <AdsArea />
    </ScrollView>
  );
}
