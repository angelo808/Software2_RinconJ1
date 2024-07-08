import React from 'react';
import { Link } from 'react-router-dom';
import altaPeruvian from "../assets/logosEmpleadores/altaPeruvian.png";
import aspenMeadows from "../assets/logosEmpleadores/aspenMeadows.jpg";
import cafeRio from "../assets/logosEmpleadores/cafeRio.png";
import crystalMountain from "../assets/logosEmpleadores/crystalMountain.png";
import montageBigsky from "../assets/logosEmpleadores/montageBigsky.png";
import '../styles/catalogoEmpleadores.css';

const products = [
  { id: 1, name: 'Alta Peruvian', image: altaPeruvian, route: '/product/1' },
  { id: 2, name: 'Aspen Meadows', image: aspenMeadows, route: '/product/2' },
  { id: 3, name: 'Cafe Rio', image: cafeRio, route: '/product/3' },
  { id: 4, name: 'Crystal Mountain', image: crystalMountain, route: '/product/4' },
  { id: 5, name: 'Montage Big Sky', image: montageBigsky, route: '/product/5' },
];

const Catalog = () => {
  return (
    <div className="catalog-container">
      <h1>Lista de Empleadores Work And Travel</h1>
      <div className="catalog-grid">
        {products.map(product => (
          <Link key={product.id} to={product.route} className="catalog-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
