import React from "react";
import TestComponent from "./pages/TestComponent";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TestComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
