import React, { useState } from "react";
import Comment from "../Comment";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Post = ({ post, setPosts, posts, currentUser }) => {
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");

  // Estado para likes y dislikes
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // Puede ser 'like', 'dislike', o null

  const handleAddComment = () => {
    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: p.comments.length,
              user: currentUser,
              text: newCommentContent,
            },
          ],
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    setNewCommentOpen(false);
    setNewCommentContent("");
  };

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "dislike") {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === "like") {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserReaction("dislike");
    }
  };

  return (
    <Box>
      <Card sx={{ mt: 4, backgroundColor: "#D1C8C1" }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#00aaff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "1.5rem",
                mr: 2,
              }}
            >
              {post.author.charAt(0)}
            </Box>
            <Box>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="subtitle1">por {post.author}</Typography>
            </Box>
          </Box>
          {post.image && (
            <Box mb={2}>
              <img
                src={post.image}
                alt="Post"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
          <Typography variant="body1">{post.content}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setNewCommentOpen(true)}>
            Comentar
          </Button>
          <IconButton
            size="small"
            onClick={handleLike}
            color={userReaction === "like" ? "primary" : "default"}
          >
            <ThumbUpIcon /> {likes}
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDislike}
            color={userReaction === "dislike" ? "primary" : "default"}
          >
            <ThumbDownIcon /> {dislikes}
          </IconButton>
        </CardActions>
      </Card>

      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      <Dialog open={newCommentOpen} onClose={() => setNewCommentOpen(false)}>
        <DialogTitle>Agregar Comentario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contenido del Comentario"
            type="text"
            fullWidth
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCommentOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddComment}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Post;
