import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded hover:bg-gray-200 transition ${
      location.pathname === path ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'
    }`;

  return (
    <nav className="flex gap-4 border-b p-4 bg-white shadow-sm sticky top-0 z-10">
      <Link to="/invited" className={linkClass('/invited')}>Convidados</Link>
      <Link to="/accepted" className={linkClass('/accepted')}>Aceitos</Link>
      <Link to="/declined" className={linkClass('/declined')}>Recusados</Link>
      <Link to="/new" className={linkClass('/new')}>Novo</Link>
    </nav>
  );
}
