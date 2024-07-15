import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    TextField,
    Modal
  } from "@mui/material";

const AdminPanel = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaComments, setListaComments] = useState([]);
    const [listaCommentsEmp, setListaCommentsEmp] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState('');

    useEffect(()=>{
        getUsuarios()
    }, [])

    const getUsuarios = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/users/`);
            setListaUsuarios(response.data)
        } catch (error) {
            console.error('Error al listar usuarios', error);
        }
    }

    const handleDropdownClick = async (usuario) => {
        setShowDropdown(false);
        setSelectedUser(usuario)

        try {
            const response = await axios.get(`http://localhost:5001/api/posts/${usuario._id}/comment`);
            const response1 = await axios.get(`http://localhost:5001/api/postsEmp/${usuario._id}/comment`);
            setListaComments(response.data || [])
            setListaCommentsEmp(response1.data || [])
        } catch (error) {
            console.error('Error al listar comentarios', error);
        }
    }

    const altApproval = async (doc) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/users/${selectedUser._id}/document?type=${doc}`);
            setSelectedUser(response.data)
            console.log(response.data)
        } catch (error) {
        console.error('Error al aprobar', error);
        }
    }

    const blockUser = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/api/users/${selectedUser._id}/block`);
            setSelectedUser(response.data)
            console.log(response.data)
        } catch (error) {
        console.error('Error al aprobar', error);
        }
    }

    const eliminarComment = async (tipo, id) => {
        try {
            if (tipo == 'AGENCY') {
                const response = await axios.delete(`http://localhost:5001/api/posts/${id}/comment`);
                setListaComments(comments => comments.filter(comment => comment._id !== id))
                console.log(response.message)
            } else if (tipo == 'EMPLOYER') {
                const response = await axios.delete(`http://localhost:5001/api/postsEmp/${id}/comment`);
                setListaCommentsEmp(comments => comments.filter(comment => comment._id !== id))
                console.log(response.message)
            }            
        } catch (error) {
        console.error('Error al aprobar', error);
        }
    }

    const handleClick = async (tipo) => {
        setFeedbackType(tipo)
        setModalOpen(true)
    }

    const updateFeedback = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/api/users/${selectedUser._id}/document/feedback?type=${feedbackType}`,{feedback});
            setSelectedUser(response.data)
            setFeedback('')
            setModalOpen(false)
        } catch (error) {
        console.error('Error al subir feedback', error);
        }
    }

    return (
        <div className="container h-screen w-screen p-4 mx-auto">
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
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
                    Comentar documento
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Comentario"
                    type="text"
                    fullWidth
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    variant="outlined"
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                    color="error"
                    onClick={() => setModalOpen(false)}
                    sx={{ mr: 1 }}
                    >
                    Cancelar
                    </Button>
                    <Button onClick={()=>updateFeedback()} variant="contained" color="primary">
                        Enviar
                    </Button>
                </Box>
                </Box>
            </Modal>
            <section className='w-full'>
                <h1 className='text-5xl font-bold text-marron'>Panel de administrador</h1>
                <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
                <h2 className='text-3xl font-bold text-marron'>Manejo de usuarios</h2>
                <button onClick={()=>setShowDropdown(!showDropdown)} className="mt-8 text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                    Lista de usuarios
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div id="dropdownUsers" className={`${showDropdown ? '' : 'hidden'} absolute z-10 bg-white rounded-lg shadow w-40 dark:bg-gray-700`}>
                    <ul className="py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                        {
                            listaUsuarios.map((usuario) => {
                                return <li key={usuario._id}><button onClick={()=>handleDropdownClick(usuario)} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {usuario.name}
                                </button></li>
                            })
                        }
                    </ul>
                </div>
                {
                    selectedUser && 
                    <div className="mt-16">
                        <h3 className="font-bold text-marron text-2xl">Usuario: <span className="font-medium">{selectedUser.name}</span></h3>
                        {
                            selectedUser.blocked ?
                            <button className="my-4 p-2 bg-marron rounded-lg text-white" onClick={()=>blockUser()}>Desbloquear usuario</button>
                            : <button className="my-4 p-2 bg-red-500 rounded-lg text-white" onClick={()=>blockUser()}>Bloquear usuario</button>
                         
                        }
                        <div className="m-8 w-4/6 grid grid-cols-4">
                            {
                                selectedUser.documents.ds160.url ?
                                <Link to={selectedUser.documents.ds160.url} className="my-auto text-xl me-8"><u>DS-160</u></Link>
                                : <p className="my-auto text-xl me-8">DS-160</p>
                            }
                            <div className="flex col-span-3 justify-start">
                                {
                                    selectedUser.documents.ds160.url ?
                                    <button onClick={()=>altApproval('DS-160')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center items-center w-36 mx-4" type="button">
                                        {selectedUser.documents.ds160.approved ? 'Desaprobar' : 'Aprobar'}
                                    </button> :
                                    <button disabled className="text-white bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center items-center w-36 mx-4" type="button">
                                        No subido
                                    </button>
                                }
                                <button onClick={()=>handleClick('DS-160')} className="text-white bg-marronClaro focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36 mx-4" type="button">
                                    Comentar
                                </button>
                                {
                                    selectedUser.documents.ds160.feedback ?
                                    <p className="my-auto"><b>Comentario Actual: </b>{selectedUser.documents.ds160.feedback}</p>:
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="m-8 w-4/6 grid grid-cols-4">
                            {
                                selectedUser.documents.passport.url ?
                                <Link to={selectedUser.documents.passport.url} className="my-auto text-xl me-8"><u>Pasaporte</u></Link>
                                : <p className="my-auto text-xl me-8">Pasaporte</p>
                            }
                            <div className="flex col-span-3 justify-start">
                                {
                                    selectedUser.documents.passport.url ?
                                    <button onClick={()=>altApproval('PASAPORTE')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5 px-5 text-center items-center w-36 mx-4" type="button">
                                        {selectedUser.documents.passport.approved ? 'Desaprobar' : 'Aprobar'}
                                    </button> :
                                    <button disabled className="text-white bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-2.5 text-center items-center px-5 w-36 mx-4" type="button">
                                        No subido
                                    </button>
                                }
                                <button onClick={()=>handleClick('PASAPORTE')} className="text-white bg-marronClaro focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36 mx-4" type="button">
                                    Comentar
                                </button>
                                {
                                    selectedUser.documents.passport.feedback ?
                                    <p className="my-auto"><b>Comentario Actual: </b>{selectedUser.documents.passport.feedback}</p>:
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="m-8 w-4/6 grid grid-cols-4">
                            {
                                selectedUser.documents.payment.url ?
                                <Link to={selectedUser.documents.payment.url} className="my-auto text-xl me-8"><u>Pago 1</u></Link>
                                : <p className="my-auto text-xl me-8">Pago 1</p>
                            }
                            <div className="flex col-span-3 justify-start">
                                {
                                    selectedUser.documents.payment.url ?
                                    <button onClick={()=>altApproval('PAGO')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 w-36 mx-4" type="button">
                                        {selectedUser.documents.payment.approved ? 'Desaprobar' : 'Aprobar'}
                                    </button> :
                                    <button disabled className="text-white bg-gray-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36" type="button">
                                        No subido
                                    </button>
                                }
                                <button onClick={()=>handleClick('PAGO')} className="text-white bg-marronClaro focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36 mx-4" type="button">
                                    Comentar
                                </button>
                                {
                                    selectedUser.documents.payment.feedback ?
                                    <p className="my-auto"><b>Comentario Actual: </b>{selectedUser.documents.payment.feedback}</p>:
                                    <></>
                                }
                            </div>
                            
                        </div>

                        <h4 className="text-xl mt-2">Comentarios en Foro de Agencia:</h4>
                        {
                            listaComments.map((comentario)=> {
                                return <div className="flex">
                                    <p className=" px-4 py-1">- <b>{comentario.text}</b> ({comentario.reportCount} Reporte(s))</p>
                                    <button className="text-red-500 mx-16" onClick={()=>eliminarComment('AGENCY', comentario._id)}>Eliminar comentario</button>
                                </div>
                            })
                        }
                        <h4 className="text-xl mt-2">Comentarios en Foro de Empleador:</h4>
                        {
                            listaCommentsEmp.map((comentario)=> {
                                return <div className="flex">
                                    <p className=" px-4 py-1">- <b>{comentario.text}</b> ({comentario.reportCount} Reporte(s))</p>
                                    <button className="text-red-500 mx-16" onClick={()=>eliminarComment('EMPLOYER', comentario._id)}>Eliminar comentario</button>
                                </div>
                            })
                        }
                    </div>
                }
                
            </section>
        </div>
    );
}

export default AdminPanel;