import { Link, useLocation } from "react-router-dom";


const SideBarEmbajada = () => {
    const path = useLocation().pathname;

    return (
        <aside className='h-max flex flex-col bg-[#D1C8C1] text-center justify-around py-24'>
            <Link to="/test-160" className={`mb-8 font-semibold text-lg ${path == '/test-160' ? 'text-marronClaro' : 'text-[#31241E]'}`}>TEST-160</Link>
            <Link to="/mis-foros-embassy" className="mt-8">IR AL FORO</Link>
        </aside>
    );
}

export default SideBarEmbajada;