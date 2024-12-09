import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Button } from "../../components/ui";
import {
  ArrowLeftTailIcon,
  PauseFilledIcon,
  PlayFilledIcon,
  SkipBackFilledIcon,
  SkipForwardFilledIcon,
  TrackNextFilledIcon,
  TrackPrevFilledIcon,
} from "../../components/Icons";
import { useLocale } from "../../utils/localization/localization";
import content from "./GamePage.content";
import { useEffect, useState } from "react";
import Person from "../../game/person";
import Scoreboard from "../../components/parts/Scoreboard/Scoreboard";

// Component

const GamePage = () => {
  const navigate = useNavigate();
  const { t } = useLocale();

  const [playing, setPlaying] = useState(false);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const initialPersons = [];
    for (let i = 0; i < 30; i++) {
      const newPerson = new Person();
      initialPersons.push(newPerson);
    }
    setPersons(initialPersons);
  }, []);

  const handlePlayClick = () => {
    setPlaying(!playing);
  };

  return (
    <PageContainer>
      <div className="margin left-top">
        <Button onClick={() => navigate("/")}>
          <ArrowLeftTailIcon />
        </Button>
      </div>
      <main className="simulation-container">
        <canvas id="simulation-canvas"></canvas>
        <div className="margin bottom">
          <div className="player-controls">
            <Button variant="bare" round>
              <TrackPrevFilledIcon />
            </Button>
            <Button variant="bare" round>
              <SkipBackFilledIcon />
            </Button>
            <Button variant="primary" round onClick={handlePlayClick}>
              {playing ? <PauseFilledIcon /> : <PlayFilledIcon />}
            </Button>
            <Button variant="bare" round>
              <SkipForwardFilledIcon />
            </Button>
            <Button variant="bare" round>
              <TrackNextFilledIcon />
            </Button>
          </div>
        </div>
      </main>
      <aside>
        <h4>{t(content.scoreboard)}</h4>
        <Scoreboard persons={persons} />
        <div className="actions">
          <Button>{t(content.settings)}</Button>
          <Button variant="primary">{t(content.finalize)}</Button>
        </div>
      </aside>
    </PageContainer>
  );
};

// Style

const pageCss = ({ theme }) => css`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${theme.mixin.flex("row", null, null, theme.space.xl, theme.space.xl)}

  .margin.left-top {
    position: absolute;
    left: 0;
    top: 0;
    width: ${theme.space.xl}px;
    height: ${theme.space.xl}px;

    ${theme.mixin.flex(null, "center", "center")}
  }

  .margin.bottom {
    position: absolute;
    width: 100%;
    height: ${theme.space.xl}px;
    bottom: -${theme.space.xl}px;
    ${theme.mixin.flex(null, "center", "center")}
  }

  main {
    flex: 3 0 0;
    position: relative;
  }

  #simulation-canvas {
    width: 100%;
    height: 100%;
    background: ${theme.color.main.primary};
    border-radius: ${theme.size(0.6)}px;
  }

  .player-controls {
    ${theme.mixin.flex("row", "center", null, theme.size(), [
      theme.size(0.2),
      theme.size(0.8),
    ])}

    ${theme.mixin.before}
    &::before {
      border-radius: 666px;
      border: 1px solid ${theme.color.main.border};
    }
  }

  aside {
    flex: 1 0 0;
    min-width: 0;

    ${theme.mixin.flex("col", null, null, theme.space.l)}
  }

  .scoreboard {
    flex: 1 0 0;
  }

  .actions {
    ${theme.mixin.flex("row", "center", null, theme.space.s)}
  }
`;

const PageContainer = styled.div`
  ${pageCss}
`;

//

export default GamePage;
