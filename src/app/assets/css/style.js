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
  align-items: center;
  width: 100%;
  backface-visibility: hidden;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${(props) => (props.isFlipped ? "transform: rotateY(-180deg)" : "")};
`;

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
