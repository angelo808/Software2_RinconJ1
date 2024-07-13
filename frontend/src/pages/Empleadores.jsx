import React from 'react';
import { useParams } from 'react-router-dom';
import altaPeruvian from "../assets/logosEmpleadores/altaPeruvian.png";
import aspenMeadows from "../assets/logosEmpleadores/aspenMeadows.jpg";
import cafeRio from "../assets/logosEmpleadores/cafeRio.png";
import crystalMountain from "../assets/logosEmpleadores/crystalMountain.png";
import montageBigsky from "../assets/logosEmpleadores/montageBigsky.png";
import SideBar from '../components/SideBar';

import '../styles/empleadores.css';


const productDetails = {
    1: { 
        name: 'Alta Peruvian Lodge', 
        description: 'Alta is one of the oldest ski areas in the U.S. and has a skiable area of 2,614 acres or 10.58 km2.', 
        image: altaPeruvian, 
        transportation: {
          title: 'Located in the Alta Ski Area, it is a European-Style all inclusive ski resort between the Wasatch Mountains.',
          content: 'This lodge has the largest outdoor heated pool in the Alta area!',
          link: 'https://sites.google.com/workuse.com/2024alta-peruvian-lodge',
        },
        accessibility: {
          title: 'Accessibility',
          walkingDistance: 'Fitness Center, and Post Office.',
          publicTransport: 'Supermarket, Banks, Shopping Mall/Plaza, Movie Theater, and Laundry Facilities. '
        },
        weatherFacts: {
          title: 'Weather Facts',
          facts: [
            'Lima altitude is 155 m.a.s.l*',
            'Alta altitude is 2,610 m.a.s.l*',
            'In winter you might experience: -15 ºC / 0 ºC'
          ],
        }
      },
      2: { 
        name: 'Aspen Meadows Resort', 
        description: 'Aspen Meadows Resort is a secluded sanctuary integrating art and landscape architecture for a rejuvenating experience.', 
        image: aspenMeadows, 
        transportation: {
          title: 'Local Transportation',
          content: 'Public transportation is available! Free public transportation within Snowmass and Aspen.',
          link: 'https://www.https://sites.google.com/workuse.com/2024aspen-meadows.com/',
        },
        accessibility: {
          title: 'Accessibility',
          walkingDistance: 'Supermarket, Banks, Fitness Center, Laundry Facilities and Post Office.',
          publicTransport: 'Shopping Mall/Plaza and Movie Theater.'
        },
        weatherFacts: {
          title: 'Weather Facts',
          facts: [
            'Lima altitude is 155 m.a.s.l*',
            'Aspen altitude is 2,438 m.a.s.l*',
            'In winter you might experience: 0 ºC / -30 ºC'
          ],

        }
      },
      3: { 
        name: 'Cafe Rio Resort', 
        description: 'A place where culinary magic happens! Its where creativity meets craftsmanship, resulting in unforgettable culinary delights elevating the dining experience.', 
        image: cafeRio, 
        transportation: {
          title: 'Local Transportation',
          content: 'Ciltylink in Kootenai Country is a small urban system serving Coeur dAlene and other cities. ',
          link: 'https://www.https://sites.google.com/workuse.com/cafe-rio-mexican-grill-cda?usp=sharing.com/',
        },
        accessibility: {
          title: 'Accessibility',
          walkingDistance: 'Supermarket, Banks, and Post Office.',
          publicTransport: 'Restaurants, Supermarket, Shopping mall.'
        },
        weatherFacts: {
          title: 'Weather Facts',
          facts: [
            'Lima altitude is 155 m.a.s.l*',
            'Cafe Rio altitude is 667 m.a.s.l*',
            'In winter you might experience: -15 ºC / 5 ºC'
          ],
        }
      },
    4:{ 
        name: 'Crystal Mountain Resort', 
        description: 'Crystal Mountain is a fantastic destination! With its combination of skiing, golfing, and spa amenities, there is something for everyone to enjoy year-round. It offers beautiful natural surroundings and plenty of outdoor activities.', 
        image: crystalMountain, 
        transportation: {
          title: 'Local Transportation and Transportation provided by the employer',
          content: 'Public transportation is available! Free public transportation within Snowmass and Aspen. Check the link for more information.',
          link: 'https://sites.google.com/workuse.com/crystal-mountain-resort/information',
        },
        accessibility: {
          title: 'Accessibility',
          walkingDistance: 'Fitness Center, Laundry Facilities, and Post Office.',
          publicTransport: 'Supermarket, Bank, Shopping Mall/Center, and Movie Theater.'
        },
        weatherFacts: {
          title: 'Weather Facts',
          facts: [
            'Lima altitude is 155 m.a.s.l*',
            'Crystal altitude is 345 m.a.s.l*',
            'In winter you might experience: -10 ºC / 10 ºC'
          ],
        }
      },

    5: { 
        name: 'Montage Big Sky', 
        description: 'Montage Big Sky, where adventure meets luxury. With ski-in/ski-out access, world-class dining, and a variety of winter activities, Montage Big Sky offers a one-of-a-kind experience.', 
        image: montageBigsky, 
        transportation: {
          title: 'Local Transportation',
          content: 'In Big Sky: Skyline Bus System and Bozeman: Streamline Bus',
          link: 'https://sites.google.com/workuse.com/2024montage-big-sky-resort',
        },
        accessibility: {
          title: 'Accessibility',
          walkingDistance: 'Supermarkets, Banks, Shopping Mall/Plaza, Movie Theater, Fitness Center, Laundry Facilities, and Post Office.',
          publicTransport: 'Shopping Mall/Plaza and Movie Theater.'
        },
        weatherFacts: {
          title: 'Weather Facts',
          facts: [
            'Lima altitude is 155 m.a.s.l*',
            'Big Sky altitude is 2,200 m.a.s.l*',
            'In winter you might experience: -10 ºC / 0 ºC'
          ],
        }
      },
};

