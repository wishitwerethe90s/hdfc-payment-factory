import React from "react";
import { Container, Typography } from "@mui/material";
import FilterTabs from "../components/FilterTabs";

const TestComponent: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My Test Component!
      </Typography>
      <Typography variant="body1" paragraph>
        This is a demonstration of the initial page load using Material UI.
      </Typography>
      {/* <Button variant="contained" color="primary">
        Click Me
      </Button> */}
      <FilterTabs />
    </Container>
  );
};

export default TestComponent;
