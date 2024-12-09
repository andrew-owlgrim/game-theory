import styled, { css } from "styled-components";

function Person({ person, place }) {
  return (
    <PersonStatsContainer $place={place} $color={person.strategy.color}>
      {place && <p className="place">#{place}</p>}
      <p className="noto-emoji emoji">{person.strategy.emoji}</p>
      <p className="name">{person.name}</p>
      <p className="score">{person.score}</p>
    </PersonStatsContainer>
  );
}

const personStatsCss = ({ theme, $place, $color }) => {
  const placeWidth = 0.8 + $place.toString().length * 0.4;

  return css`
    ${theme.mixin.flex("row", "center", null, theme.size(0.4), [
      theme.size(0.4),
    ])}
    border-radius: ${theme.size(0.2)}px;

    user-select: none;
    cursor: pointer;

    &:hover {
      background: ${theme.color.main.bg};
    }

    .place {
      flex-shrink: 0;
      min-width: ${theme.size(placeWidth)}px;
      white-space: nowrap;
    }

    .emoji {
      width: ${theme.size()}px;
      text-align: center;
      font-weight: 700;
      color: ${theme.color[$color]
        ? theme.color[$color].main
        : theme.color.main.main};
    }

    .name {
      flex: 1 0 0;
      min-width: 0;
      ${theme.mixin.truncate()}
    }

    .score {
      font-weight: 500;
      color: ${theme.color.main.secondary};
    }
  `;
};

const PersonStatsContainer = styled.li`
  ${personStatsCss}
`;

export default Person;