const puestosDisponibles ={
    1: {
        puesto1 : "Houseman",
        descripcion1: "Limpiar áreas comunes y baños públicos, mantener chimeneas, administrar estaciones de café, ayudar con la limpieza y responder a las solicitudes de los huéspedes.",
        requisitos1:{
            ingles : "mayor a 4",
            edad : "Mayor de 18 años",
            remuneracion : "$1700 al mes"
        },
        puesto2 : "Prep Cook",
        descripcion2: "Prepare alimentos para que nuestros cocineros de línea los utilicen durante el servicio de comidas. Limpieza diaria de cocina. Se le puede pedir que limpie los platos según sea necesario.",
        requisitos2:{
            ingles : "4",
            edad : "No hay restricción",
            remuneracion : "$2000 al mes"
        }
    },

    2: {
        puesto1 : "Bellperson",
        descripcion1: "Debe ayudar a todos los huéspedes en todo momento respondiendo preguntas, llevando el equipaje de los huéspedes y brindando un excelente servicio al cliente.",
        requisitos1 : {
            ingles : "4",
            edad : "Mayor de 21 años",
            remuneracion : "$2400 al mes"
        },
        puesto2 : "F&B Attendant",
        descripcion2: "El asistente de F&B debe poder tomar pedidos, describir el menú y entregar comida con éxito. Este trabajador debe tener excelentes habilidades de servicio al cliente.  Realice cualquier otra tarea relacionada según se le indique. También se puede solicitar que este puesto cubra el stand del anfitrión o las mesas del autobús.",
        requisitos2:{
            ingles : "Mayor a 4",
            edad : "No hay restricción",
            remuneracion : "$2600 al mes"
        },
    },
    
    3: {
        puesto1 : "Line Cook",
        descripcion1: "Prepara y almacena alimentos y otros suministros necesarios. Prepara alimentos cortando, picando, mezclando y preparando salsas. Cocina alimentos asados, fritos, salteados y otros métodos de cocción según recetas y estándares específicos. Otras tareas de cocina y restaurante que se le asignen.",
        requisitos1:{
            ingles : "mayor a 4",
            edad : "No hay restricción",
            remuneracion : "$2300 al mes"
        },
        puesto2 : "Prep Cook",
        descripcion2: "Prepare alimentos para que nuestros cocineros de línea los utilicen durante el servicio de comidas. Limpieza diaria de cocina. Se le puede pedir que limpie los platos según sea necesario.",
        requisitos2:{
            ingles : "mayor a 4",
            edad : "No hay restricción",
            remuneracion : "$2000 al mes"
        }
    },
    4: {
        puesto1 : "SnowSports Desk Attendant",
        descripcion1: "Nuestro departamento de deportes de nieve es el corazón de las actividades invernales, brindando servicios de esquiador a nuestros huéspedes. En este puesto, los participantes ayudarán a los huéspedes con las reservas y los procedimientos de check-in, prepararán tarjetas de lecciones, promoverán todos los programas y eventos de deportes de nieve, la seguridad y la responsabilidad del esquiador.",
        requisitos1:{
            ingles : "mayor a 4",
            edad : "Mayor de 18 años",
            remuneracion : "$1800 al mes"
        },
        requisitos2:{
        puesto2 : "Bellperson",
        descripcion2: "Debe ayudar a todos los huéspedes en todo momento respondiendo preguntas, llevando el equipaje de los huéspedes y brindando un excelente servicio al cliente.",
            ingles : "4",
            edad : "Mayor de 21 años",
            remuneracion : "$2000 al mes"
        }
    },
    5: {
        puesto1 : "Ski vallet Attendant",
        descripcion1: "Ayudar a los huéspedes a conseguir botas de esquí, botas de snowboard y equipo, darles la bienvenida al área y organizar el equipo. Se proporciona un uniforme. Los participantes deberán proporcionar calzado resistente al agua. Se proporcionan comidas por turno.",
        requisitos1:{
            ingles : "mínimo 4",
            edad : "Mayor de 18 años",
            remuneracion : "$2040 al mes"
        },
        puesto2 : "Spa Attendant",
        descripcion2: "Dar la bienvenida a los huéspedes, recorrer las instalaciones del spa, promocionar los servicios, reabastecerse y mantener el lugar ordenado. Mantener las áreas organizadas en todo momento y reponer toallas. Se proporciona un uniforme. Los participantes deberán presentar zapatillas deportivas negras. Se proporcionan comidas por turno.",
        requisitos2:{
            ingles : "4",
            edad : "No hay restricción",
            remuneracion : "$2280 al mes"
        }
    }
}


