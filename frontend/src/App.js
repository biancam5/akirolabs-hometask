import React from 'react';
import { Container, CssBaseline, Paper, Typography } from '@mui/material';
import TokenGenerator from './components/TokenGenerator';
import TokenValidator from './components/TokenValidator';
import TokenStatistics from './components/TokenStatics';
 
function App() {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h2">Token Generator App</Typography>
        <TokenGenerator />
        <TokenValidator />
        <TokenStatistics />
      </Paper>
    </Container>
  );
}

export default App;

