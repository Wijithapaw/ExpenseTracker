export interface Theme {
  name: string;
  text: ThemeText;
  button: ThemeButton;
  background: ThemeBackGround;
  border: ThemeBorder;
}

interface ThemeText {
  primary: string;
  secondary: string;
  header: string;
  error: string;
  success: string;
}

interface ThemeButton {
  primary: string;
  secondary: string;
}

interface ThemeBackGround {
  primary: string;
  secondary: string;
  header: string;
}

interface ThemeBorder {
  primary: string;
  secondary: string;
  error: string;
  success: string;
}
