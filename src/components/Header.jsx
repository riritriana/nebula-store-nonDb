import { House, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-slate-100 p-4 shadow-lg">
      <div className="flex w-1/2  items-center gap-1">
        <img src="vite.svg" alt="" />
        <h1>Nebula Project</h1>
      </div>
      <nav className="flex w-1/2">
        <ul className=" w-full flex justify-evenly ">
          <li className="flex items-center gap-2">
            <House />
            <Link to="/"> Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <Info />
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
