import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Comment = ({ comment }) => {
  if (!comment || !comment.author) {
    return null; // Retorna null si comment o comment.author no están definidos
  }

  return (
    <Box mt={2} ml={4}>
      <Card sx={{ backgroundColor: "#D1C8C1" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: "#00aaff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.2rem",
                mr: 2,
              }}
            >
              {comment.author.charAt(0)}
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>{comment.author}</strong>
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Comment;

