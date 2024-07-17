import React, { useState, useEffect, useCallback, useContext } from "react";
import { Container, TextField, Button, Box, Divider, Modal, Typography } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constants";
import { UserContext } from "../../context/UserContext";
import PostEmp from "./PostEmp";

const ForumEmp = () => {
  const {user} = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [employer, setEmployer] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [urlPostImage, setURLPostImage] = useState(null);
  const [query, setQuery] = useState('');
  const [errorCreate, setErrorCreate] = useState(null);

  const fetchPosts = async () => {
    try {
      console.log(`${API_URL}/posts/${employer}`)
      const postsResponse = await axios.get(`${API_URL}/postsEmp/filter/${employer}?q=${query}`);
      setPosts(postsResponse.data);
    } catch (error) {
      console.error("Error fetching posts or user data:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [query, employer]);

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:5001/api/users/${user._id}`)
    setEmployer(response.data.employer)
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCreatePost = async () => {
    if (newPostTitle == "" || newPostContent == "") {
      setErrorCreate("Los campos no pueden estar vacíos")
      return;
    } else {
      setErrorCreate(null)
    }
    
    const formData = new FormData();
    formData.append('title', newPostTitle);
    formData.append('content', newPostContent);
    formData.append('author', user.name);
    formData.append('authorId', user._id);
    formData.append('employer', employer);
    console.log(formData)
  
    if (newPostImage) {
      formData.append('image', newPostImage);
    }
    
  
    try {
      const response = await axios.post(
        'http://localhost:5001/api/postsEmp',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response.data);
      setNewPostOpen(false);
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostImage(null);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPostImage(e.target.files[0]);
      setURLPostImage(URL.createObjectURL(e.target.files[0]))
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        FORO EMPLEADOR: {employer}
      </Typography>
      <Divider sx={{ borderBottomWidth: 5, backgroundColor: "#000" }} />

      <Box display="flex" flexDirection="row" alignItems="center" my={4}>
        <TextField
          fullWidth
          label="Buscar por nombre de post..."
          value={query}
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
        <PostEmp
          key={post._id}
          post={post}
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
                src={urlPostImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
          {
            errorCreate && <p className="text-red-500 text-xs mt-4 italic">{errorCreate}</p>
          }
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

export default ForumEmp;

