import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import Comment from "../Comment";

const Post = ({ post, setPosts, posts, currentUser }) => {
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/comments/posts/${post._id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post._id]);

  useEffect(() => {
    if (post.reactions) {
      setUserReaction(
        post.reactions.find((r) => r.user === currentUser)?.reaction || null
      );
    }
  }, [post.reactions, currentUser]);

  const handleAddComment = async () => {
    const newComment = {
      author: currentUser,
      text: newCommentContent,
      postId: post._id,
    };

    try {
      const response = await axios.post(
        `http://localhost:5001/api/comments/comments`,
        newComment
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setNewCommentOpen(false);
      setNewCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReaction = async (reaction) => {
    let newLikes = likes;
    let newDislikes = dislikes;

    if (reaction === "like") {
      if (userReaction === "like") {
        newLikes -= 1;
        setUserReaction(null);
      } else {
        if (userReaction === "dislike") {
          newDislikes -= 1;
        }
        newLikes += 1;
        setUserReaction("like");
      }
    } else if (reaction === "dislike") {
      if (userReaction === "dislike") {
        newDislikes -= 1;
        setUserReaction(null);
      } else {
        if (userReaction === "like") {
          newLikes -= 1;
        }
        newDislikes += 1;
        setUserReaction("dislike");
      }
    }

    setLikes(newLikes);
    setDislikes(newDislikes);

    const updatedPosts = posts.map((p) =>
      p._id === post._id
        ? {
            ...p,
            likes: newLikes,
            dislikes: newDislikes,
            reactions: [
              ...(p.reactions || []).filter((r) => r.user !== currentUser),
              { user: currentUser, reaction: userReaction },
            ],
          }
        : p
    );

    setPosts(updatedPosts);

    try {
      await axios.put(`http://localhost:5001/api/posts/posts/${post._id}`, {
        likes: newLikes,
        dislikes: newDislikes,
        reactions: [
          ...(post.reactions || []).filter((r) => r.user !== currentUser),
          { user: currentUser, reaction: userReaction },
        ],
      });
    } catch (error) {
      console.error("Error updating post reactions:", error);
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
            onClick={() => handleReaction("like")}
            color={userReaction === "like" ? "primary" : "default"}
          >
            <ThumbUpIcon /> {likes}
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleReaction("dislike")}
            color={userReaction === "dislike" ? "primary" : "default"}
          >
            <ThumbDownIcon /> {dislikes}
          </IconButton>
        </CardActions>
      </Card>

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
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


