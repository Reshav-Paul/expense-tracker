import { useDispatch } from 'react-redux';
import { change } from '../app/reducers/themeReducer';
import THEMES, { ifTheme } from '../app/constants/Themes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

import { themeType } from '../app/constants/Types';

let ThemePopup: React.FC<{ themes: ifTheme }> = function ThemePopup(props) {
    const dispatch = useDispatch();
    let handleThemeChange = function (key: string) {
      let newTheme = THEMES[key];
      dispatch(change(newTheme));
    }
  
    let themes: themeType[] = [];
    for (let t in props.themes) {
      themes.push(props.themes[t]);
    }
    return <div id="theme-btn" className="has-dropdown col-2 text-right">
      <button className="icon-btn">
        <FontAwesomeIcon icon={faPalette} className="icon lg"></FontAwesomeIcon>
      </button>
      <ul className="dropdown">
        {
          themes.map(t => <li key={t.key}>
            <button style={{ color: t.secColor }}
              className="icon-btn"
              onClick={e => handleThemeChange(t.key)}>{t.label}</button>
          </li>)
        }
      </ul>
    </div>;
  }

  export default ThemePopup;