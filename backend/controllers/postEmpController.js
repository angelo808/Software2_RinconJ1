const multer = require('multer');
const path = require('path');
const PostEmp = require('../models/PostEmp');
const User = require('../models/userModel');

// Configurar multer para guardar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'media/postEmpImg/') // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) // Genera un nombre único
  }
});

const upload = multer({ storage: storage });

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  const query = req.query.q;
  const employer = req.params.employer;

  try {
    let filter = { employer: employer };

    if (query) {
      // Añadir condición de título si hay un query
      filter.title = { $regex: query, $options: 'i' };
    }

    const posts = await PostEmp.find(filter);
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.uploadImg = upload.single('image');

// Crear un nuevo post
exports.createPost = async (req, res) => {
  const { title, content, author, employer } = req.body;
  if (!title || !content || !author || !employer) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    let url = null;
    if (req.file) {
      url = `http://localhost:5001/media/postEmpImg/${req.file.filename}`;
    }

    const newPost = new PostEmp({ 
      title, 
      content, 
      author, 
      image: url, 
      employer 
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};  

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostEmp.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar un post por ID
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, employer } = req.body;

  try {
    const post = await PostEmp.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;
    post.employer = employer || post.employer;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener todos los comentarios del usuario
exports.getComments = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = await PostEmp.find({ 
      'comments': { 
        $elemMatch: { 
          'author': user.name 
        } 
      } 
    });

    // Extraer solo los comentarios relevantes de cada post
    const userComments = posts.flatMap(post => 
      post.comments.filter(comment => comment.author === user.name)
    );

    res.status(200).json(userComments);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Borrar comentario
exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    // Buscar el post que contiene el comentario y actualizar
    const updatedPost = await PostEmp.findOneAndUpdate(
      { 'comments._id': commentId },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully', post: updatedPost });
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Reportar comentario
exports.reportComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    // Buscar el post que contiene el comentario y actualizar
    const updatedPost = await PostEmp.findOneAndUpdate(
      { 'comments._id': commentId },
      { $inc: { 'comments.$.reportCount': 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json({ 
      message: 'Comment reported successfully'
    });
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Agregar un comentario por ID
exports.uploadComment = async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;

  try {
    const post = await PostEmp.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({author: author,text: text})
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Eliminar un post por ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await PostEmp.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Manejar likes en un post
exports.updateReactions = async (req, res) => {
  const { dislikes, likes, reactions } = req.body;

  try {
    const post = await PostEmp.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.likes = likes;
    post.dislikes = dislikes;
    post.reactions = reactions;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  