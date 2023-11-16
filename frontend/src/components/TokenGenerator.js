import React, { useState, useEffect } from "react";
import { Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { pink } from "@mui/material/colors";

const TokenGenerator = () => {
  const [generatedToken, setGeneratedToken] = useState("");
  const [isGeneratingTokens, setIsGeneratingTokens] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const color = pink[600];

  const generateToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setGeneratedToken(data.token);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  const startTokenGenerationLoop = () => {
    setIsGeneratingTokens(true);

    const currentIntervalId = setInterval(() => {
      generateToken();
     }, 1000);

    setIntervalId(currentIntervalId);
  };

  const stopTokenGenerationLoop = () => {
    setIsGeneratingTokens(false);

    clearInterval(intervalId);
   };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <Container>
      <Box my={4}>
        <Paper elevation={2} style={{ padding: "10px" }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={generateToken} fullWidth>
                Generate Token
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={startTokenGenerationLoop}
                disabled={isGeneratingTokens}
                fullWidth
                style={{ background: color }}
              >
                Start Token Generation Loop
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                onClick={stopTokenGenerationLoop}
                disabled={!isGeneratingTokens}
                fullWidth
              >
                Stop Token Generation Loop
              </Button>
            </Grid>
            {generatedToken && (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Generated Token: {generatedToken}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default TokenGenerator;