import { themeType, chartColorScheme } from "./Types";

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
    secColor: '#5787C4',
    fontPrColor: '#E5E5E5',
    fontSecColor: '#B5B5B5'
}

const defaultChartTheme: chartColorScheme = {
    accent1: '#0B4983',
    accent2: '#1C7CBD',
    accent3: '#4A9ECD',
    accent4: '#4E6F6E',
    accent5: '#B4D3EC',
    accent6: '#68B38F',
    accent7: '#1B1A25'
}

interface ifTheme {
    [key: string]: themeType
}
const THEMES: ifTheme = {
    RED_WAR: RED_WAR,
    DEEP_FOREST: DEEP_FOREST,
    DARK_NIGHTS: DARK_NIGHTS,
};

interface ifChartTheme {
    [key: string]: chartColorScheme
}
const CHART_THEMES: ifChartTheme = {
    DEFAULT: defaultChartTheme
};

export type { ifTheme };
export default THEMES;
export { CHART_THEMES };