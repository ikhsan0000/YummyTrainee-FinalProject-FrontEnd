import { createBox, createText, createTheme } from '@shopify/restyle'

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};


const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    primary: "#2CB9B0",
    primaryLight: "#E7F9F7",
    secondary: '#0C0D34',
    white: '#FFFFFF',
    grey: "#F4F0EF",
    lightGrey: "#FAFAFA",
    darkGrey: "#8A8D90",
    danger: "#FF0058",
    body: "rgba(12, 13, 52, 0.7)",

    orange:"#FE5E33",
    yellow:"#FFC641",
    pink:"#FF87A2",
    violet:"#442CB9",
    lightBlue:"#BFEAF5"

  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
      hero: {
        fontSize: 80,
        lineHeight: 80,
        fontFamily: "SFProDisplay-Bold",
        color: "white",
        textAlign: "center",
    },
    title1: {
        fontSize: 28,
        fontFamily: "SFProDisplay-Semibold",
        color: "secondary"
      },
    title2: {
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "SFProDisplay-Semibold",
        color: "secondary"
    },
    title3: {
        fontSize: 16,
        fontFamily: "SFProDisplay-Semibold",
        color: "secondary"
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SFProDisplay-Regular",
        color: "secondary"
    },
    button: {
        fontFamily: "SFProDisplay-Medium",
        fontSize: 15,
    },
    header: {
      fontSize: 12,
      fontFamily: "SFProDisplay-Semibold",
      lineHeight: 24,
      color: "secondary",
    }



  }
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;