import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { USERS } from '../data/users';  
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ChangePassword = () => {//Componente para cambiar la contraseña

  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const {register, handleSubmit, reset} = useForm();

  const onClose = () => {//Función para cerrar el modal
    navigate(-1);
  };

  const handleSave = (data) => {//Función para guardar la nueva contraseña
    if((data.newPassword === data.confirmPassword && (data.newPassword !== '' && data.confirmPassword !== ''))){
      const userUpdate = USERS.find(u => u.id === user.id);
      userUpdate.password = data.newPassword;
      alert('Contraseña actualizada correctamente');
      reset();
      onClose();
      return;
    }
    alert("Las contraseñas no coinciden o están vacías");
  };

  return (
    <div className='flex items-center justify-center w-full h-full bg-customColor/50 absolute top-0 right-0'>
      <form onSubmit={handleSubmit(handleSave)} className="w-1/2 bg-white p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
            Nueva contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm disabled:bg-gray-100 my-2"
            placeholder="Ingrese su nueva contraseña"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirmar contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm disabled:bg-gray-100 my-2"
            placeholder="Confirme su nueva contraseña"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 m-2 rounded"
          >
            Cancelar
          </button>
          <button
            type='submit'
            className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword