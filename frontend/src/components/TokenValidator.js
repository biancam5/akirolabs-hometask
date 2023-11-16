import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { pink  } from '@mui/material/colors';

const TokenValidator = () => {
  const [inputToken, setInputToken] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const pinkColor = pink[400];
 
 
  const handleValidateToken = async () => {
    try {
      const formattedToken = inputToken.replace(/-/g, "");   
      const response = await fetch('http://localhost:3001/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: formattedToken }), 
      });
      const data = await response.json();
  
      if (data.hasOwnProperty('valid')) {
        setValidationResult(data.valid);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      <Typography variant="h4" elevation={2} style={{ padding: '20px', marginRight: '110px' }}>
        Token Validator
      </Typography>
      <TextField
        type="text"
        label="Enter token to validate"
        variant="outlined"
        value={inputToken}
        onChange={(e) => setInputToken(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleValidateToken}
        style={{ margin: '10px', background: pinkColor }}
      >
        Validate Token
      </Button>
      {validationResult !== null && (
        <Typography variant="body1"  >
          {!validationResult ? 'Valid Token' : 'Invalid Token'}
        </Typography>
      )}
    </div>
  );
};

export default TokenValidator;
