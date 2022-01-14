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
    secondary: '#0C0D34',
    white: '#FFFFFF',
    grey: "rgba(12, 13, 52, 0.05)",
    lightGrey: "#F4F0EF",
    darkGrey: "#8A8D90",
    danger: "#FF0058",
    body: "rgba(12, 13, 52, 0.7)",

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
    body: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SFProDisplay-Regular",
        color: "secondary"
    },
    button: {
        fontFamily: "SFProDisplay-Medium",
        fontSize: 15,
    }



  }
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;