const Product = () => {
  const { id } = useParams();
  const product = productDetails[id];
  const trabajos = puestosDisponibles[id]

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%'}}>
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <SideBar />
      </div>
    
    <div className="product-container">
      <div className="product-header">
        <img src={product.image} alt={product.name} className="product-image"/>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-details">
        <div className="section">
          <h2>{product.transportation.title}</h2>
          <p>{product.transportation.content}</p>
          <h1>Link de acceso al empleador:</h1>
          <a href={product.transportation.link} target="_blank" rel="noopener noreferrer">{product.transportation.link}</a>
          <p><em>{product.transportation.note}</em></p>
        </div>

        <div className="section">
          <h2>{product.accessibility.title}</h2>
          <ul>
            <li><strong>Walking distance:</strong> {product.accessibility.walkingDistance}</li>
            <li><strong>Public transportation:</strong> {product.accessibility.publicTransport}</li>
          </ul>
        </div>

        <div className="section">
          <h2>{product.weatherFacts.title}</h2>
          <ul>
            {product.weatherFacts.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
          <p><em>{product.weatherFacts.note}</em></p>
        </div>
        <div className='section'>
            <h1>Puestos de trabajo disponible!</h1>
            <h2>{trabajos.puesto1}</h2>
            <h3>{trabajos.descripcion1}</h3>
            <ul>
                <li><strong>Nivel Mínimo Ingles : </strong>{trabajos.requisitos1.ingles}</li>
                <li><strong>Edad necesaria : </strong>{trabajos.requisitos1.edad}</li>
                <li><strong>Remuneración : </strong>{trabajos.requisitos1.remuneracion}</li>
            </ul>
            <h2>{trabajos.puesto2}</h2>
            <h3>{trabajos.descripcion2}</h3>
            <ul>
                <li><strong>Nivel Mínimo Ingles : </strong>{trabajos.requisitos2.ingles}</li>
                <li><strong>Edad necesaria : </strong>{trabajos.requisitos2.edad}</li>
                <li><strong>Remuneración : </strong>{trabajos.requisitos2.remuneracion}</li>
            </ul>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Product;
