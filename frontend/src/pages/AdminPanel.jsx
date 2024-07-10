import { useState } from "react";

const AdminPanel = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDropdownClick = (usuario) => {
        setShowDropdown(false);
        setSelectedUser(usuario)
    }

    const altApproval = (doc) => {
        return;
    }

    const listaUsuarios = [{
        'nombre': 'pepe',
        'test': '/assets/pepe_test',
        'ds': '/assets/pepe_ds',
        'passport': '/assets/pepe_pass',
    },{
        'nombre': 'carlos',
        'test': '/assets/carlos_test',
        'ds': '/assets/carlos_ds',
        'passport': '/assets/carlos_pass',
    },{
        'nombre': 'manuel',
        'test': '/assets/manuel_test',
        'ds': '/assets/manuel_ds',
        'passport': '/assets/manuel_pass',
    }] 

    return (
        <div className="container h-screen w-screen p-4 mx-auto">
            <section className='w-full'>
                <h1 className='text-5xl font-bold text-marron'>Panel de administrador</h1>
                <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
                <h2 className='text-3xl font-bold text-marron'>Manejo de usuario</h2>
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
                                return <button onClick={()=>handleDropdownClick(usuario)} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    {usuario.nombre}
                                </button>
                            })
                        }
                    </ul>
                </div>
                {
                    selectedUser && 
                    <div className="mt-16">
                        <h3 className="font-bold text-marron text-2xl">Usuario: <span className="font-medium">{selectedUser.nombre}</span></h3>
                        <div className="m-8 w-2/6 grid grid-cols-2">
                            <p className="my-auto text-xl me-8">DS-160</p>
                            <button onClick={()=>altApproval('DS')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-1/2 mx-auto text-center" type="button">
                                Aprobar
                            </button>
                        </div>
                        <div className="m-8 w-2/6 grid grid-cols-2">
                            <p className="my-auto text-xl me-8">Pasaporte</p>
                            <button onClick={()=>altApproval('Pasaporte')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-1/2 mx-auto text-center" type="button">
                                Aprobar
                            </button>
                        </div>
                        <div className="m-8 w-2/6 grid grid-cols-2">
                            <p className="my-auto text-xl me-8">PAGO 1</p>
                            <button onClick={()=>altApproval('Pago')} className="text-white bg-marron focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center w-1/2 mx-auto text-center" type="button">
                                Aprobar
                            </button>
                        </div>
                    </div>
                }
                
            </section>
        </div>
    );
}

export default AdminPanel;