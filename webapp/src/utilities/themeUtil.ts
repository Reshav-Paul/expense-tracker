export type messageThemeType = {
  errBg: string,
  errFont: string,
  warnBg: string,
  warnFont: string,
  sucBg: string,
  sucFont: string,
}

export type lightUIColorSchemeType = {
  primary: string,
  secondary: string,
  background: string,
  backgroundRGB: string,
  fontPrimary: string,
  fontSecondary: string,
  fontPrimaryLight: string,
  link: string,
  shadow: string,
}

export type colorSchemeType = {
  message: messageThemeType,
  ui: lightUIColorSchemeType,
}

let lightMessageTheme: messageThemeType = {
  errBg: '#D36060',
  errFont: '#FFF',
  warnBg: '#E3B23C',
  warnFont: '#FFF',
  sucBg: '#3E885B',
  sucFont: '#FFF',
}

let lightUITheme: lightUIColorSchemeType = {
  primary: '#DD6E42',
  secondary: '#1A936F',
  background: '#FAF8F8',
  backgroundRGB: '250, 248, 248',
  fontPrimary: '#1A181B',
  fontSecondary: '#F1F2EB',
  fontPrimaryLight: '#7A7A7A',
  link: '#456990',
  shadow: '#EEE',
}

export let lightColorScheme: colorSchemeType = {
  message: lightMessageTheme,
  ui: lightUITheme,
};
