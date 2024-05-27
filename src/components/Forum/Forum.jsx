import React, { useState } from "react";
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
} from "@mui/material";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Esta variable representará al usuario actualmente registrado
  const currentUser = "UsuarioActual"; // Placeholder, cambiar cuando se implemente autenticación

  const handleCreatePost = () => {
    setPosts([
      ...posts,
      {
        id: posts.length,
        title: newPostTitle,
        content: newPostContent,
        author: currentUser,
        image: newPostImage,
        comments: [],
      },
    ]);
    setNewPostOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
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
      <Box mt={4} display="flex" justifyContent="space-between">
        <TextField
          fullWidth
          label="Buscar"
          variant="outlined"
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

      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          setPosts={setPosts}
          posts={posts}
          currentUser={currentUser}
        />
      ))}

      <Dialog open={newPostOpen} onClose={() => setNewPostOpen(false)}>
        <DialogTitle>Crear Nuevo Post</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewPostOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreatePost}>Crear</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Forum;
