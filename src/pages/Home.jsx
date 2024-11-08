import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import Link from "../components/ui/Link";
import Button from "../components/ui/Button/Button";
import Switch from "../components/ui/Switch";
import { MoonIcon, SunIcon } from "../components/ui/Icons";
const HomePage = () => {
  const navigate = useNavigate();
  const { setMode } = useTheme();

  const onModeSwitchChange = (index) => setMode(index == 0 ? "light" : "dark");

  return (
    <PageContainer>
      <aside>
        <h1>Game people play</h1>
        <div className="links">
          <Link>Author</Link>
          <Link>Game rules</Link>
        </div>
      </aside>
      <Button
        variant={"primary"}
        className="start-game"
        size="m"
        onClick={() => navigate("/game")}
      >
        Start game
      </Button>
      <Button
        variant={"default"}
        className="start-game"
        size="m"
        onClick={() => navigate("/game")}
      >
        Start game
      </Button>
      <Switch
        options={[<SunIcon />, <MoonIcon />]}
        onChange={onModeSwitchChange}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: ${({ theme }) => theme.space.s}px;
  padding: ${({ theme }) => theme.space.xl}px;
`;

export default HomePage;
