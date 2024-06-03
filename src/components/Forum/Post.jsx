import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardActions, Button, Typography, TextField, Modal } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Comment from "../Comment";

const Post = ({ post, setPosts, posts, currentUser }) => {
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [userReaction, setUserReaction] = useState(null);

  const handleAddComment = async () => {
    const updatedPosts = posts.map((p) => {
      if (p._id === post._id) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: p.comments.length,
              author: currentUser,
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
    
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        comments: [...post.comments, { author: currentUser, text: newCommentContent }]
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    let new_dislikes = dislikes,
        new_likes = likes,
        new_user_reaction = userReaction;

    if (userReaction === "like") {
      new_likes -= 1;
      new_user_reaction = null;
    } else {
      if (userReaction === "dislike") {
        new_dislikes -= 1;
      }
      new_likes += 1;
      new_user_reaction = "like";
    }

    setLikes(new_likes);
    setDislikes(new_dislikes);
    setUserReaction(new_user_reaction);

    const updatedPosts = posts.map((p) => {
      if (p._id === post._id) {
        return {
          ...p,
          likes: new_likes,
          dislikes: new_dislikes,
          reactions: [
            ...p.reactions.filter((r) => r.user !== currentUser),
            { user: currentUser, reaction: new_user_reaction },
          ],
        };
      }
      return p;
    });

    setPosts(updatedPosts);

    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        likes: new_likes,
        dislikes: new_dislikes,
        reactions: [
          ...post.reactions.filter((r) => r.user !== currentUser),
          { user: currentUser, reaction: new_user_reaction },
        ],
      });
    } catch (error) {
      console.error("Error updating post reactions:", error);
    }
  };

  const handleDislike = async () => {
    let new_dislikes = dislikes,
        new_likes = likes,
        new_user_reaction = userReaction;

    if (userReaction === "dislike") {
      new_dislikes -= 1;
      new_user_reaction = null;
    } else {
      if (userReaction === "like") {
        new_likes -= 1;
      }
      new_dislikes += 1;
      new_user_reaction = "dislike";
    }

    setLikes(new_likes);
    setDislikes(new_dislikes);
    setUserReaction(new_user_reaction);

    const updatedPosts = posts.map((p) => {
      if (p._id === post._id) {
        return {
          ...p,
          likes: new_likes,
          dislikes: new_dislikes,
          reactions: [
            ...p.reactions.filter((r) => r.user !== currentUser),
            { user: currentUser, reaction: new_user_reaction },
          ],
        };
      }
      return p;
    });

    setPosts(updatedPosts);

    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        likes: new_likes,
        dislikes: new_dislikes,
        reactions: [
          ...post.reactions.filter((r) => r.user !== currentUser),
          { user: currentUser, reaction: new_user_reaction },
        ],
      });
    } catch (error) {
      console.error("Error updating post reactions:", error);
    }
  };

  useEffect(() => {
    if (post.reactions) {
      setUserReaction(post.reactions.find((r) => r.user === currentUser)?.reaction || null);
    }
  }, [post.reactions, currentUser]);

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

