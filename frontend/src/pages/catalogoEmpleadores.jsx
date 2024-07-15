import React from 'react';
import { Link } from 'react-router-dom';
import altaPeruvian from "../assets/logosEmpleadores/altaPeruvian.png";
import aspenMeadows from "../assets/logosEmpleadores/aspenMeadows.jpg";
import cafeRio from "../assets/logosEmpleadores/cafeRio.png";
import crystalMountain from "../assets/logosEmpleadores/crystalMountain.png";
import montageBigsky from "../assets/logosEmpleadores/montageBigsky.png";
import SideBar from '../components/SideBar';
import axiosBase from "../axios/axiosBase";


const products = [
  { id: 1, name: 'Alta Peruvian', image: altaPeruvian, route: '/product/1' },
  { id: 2, name: 'Aspen Meadows', image: aspenMeadows, route: '/product/2' },
  { id: 3, name: 'Cafe Rio', image: cafeRio, route: '/product/3' },
  { id: 4, name: 'Crystal Mountain', image: crystalMountain, route: '/product/4' },
  { id: 5, name: 'Montage Big Sky', image: montageBigsky, route: '/product/5' },
];

// const enviarapi = async () => {
//   const response = await axiosBase.post("/resorts", {
//     name: 'Alta Peruvian',
//     jobs: [
//       {
//         title: 'Houseman',
//         description: 'Limpiar áreas comunes y baños públicos, mantener chimeneas, administrar estaciones de café, ayudar con la limpieza y responder a las solicitudes de los huéspedes.',
//         salary: '1700'
//       },
//       {
//         title: 'Prep Cook',
//         description: 'Prepare alimentos para que nuestros cocineros de línea los utilicen durante el servicio de comidas. Limpieza diaria de cocina. Se le puede pedir que limpie los platos según sea necesario.',
//         salary: '2000'
//       }
//     ]
//   });
//   const response1 = await axiosBase.post("/resorts", {
//     name: 'Aspen Meadows Resort',
//     jobs: [
//       {
//         title: 'Bellperson',
//         description: 'Debe ayudar a todos los huéspedes en todo momento respondiendo preguntas, llevando el equipaje de los huéspedes y brindando un excelente servicio al cliente.',
//         salary: '2400'
//       },
//       {
//         title: 'F&B Attendant',
//         description: 'El asistente de F&B debe poder tomar pedidos, describir el menú y entregar comida con éxito. Este trabajador debe tener excelentes habilidades de servicio al cliente.  Realice cualquier otra tarea relacionada según se le indique. También se puede solicitar que este puesto cubra el stand del anfitrión o las mesas del autobús.',
//         salary: '2600'
//       }
//     ]
//   });
//   const response2 = await axiosBase.post("/resorts", {
//     name: 'Cafe Rio Resort',
//     jobs: [
//       {
//         title: 'Line Cook',
//         description: 'Prepara y almacena alimentos y otros suministros necesarios. Prepara alimentos cortando, picando, mezclando y preparando salsas. Cocina alimentos asados, fritos, salteados y otros métodos de cocción según recetas y estándares específicos. Otras tareas de cocina y restaurante que se le asignen.',
//         salary: '2300'
//       },
//       {
//         title: 'Prep Cook',
//         description: 'Prepare alimentos para que nuestros cocineros de línea los utilicen durante el servicio de comidas. Limpieza diaria de cocina. Se le puede pedir que limpie los platos según sea necesario.',
//         salary: '2000'
//       }
//     ]
//   });
//   const response3 = await axiosBase.post("/resorts", {
//     name: 'Crystal Mountain Resort',
//     jobs: [
//       {
//         title: 'SnowSports Desk Attendant',
//         description: 'Nuestro departamento de deportes de nieve es el corazón de las actividades invernales, brindando servicios de esquiador a nuestros huéspedes. En este puesto, los participantes ayudarán a los huéspedes con las reservas y los procedimientos de check-in, prepararán tarjetas de lecciones, promoverán todos los programas y eventos de deportes de nieve, la seguridad y la responsabilidad del esquiador.',
//         salary: '1800'
//       },
//       {
//         title: 'Bellperson',
//         description: 'Debe ayudar a todos los huéspedes en todo momento respondiendo preguntas, llevando el equipaje de los huéspedes y brindando un excelente servicio al cliente.',
//         salary: '2000'
//       }
//     ]
//   });
//   const response4 = await axiosBase.post("/resorts", {
//     name: 'Montage Big Sky',
//     jobs: [
//       {
//         title: 'Ski vallet Attendant',
//         description: 'Ayudar a los huéspedes a conseguir botas de esquí, botas de snowboard y equipo, darles la bienvenida al área y organizar el equipo. Se proporciona un uniforme. Los participantes deberán proporcionar calzado resistente al agua. Se proporcionan comidas por turno.',
//         salary: '2040'
//       },
//       {
//         title: 'Spa Attendant',
//         description: 'Dar la bienvenida a los huéspedes, recorrer las instalaciones del spa, promocionar los servicios, reabastecerse y mantener el lugar ordenado. Mantener las áreas organizadas en todo momento y reponer toallas. Se proporciona un uniforme. Los participantes deberán presentar zapatillas deportivas negras. Se proporcionan comidas por turno.',
//         salary: '2280'
//       }
//     ]
//   });
// }

const Catalog = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <SideBar />
      </div>
      <div style={{ width: '80%', padding: '20px', overflowY: 'auto' }}>
        <h1 className='text-5xl font-bold text-marron'>Lista de Empleadores Work And Travel</h1>
        <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
          <div className='grid grid-cols-3 gap-4'>
          {products.map(product => (
            <Link key={product.id} to={product.route} >
              <img src={product.image} alt={product.name} className='w-full h-48 object-fit rounded-md' />
              <h2 className='mt-2 text-xl font-bold text-marron'>{product.name}</h2>
            </Link>
          ))}
        </div>
        {/* <button onClick={enviarapi}>
          enviar api
        </button> */}
      </div>
    </div>
  );
}

export default Catalog;
