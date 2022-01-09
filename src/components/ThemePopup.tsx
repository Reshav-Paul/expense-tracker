import { useDispatch } from 'react-redux';
import { ifTheme } from '../app/constants/Themes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

import { themeType } from '../app/constants/Types';
import { changeTheme } from '../app/reducers/profileReducer';

let ThemePopup: React.FC<{ themes: ifTheme }> = function ThemePopup(props) {
  const dispatch = useDispatch();
  let handleThemeChange = function (key: string) {
    dispatch(changeTheme(key));
  }

  let themes: themeType[] = [];
  for (let t in props.themes) {
    themes.push(props.themes[t]);
  }
  return <div id="theme-btn" className="has-dropdown text-right">
    <button className="bg-pr">
      <FontAwesomeIcon icon={faPalette} className="icon lg"></FontAwesomeIcon>
    </button>
    <div className="dropdown d-flex flex-col ai-stretch dp01">
      {
        themes.map(t => <button key={t.key} className="d-block"
          style={{ color: t.secColor, textAlign: 'left', backgroundColor: 'hsla(0, 100%, 100%, 0.05)' }}
          onClick={e => handleThemeChange(t.key)}>
          {t.label}
        </button>)
      }
    </div>
  </div>;
}

export default ThemePopup;