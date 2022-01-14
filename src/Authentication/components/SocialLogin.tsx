import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { theme } from "../../components";
import { Box } from "../../components/Theme";

const Google = (props) => (
  <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <Path
      fill="#34A853"
      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z"
    />
    <Path
      fill="#FBBC05"
      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09Z"
    />
    <Path
      fill="#EA4335"
      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
    />
  </Svg>
);

const Facebook = (props) => (
    <Svg
    width={24} height={24}
    aria-hidden="true"
    data-prefix="fab"
    data-icon="facebook-f"
    className="svg-inline--fa fa-facebook-f"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m279.1 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
    />
  </Svg>
  )

const SIZE = theme.borderRadii.l * 2;

const SocialIcon = ({ children }: SocialIconProps) => {
  return (
    <Box
    marginHorizontal="s"
      backgroundColor="white"
      width={SIZE}
      height={SIZE}
      borderRadius="l"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

const SocialLogin = () => {
  return (
    <Box flexDirection="row" justifyContent="center">
      <SocialIcon>
        <Google />
      </SocialIcon>

      <SocialIcon>
        <Google />
      </SocialIcon>

      <SocialIcon>
        <Google />
      </SocialIcon>
    </Box>
  );
};

export default SocialLogin;
