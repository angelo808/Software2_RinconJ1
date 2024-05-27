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
  Modal,
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
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
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

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const userReaction = post.reactions?.find(
          (reaction) => reaction.user === currentUser.email
        );
        if (userReaction) {
          if (userReaction.type === type) {
            post.reactions = post.reactions.filter(
              (reaction) => reaction.user !== currentUser.email
            );
          } else {
            post.reactions = post.reactions.map((reaction) =>
              reaction.user === currentUser.email
                ? { ...reaction, type }
                : reaction
            );
          }
        } else {
          post.reactions = [
            ...(post.reactions || []),
            { user: currentUser.email, type },
          ];
        }
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
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

      <Modal
        open={newCommentOpen}
        onClose={() => setNewCommentOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "#F6F4F3",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            backgroundColor: "#F6F4F3",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Agregar Comentario
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Contenido del Comentario"
            type="text"
            fullWidth
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button color="error" onClick={() => setNewCommentOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddComment}>Agregar</Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Post;
