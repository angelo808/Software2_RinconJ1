import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";

const PostEmp = ({ post, setPosts, posts }) => {
  const {user} = useContext(UserContext);
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null);
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    if (post.reactions) {
      setUserReaction(
        post.reactions.find((r) => r.user === user.name)?.reaction || null
      );
    }
  }, [post.reactions, user]);

  const handleAddComment = async () => {
    console.log(user)
    try {
      const response = await axios.post(
        `http://localhost:5001/api/postsEmp/${post._id}/comment`,
        {author: user.name, text: newCommentContent}
      );
      setComments(response.data.comments);
      setNewCommentOpen(false);
      setNewCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReaction = async (reaction) => {
    let newLikes = likes;
    let newDislikes = dislikes;
    let newReactions = (post.reactions || []).filter((r) => r.user !== user.name);

    try {
      if (reaction === "like") {
        if (userReaction === "like") {
          setLikes(newLikes-1);
          newLikes-=1
          setUserReaction(null);
        } else {
          if (userReaction === "dislike") {
            setDislikes(newDislikes-1)
            newDislikes-=1
          }
          setLikes(newLikes+1);
          newLikes+=1
          newReactions.push({ user: user.name, reaction: reaction })
          setUserReaction("like");
        }
      } else if (reaction === "dislike") {
        if (userReaction === "dislike") {
          setDislikes(newDislikes-1)
          newDislikes-=1
          setUserReaction(null);
        } else {
          if (userReaction === "like") {
            setLikes(newLikes-1);
            newLikes-=1
          }
          setDislikes(newDislikes+1);
          newDislikes+=1
          newReactions.push({ user: user.name, reaction: reaction })
          setUserReaction("dislike");
        }
      }

      const body = {
        likes: newLikes,
        dislikes: newDislikes,
        reactions: newReactions
      }
      console.log(body)

      const response = await axios.put(`http://localhost:5001/api/postsEmp/${post._id}/reactions`, body);
      console.log(response.data)

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
        <Comment key={comment._id} comment={comment} type={'EMPLOYER'}/>
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

export default PostEmp;


