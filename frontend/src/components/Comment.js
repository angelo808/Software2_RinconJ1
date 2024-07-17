import React, { useContext, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Comment = ({ comment, type }) => {
  const { user } = useContext(UserContext);

  if (!comment || !comment.author) {
    return null; // Retorna null si comment o comment.author no están definidos
  }

  const reportComment = async () => {
    try {
      if (type == 'AGENCY') {
        const response = await axios.put(`http://localhost:5001/api/posts/${comment._id}/comment/report`)
        console.log(response.data)
        alert('Comentario reportado')
      } else if (type == 'EMPLOYER') {
        const response = await axios.put(`http://localhost:5001/api/postsEmp/${comment._id}/comment/report`)
        console.log(response.data)
        alert('Comentario reportado')
      }
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
    
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
              {
                comment.authorImg ?
                  <img src={comment.authorImg} className="rounded-full"/> :
                  comment.author.charAt(0)
              }
            </Box>
            <Box>
              <Typography variant="body1">
                <strong>{comment.author}</strong>
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
              {
                comment.author != user.name && 
                <button className="flex" onClick={()=>reportComment()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 my-2 text-red-500" viewBox="0 0 24 24"><path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z"></path><circle cx="12" cy="16" r="1" fill="currentColor"></circle><path fill="currentColor" d="M11 7h2v7h-2z"></path></svg>
                  <p className="my-auto text-red-500">Reportar</p>
                </button>
              }
              
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;


