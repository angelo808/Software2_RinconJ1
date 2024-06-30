import React, { useState, useEffect, useCallback } from "react";
import Post from "./Post";
import {
  Container,
  TextField,
  Button,
  Box,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";

const Forum = () => {
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

  const fetchUserAndPosts = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      const userId = storedUser._id;

      const userResponse = await axios.get(
        `http://localhost:5001/api/users/${userId}`
      );
      const user = userResponse.data;

      setNombreAgencia(user.selectedAgency || "BLOQUEADO");
      setNombreUsuario(user.username);

      const postsResponse = await axios.get(
        `http://localhost:5001/api/posts?agency=${user.selectedAgency}`
      );
      setPosts(postsResponse.data);
      setIsLoadingAgencia(false);
    } catch (error) {
      console.error("Error fetching posts or user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserAndPosts();
  }, [fetchUserAndPosts]);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        post.agency === nombreAgencia
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm, nombreAgencia]);

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

      const response = await axios.post(
        "http://localhost:5001/api/posts",
        newPost
      );
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
      <h2 className="text-4xl font-bold text-secondary my-4">
        FORO AGENCIA: {!isLoadingAgencia && nombreAgencia}
      </h2>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#000" }} />

      <Box className="flex flex-row my-4 items-center">
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
          <p className="text-white font-bold">CREAR POST</p>
        </Button>
      </Box>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#000" }} />

      {filteredPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setPosts={setPosts}
          posts={posts}
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
            backgroundColor: "#F6F4F3",
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
          />
          <TextField
            margin="dense"
            label="Descripción del Post"
            type="text"
            fullWidth
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
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
          <div className="flex justify-end">
            <Button color="error" onClick={() => setNewPostOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePost}>Crear</Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

export default Forum;
