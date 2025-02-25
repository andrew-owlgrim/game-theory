import styled, { css } from "styled-components";
import Person from "./Scoreboard.Person";

function Scoreboard({ persons, ...props }) {
  return (
    <ScoreboardContainer {...props}>
      {persons.map((person, index) => (
        <Person person={person} key={person.id} place={index + 1} />
      ))}
    </ScoreboardContainer>
  );
}

const scoreboardCss = ({ theme }) => css`
  min-height: 0;
  overflow-y: auto;
  ${theme.mixin.flex("col", null, null, theme.size(0.2))}
  ${theme.mixin.scrollbar({
    track: theme.color.main.border,
    handle: theme.color.main.active,
    width: 8,
    padding: 3,
    round: true,
    margin: theme.size(0.4),
  })}
`;

const ScoreboardContainer = styled.ul.attrs({
  className: "scoreboard",
})`
  ${scoreboardCss}
`;

export default Scoreboard;
