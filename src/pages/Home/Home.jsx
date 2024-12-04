import { useNavigate } from "react-router-dom";
import styled, { css, useTheme } from "styled-components";
import { Link, Button, Switch, Select } from "../../components/ui";
import { MoonIcon, SunIcon } from "../../components/Icons";
import { useLocale } from "../../utils/localization/localization";
import content from "./Home.content";
const Illustration = content.illustration;

// Component

const HomePage = () => {
  const navigate = useNavigate();

  const { mode, setMode } = useTheme();
  const handleModeSwitch = (value) => setMode(value);

  const { t, locale, setLocale } = useLocale();
  const handleLocaleChange = (locale) => {
    setLocale(locale);
  };

  return (
    <PageContainer>
      <aside>
        <h2 dangerouslySetInnerHTML={{ __html: content.title }}></h2>
        <menu>
          <div className="links">
            {content.links.map((link, index) => (
              <Link key={index} href={link.href} target="_blank">
                {t(link)}
              </Link>
            ))}
          </div>
          <div className="controls">
            <Switch value={mode} onChange={handleModeSwitch}>
              <Switch.Option value="light">
                <SunIcon />
              </Switch.Option>
              <Switch.Option value="dark">
                <MoonIcon />
              </Switch.Option>
            </Switch>

            <Select
              value={locale}
              placeholder="Choose language"
              onChange={handleLocaleChange}
              round
              size="l"
            >
              <Select.Option value="en">En</Select.Option>
              <Select.Option value="ua">Ua</Select.Option>
              <Select.Option value="ru">Ru</Select.Option>
            </Select>
          </div>
        </menu>
      </aside>

      <div className="main-wrapper">
        <main>
          <Illustration className="illustration" />

          <div className="usp">
            <div className="text-block">
              <h4>
                {t(content.lead)}
                <Link inline href={t(content.leadLink.href)} target="_blank">
                  {t(content.leadLink.text)}
                </Link>
              </h4>
              <p>{t(content.description)}</p>
            </div>

            <div className="action-block">
              <Button
                variant={"primary"}
                className="start-game"
                size="l"
                onClick={() => navigate("/game")}
              >
                {t(content.buttonStart)}
              </Button>
              <Button
                variant={"default"}
                className="start-game"
                size="l"
                onClick={() => navigate("/game")}
              >
                {t(content.buttonTutorial)}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </PageContainer>
  );
};

// Style

const pageCss = ({ theme }) => css`
  width: 100%;
  height: 100%;

  ${theme.mixin.flex("row", null, null, theme.space.s, theme.space.xl)}

  .select {
    width: 88px;
  }

  aside {
    ${theme.mixin.flex("col", null, "space-between")}
  }

  menu,
  .usp {
    ${theme.mixin.flex("col", null, null, theme.space.ml)}
  }

  .links {
    ${theme.mixin.flex("col", "start", null, theme.space.sm)}
  }

  .controls {
    ${theme.mixin.flex("row", "center", null, theme.space.s)}
  }

  .main-wrapper {
    flex: 1 0 0;
    ${theme.mixin.flex("col", "center", "stretch")}
  }

  main {
    flex: 1 0 0;
    max-width: 480px;
    margin-right: ${-theme.space.xl}px;
    ${theme.mixin.flex("col", null, null, theme.space.l)}
  }

  .illustration {
    flex: 1 0 0;
    width: initial;
    max-width: 100%;
    height: initial;
    align-self: flex-start;
    aspect-ratio: 1.272;
  }

  .text-block {
    ${theme.mixin.flex("col", null, null, theme.space.s)}

    h4 {
      ${theme.textSize.custom(1.6)}
    }

    p {
      ${theme.textSize.custom(1.2)}
    }
  }

  .action-block {
    ${theme.mixin.flex("row", null, null, theme.space.s)}
  }
`;

const PageContainer = styled.div`
  ${pageCss}
`;

export default HomePage;
