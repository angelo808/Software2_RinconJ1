import { Link, useLocation } from "react-router-dom";


const SideBar = () => {
    const path = useLocation().pathname;

    return (
        <aside className='h-full flex flex-col bg-[#D1C8C1] justify-between text-center py-24'>
            <Link to="/empleador" className={`font-semibold text-lg ${path == '/empleador' || path == '/empleador/puestos' ? 'text-marronClaro' : 'text-[#31241E]'}`}>INFORMACIÓN</Link>
            <Link to="/empleador/entrevista" className={`font-semibold text-lg ${path == '/empleador/entrevista' ? 'text-marronClaro' : 'text-[#31241E]'}`}>ENTREVISTA</Link>
            <Link to="/empleador/test-160" className={`font-semibold text-lg ${path == '/empleador/test160' ? 'text-marronClaro' : 'text-[#31241E]'}`}>TEST-160</Link>
            <Link to="/mi-calendario" className='font-semibold text-lg text-[#31241E]'>REGISTRO</Link>
            <Link to="/empleador/seleccionar-puesto" className={`font-semibold text-lg ${path == '/empleador/seleccionar-puesto' ? 'text-marronClaro' : 'text-[#31241E]'}`}>SELECCIONAR PUESTO</Link>
            <Link to="/empleador/documentos" className={`font-semibold text-lg ${path == '/empleador/documentos' ? 'text-marronClaro' : 'text-[#31241E]'}`}>DOCUMENTOS</Link>
        </aside>
    );
}

export default SideBar;