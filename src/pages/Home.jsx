import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Link from "../components/ui/Link";
import Button from "../components/ui/Button";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <aside>
        <h1>Гра в яку грають люди</h1>
        <div className="links">
          <Link>Author</Link>
          <Link>Game rules</Link>
          {/* <Switch>
            <SwitchOption></SwitchOption>
          </Switch> */}
        </div>
      </aside>
      <Button
        variant={"default"}
        className="start-game"
        onClick={() => navigate("/game")}
      >
        Start game
      </Button>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => theme.space.xl}px;

  .start-game {
    align-self: flex-start;
  }
`;

export default HomePage;
