const multer = require('multer');
const path = require('path');
const User = require('../models/userModel');
const Post = require('../models/Post');
const PostEmbajada = require('../models/PostEmbajada');
const PostEmp = require('../models/PostEmp');
const { default: mongoose } = require('mongoose');

// Configurar multer para guardar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/userImg/') // Asegúrate de que esta carpeta exista
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Genera un nombre único
    }
});

const upload = multer({ storage: storage });

// Configurar multer para guardar archivos
const storageDocuments = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/documents/') // Asegúrate de que esta carpeta exista
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Genera un nombre único
    }
});

const uploadDocuments = multer({ storage: storageDocuments });



// Método para iniciar sesión
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(401).json({ error: 'Usuario o contraseña no son correctos.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUserAgency = async (req, res) => {
    try {
        const { userId, selectedAgency } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { selectedAgency: selectedAgency },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { username, password, name, email, occupation } = req.body;
        const requiredFields = { username, password, name, email, occupation };
        const containsNumber = (str) => /\d/.test(str);
        const isNotEmpty = (field) => field.trim().length > 0;
        const hasNoSpaces = (str) => !/\s/.test(str);

        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!isNotEmpty(value)) {
                return res.status(400).json({ error: `No pueden haber datos vacíos` });
            }
        }

        const isValidPassword = (password) => {
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            return passwordRegex.test(password);
        };

        if (existingUser) {
            return res.status(400).json({ error: 'Usuario o correo ya existe' });
        } else if (containsNumber(name)) {
            return res.status(400).json({ error: 'El nombre no debe contener números' });
        } else if (containsNumber(occupation)) {
            return res.status(400).json({ error: 'La profesión no debe contener números' });
        } else if (!hasNoSpaces(username)) {
            return res.status(400).json({ error: 'El nombre de usuario no puede contener espacios' });
        } else if (!hasNoSpaces(password)) {
            return res.status(400).json({ error: 'La contraseña no puede contener espacios' });
        } else if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número'});
        } 

        const newUser = new User({
            username,
            password,
            name,
            email,
            occupation
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log('no se encontro usuario')
            return res.status(404).json({ error: 'User not found' });
        }

        // Aquí es donde actualizas la contraseña sin bcrypt
        Object.assign(user, req.body);
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar contraseña
exports.updatePass = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Aquí es donde actualizas la contraseña sin bcrypt
        user.password = req.body.password;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar trabajo
exports.updateJob = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Aquí es donde actualizas el empleo
        user.employer = req.body.name;
        user.job = req.body.title;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, occupation } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.occupation = occupation;
        await user.save();

        console.log(user)

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Actualizar foto
exports.updatePhoto = [
    upload.single('photo'),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (req.file) {
                // Construir la URL de la imagen
                const imageUrl = `http://localhost:5001/media/userImg/${req.file.filename}`;
                
                // Actualizar la foto del usuario
                user.photo = imageUrl;
                await user.save();

                res.status(200).json({url: user.photo});
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
]

//Actualizar documentos
exports.updateDocument = [
    uploadDocuments.single('document'),
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const doctype = req.query.doc;

            console.log(doctype);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (req.file) {
                // Construir la URL del doc
                const docUrl = `http://localhost:5001/media/documents/${req.file.filename}`;
                
                if (doctype == 'DS-160') {
                    user.documents.ds160.url = docUrl;
                } else if (doctype == 'PASAPORTE') {
                    user.documents.passport.url = docUrl;
                } else if (doctype == 'PAGO') {
                    user.documents.payment.url = docUrl;
                }

                const newUser = await user.save();
                res.status(200).json(newUser);
            }
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
]

// Actualizar Docs
exports.updateApproval = async (req, res) => {
    try {
        const userId = req.params.id;
        const type = req.query.type;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (type == 'DS-160') {
            user.documents.ds160.approved = !user.documents.ds160.approved;
        } else if (type == 'PASAPORTE') {
            user.documents.passport.approved = !user.documents.passport.approved;
        } else if (type == 'PAGO') {
            user.documents.payment.approved = !user.documents.payment.approved;
        }
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar feedback en docs
exports.updateFeedback = async (req, res) => {
    try {
        const userId = req.params.id;
        const type = req.query.type;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (type == 'DS-160') {
            user.documents.ds160.feedback = req.body.feedback;
        } else if (type == 'PASAPORTE') {
            user.documents.passport.feedback = req.body.feedback;
        } else if (type == 'PAGO') {
            user.documents.payment.feedback = req.body.feedback;
        }
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Bloquear o desbloquear usuario
exports.updateBlock = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.blocked = !user.blocked
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUserEntrevista = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
          id,
          { entrevista: true }, // Actualiza el campo entrevista a true
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.updateUserDsTest = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { pruebads: true }, // Actualiza el campo pruebads a true
            { new: true }
        );
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

//FUNCION DE ADMIN
exports.getPostsAndComments = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);

        const postsAgency = await Post.find({authorId: id});
        const postsEmbassy = await PostEmbajada.find({authorId: id});
        const postsEmployer = await PostEmp.find({authorId: id});
        const allPosts = [...postsAgency, ...postsEmbassy, ...postsEmployer];
        
        const commentsQuery = [
            { $unwind: "$comments" },
            { $match: { "comments.authorId": objectId } },
            { $project: {
                _id: 0,
                postId: "$_id",
                postTitle: "$title",
                comment: "$comments"
            }}
        ];

        const commentsAgency = await Post.aggregate(commentsQuery);
        const commentsEmbassy = await PostEmbajada.aggregate(commentsQuery);
        const commentsEmployer = await PostEmp.aggregate(commentsQuery);
        const allComments = [...commentsAgency, ...commentsEmbassy, ...commentsEmployer];
        
        res.status(200).json({
            posts: allPosts,
            comments: allComments
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//FUNCION DE ADMIN
exports.deletePost = async (req, res) => {
    try {
        const { id, postid } = req.params;
        
        const deleteOperations = [
            Post.findByIdAndDelete(postid),
            PostEmbajada.findByIdAndDelete(postid),
            PostEmp.findByIdAndDelete(postid)
        ];

        await Promise.all(deleteOperations);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//FUNCION DE ADMIN
exports.deleteComment = async (req, res) => {
    try {
        const { id, postid, commentid } = req.params;
        
        // Definir la operación de eliminación de comentarios
        const deleteCommentQuery = { _id: postid };
        const deleteCommentUpdate = { $pull: { comments: { _id: commentid } } };

        // Ejecutar las eliminaciones en paralelo
        const deleteOperations = [
            Post.updateOne(deleteCommentQuery, deleteCommentUpdate),
            PostEmbajada.updateOne(deleteCommentQuery, deleteCommentUpdate),
            PostEmp.updateOne(deleteCommentQuery, deleteCommentUpdate)
        ];

        const results = await Promise.all(deleteOperations);

        // Comprobar si algún comentario fue eliminado
        const wasDeleted = results.some(result => result.modifiedCount > 0);

        if (wasDeleted) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};