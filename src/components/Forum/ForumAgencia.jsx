import React, { useState, useEffect } from "react";
import { BLOQUEADO } from "../../constants";
import Post from "./Post";
import {
  Container,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Typography,
} from "@mui/material";

const Forum = () => {
  const [isLoadingAgencia, setIsLoadingAgencia] = useState(true);
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [nombreAgencia, setNombreAgencia] = useState(BLOQUEADO);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    setIsLoadingAgencia(true);
    const nombreAgencia = localStorage.getItem("nombreAgencia") || BLOQUEADO;
    const nombreUsuario = localStorage.getItem("nombreUsuario") || BLOQUEADO;
    setNombreAgencia(nombreAgencia);
    setNombreUsuario(nombreUsuario);
    setIsLoadingAgencia(false);
  }, []);

  const handleCreatePost = () => {
    const updatedPosts = [
      ...posts,
      {
        id: posts.length,
        title: newPostTitle,
        content: newPostContent,
        author: nombreUsuario,
        image: newPostImage,
        comments: [],
        likes: 0,
        dislikes: 0,
        reactions: [],
      },
    ];

    setPosts(updatedPosts);
    setNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setNewPostImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          key={post.id}
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
