import React from 'react';
import { Link } from 'react-router-dom';
import altaPeruvian from "../assets/logosEmpleadores/altaPeruvian.png";
import aspenMeadows from "../assets/logosEmpleadores/aspenMeadows.jpg";
import cafeRio from "../assets/logosEmpleadores/cafeRio.png";
import crystalMountain from "../assets/logosEmpleadores/crystalMountain.png";
import montageBigsky from "../assets/logosEmpleadores/montageBigsky.png";
import SideBar from '../components/SideBar';

const products = [
  { id: 1, name: 'Alta Peruvian', image: altaPeruvian, route: '/product/1' },
  { id: 2, name: 'Aspen Meadows', image: aspenMeadows, route: '/product/2' },
  { id: 3, name: 'Cafe Rio', image: cafeRio, route: '/product/3' },
  { id: 4, name: 'Crystal Mountain', image: crystalMountain, route: '/product/4' },
  { id: 5, name: 'Montage Big Sky', image: montageBigsky, route: '/product/5' },
];

const Catalog = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <SideBar />
      </div>
      <div style={{ width: '80%', padding: '20px', overflowY: 'auto' }}>
        <h1>Lista de Empleadores Work And Travel</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map(product => (
            <Link key={product.id} to={product.route} style={{ flex: '1 1 calc(33.333% - 20px)', boxSizing: 'border-box', textAlign: 'center' }}>
              <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <h2 style={{ marginTop: '10px', fontSize: '1.2em' }}>{product.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
