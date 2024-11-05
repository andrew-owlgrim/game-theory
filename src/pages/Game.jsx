import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header>
        <h1>This is game page</h1>
        <button onClick={() => navigate("/")}>Go home</button>
      </Header>
      <Section>
        <Card />
        <Card />
        <Card />
      </Section>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
`;

const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
  gap: ${({ theme }) => theme.grid.gap}px;
  padding: ${({ theme }) => theme.grid.margin}px;

  & > * {
    width: ${({ theme }) => theme.grid.cols(4)}px;
  }
`;

const Card = styled.div.attrs({
  className: "card",
})`
  min-height: 200px;
  background: ${({ theme }) => theme.color.green};
`;

export default GamePage;
