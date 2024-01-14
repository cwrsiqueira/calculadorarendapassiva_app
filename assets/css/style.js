import styled from "styled-components/native";

export const MainView = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  perspective: 1000px;
`;

export const FlipCard = styled.View`
  position: relative;
  width: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

export const CalcArea = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10%;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  ${(props) => (props.isFlipped ? "transform:rotateY(180deg)" : "")};
  ${(props) => (props.isFlipped ? "display:none" : "display:flex")};
`;

export const CalcLabel = styled.Text`
  width: 90%;
  height: 20px;
  margin-left: 5px;
`;

export const CalcInput = styled.TextInput`
  background-color: #f5f5f5;
  width: 90%;
  margin-bottom: 15px;
  color: #222;
  font-size: 18px;
  border-radius: 6px;
  padding-left: 10px;
  height: 40px;
`;

export const CalcButton = styled.Pressable`
  height: 40px;
  width: 90%;
  background-color: #0cf;
  border-radius: 6px;
  color: white;
  justify-content: center;
  align-items: center;
`;

export const CalcButtonText = styled.Text`
  text-align: center;
  color: white;
`;

export const ResultArea = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10%;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  ${(props) => (props.isFlipped ? "" : "transform:rotateY(180deg)")};
  ${(props) => (props.isFlipped ? "display:flex" : "display:none")};
`;

export const ResultTitle = styled.Text`
  width: 90%;
  height: 30px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ResultLabelArea = styled.View`
  flex-direction: row;
  height: 30px;
  width: 90%;
`;

export const ResultLabel = styled.Text`
  height: 30px;
  width: 50%;
`;

export const ResultText = styled.Text`
  height: 30px;
  width: 50%;
`;

export const ResultButton = styled.Pressable`
  height: 40px;
  width: 90%;
  background-color: #0cf;
  border-radius: 6px;
  color: white;
  justify-content: center;
  align-items: center;
`;

export const ResultButtonText = styled.Text`
  text-align: center;
  color: white;
`;

export const Divider = styled.View`
  border: 1px solid #ddd;
  width: 90%;
  margin-bottom: 10px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
`;
