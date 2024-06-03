import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comment from "../Comment"

const Post = ({ post, setPosts, posts, currentUser }) => {
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");

  // Estado para likes y dislikes
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [userReaction, setUserReaction] = useState(null);

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
    let new_dislikes = 0,
      new_likes = 0,
      new_user_reaction = userReaction;

    if (userReaction === "like") {
      new_likes = likes - 1;
      setLikes(new_likes);

      new_user_reaction = null;
      setUserReaction(new_user_reaction);
    } else {
      if (userReaction === "dislike") {
        new_dislikes = dislikes - 1;
        setDislikes(new_dislikes);
      }
      new_likes = likes + 1;
      setLikes(new_likes);
      new_user_reaction = "like";
      setUserReaction(new_user_reaction);
    }

    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
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

    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleDislike = () => {
    let new_dislikes = 0,
      new_likes = 0,
      new_user_reaction;
    if (userReaction === "dislike") {
      new_dislikes = dislikes - 1;
      setDislikes(new_dislikes);
      new_user_reaction = null;
      setUserReaction(new_user_reaction);
    } else {
      if (userReaction === "like") {
        new_likes = likes - 1;
        setLikes(new_likes);
      }
      new_dislikes = dislikes + 1;
      setDislikes(new_dislikes);
      new_user_reaction = "dislike";
      setUserReaction(new_user_reaction);
    }
    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
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
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  useEffect(() => {
    if (post.reactions) {
      setUserReaction(
        post.reactions.filter((p) => p.user === currentUser)[0]?.reaction
      );
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
