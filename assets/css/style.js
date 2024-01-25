import styled from "styled-components/native";

export const MainView = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: #333;
  margin-top: 25px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-top: 5px;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const LogoImage = styled.Image``;

export const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  /* perspective: 1000px; */
  background-color: #333;
`;

export const FlipCard = styled.View`
  /* position: relative; */
  width: 100%;
  /* transition: transform 0.8s;
  transform-style: preserve-3d; */
`;

export const CalcArea = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10%;
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  margin-top: 10px;
  /* ${(props) => (props.isFlipped ? "transform:rotateY(180deg)" : "")}; */
  ${(props) => (props.isFlipped ? "display:none;" : "display:flex;")}
`;

export const CalcLabel = styled.Text`
  width: 90%;
  margin-left: 5px;
  font-size: 12px;
  color: ${(props) =>
    props.isFocused || props.field ? "#fff" : "transparent"};
  z-index: 9;
`;

export const CalcInput = styled.TextInput`
  background-color: #fbfbfb;
  width: 90%;
  margin-bottom: 10px;
  color: #222;
  font-size: 14px;
  border-radius: 6px;
  padding-left: 10px;
  height: 48px;
`;

export const CalcButton = styled.Pressable`
  height: 48px;
  width: 90%;
  background-color: ${(props) => props.bg || "green"};
  border-radius: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

export const CalcButtonText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
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
  font-size: 14px;
  text-align: center;
  margin: 20px 0;
`;

export const ResultLabelArea = styled.View`
  flex-direction: row;
  height: 20px;
  width: 90%;
`;

export const ResultLabel = styled.Text`
  height: 20px;
  width: 50%;
  font-size: 12px;
  color: #fff;
`;

export const ResultText = styled.Text`
  height: 20px;
  width: 50%;
  font-size: 12px;
  color: #fff;
`;

export const ResultButton = styled.Pressable`
  height: 40px;
  width: 90%;
  background-color: ${(props) => props.bg || "green"};
  border-radius: 6px;
  color: white;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

export const ResultButtonText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
`;

export const Divider = styled.View`
  border: 0.3px solid #ddd;
  width: 90%;
  margin-bottom: 10px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: #333;
`;

export const FooterText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
