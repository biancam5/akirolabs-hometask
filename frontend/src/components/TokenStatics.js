import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const TokenStatistics = () => {
  const [totalTokens, setTotalTokens] = useState(0);
  const [validTokens, setValidTokens] = useState(0);

  useEffect(() => {
    const fetchTokenStatistics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/token-statistics",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const data = await response.json();
        setTotalTokens(data.total);
        setValidTokens(data.valid);
      } catch (error) {
        console.error("Error fetching token statistics:", error);
      }
    };

    fetchTokenStatistics();
  }, [totalTokens, validTokens]);

  return (
    <div>
      <Box style={{ padding: "20px", marginRight: "150px", marginTop: "20px" }}>
        <Typography variant="body1">Total Tokens: {totalTokens}</Typography>
        <Typography variant="body1">Valid Tokens: {validTokens}</Typography>
      </Box>
    </div>
  );
};

export default TokenStatistics;
