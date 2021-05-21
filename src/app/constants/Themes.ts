import { themeType } from "./Types";

const RED_WAR: themeType = {
    key: 'RED_WAR',
    label: 'Red War',
    prColor: '#161620',
    secColor: '#A24B65',
    fontPrColor: '#E5E5E5',
    fontSecColor: '#B5B5B5'
}

const DEEP_FOREST: themeType = {
    key: 'DEEP_FOREST',
    label: 'Deep Forest',
    prColor: '#051923',
    secColor: '#3F886B',
    fontPrColor: '#E5E5E5',
    fontSecColor: '#B5B5B5'
}

const DARK_NIGHTS: themeType = {
    key: 'DARK_NIGHTS',
    label: 'Dark Night',
    prColor: '#161620',
    secColor: '#487CBF',
    fontPrColor: '#E5E5E5',
    fontSecColor: '#B5B5B5'
}

interface ifTheme {
    [key: string]: themeType
}
const THEMES: ifTheme = {
    RED_WAR: RED_WAR,
    DEEP_FOREST: DEEP_FOREST,
    DARK_NIGHTS: DARK_NIGHTS,
}
export type { ifTheme };
export default THEMES;