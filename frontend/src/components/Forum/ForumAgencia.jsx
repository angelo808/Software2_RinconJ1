import React, { useState, useEffect, useCallback, useContext } from "react";
import Post from "./Post";
import { Container, TextField, Button, Box, Divider, Modal, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constants";
import { UserContext } from "../../context/UserContext";

const Forum = () => {
  const {user} = useContext(UserContext);
  const [isLoadingAgencia, setIsLoadingAgencia] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nombreAgencia, setNombreAgencia] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      console.log(`${API_URL}/posts/${user.selectedAgency}`)
      const postsResponse = await axios.get(`${API_URL}/posts/filter/${user.selectedAgency}`);
      setPosts(postsResponse.data);
      setIsLoadingAgencia(false);
    } catch (error) {
      console.error("Error fetching posts or user data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const newPost = {
        title: newPostTitle,
        content: newPostContent,
        author: nombreUsuario,
        image: newPostImage,
        agency: nombreAgencia,
        comments: [],
        likes: 0,
        dislikes: 0,
        reactions: [],
      };

      const response = await axios.post(`${API_URL}/posts`, newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setNewPostOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        FORO AGENCIA: {!isLoadingAgencia && nombreAgencia}
      </Typography>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#000" }} />

      <Box display="flex" flexDirection="row" alignItems="center" my={4}>
        <TextField
          fullWidth
          label="Buscar por nombre de post..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={() => setNewPostOpen(true)}
        >
          CREAR POST
        </Button>
      </Box>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#000" }} />

      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          currentUser={nombreUsuario}
        />
      ))}

      <Modal
        open={newPostOpen}
        onClose={() => setNewPostOpen(false)}
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
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Crear Nuevo Post
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Título del Post"
            type="text"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Descripción del Post"
            type="text"
            fullWidth
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            variant="outlined"
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
          {newPostImage && (
            <Box mt={2}>
              <img
                src={newPostImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              color="error"
              onClick={() => setNewPostOpen(false)}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreatePost} variant="contained" color="primary">
              Crear
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Forum;

