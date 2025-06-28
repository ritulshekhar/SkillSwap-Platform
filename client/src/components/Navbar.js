import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/matches" className="px-4 py-2 bg-blue-600 text-white rounded">Find Matches</Link>
      </div>
    </nav>
  );
};

export default Navbar;
