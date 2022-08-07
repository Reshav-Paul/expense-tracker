import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { lightColorScheme } from '../utilities/themeUtil';

export type IconButtonPropType = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  icon: IconDefinition,
  btnText: string,
  iconPosition: 'left' | 'right',
  elevated?: boolean,
  backgroundColor?: string,
  iconColor?: string,
  textColor?: string,
}

let IconButton: React.FC<IconButtonPropType> = function IconButton(props) {
  let { backgroundColor, iconColor, textColor } = { ...props };
  if (!backgroundColor) backgroundColor = lightColorScheme.ui.background;
  if (!iconColor) iconColor = lightColorScheme.ui.primary;
  if (!textColor) textColor = lightColorScheme.ui.primary;

  return <div style={{ position: 'relative', backgroundColor: backgroundColor }} onClick={props.onClick}
    className={`icon btn ${props.elevated ? 'dp01' : ''} ${props.btnText.length > 0 ? '' : 'text-center p-0'}`}>

    {props.iconPosition === 'left' ? <FontAwesomeIcon icon={props.icon} style={{ color: iconColor }}
      className={`btn-icon ${props.btnText.length > 0 ? 'mr-2' : ''}`} /> : null}

    <div className="btn-text" style={{ color: textColor }}>{props.btnText}</div>

    {props.iconPosition === 'right' ? <FontAwesomeIcon icon={props.icon} style={{ color: iconColor }}
      className={`btn-icon ${props.btnText.length > 0 ? 'mr-2' : ''}`} /> : null}
  </div>;
}

export default IconButton;