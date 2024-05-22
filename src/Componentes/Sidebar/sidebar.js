import React from 'react';
import './sidebar.css';

function Sidebar({items}) {
    return (
        <aside className="sidebar">
          <ul>
            {items.map((item, index) => (
              <li key={index}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </aside>
      );
    }

export default Sidebar;
