import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, PlusCircle, Store } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);

  const navLinks = [
    { path: '/', label: 'Loja' },
    { path: '/cadastro', label: 'Cadastrar', icon: <PlusCircle className="w-4 h-4 mr-1.5" /> }
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
            MiniStore
          </span>
        </Link>
        
        <nav className="flex items-center space-x-1 sm:space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {link.icon && link.icon}
                <span>{link.label}</span>
              </Link>
            )
          })}
          
          <div className="w-px h-6 bg-slate-200 mx-1 sm:mx-2"></div>

          <Link 
            to="/carrinho" 
            className={`relative flex items-center px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              location.pathname === '/carrinho'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <span>Carrinho</span>
            
            <AnimatePresence mode="popLayout">
              {totalItems > 0 && (
                <motion.span 
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                  exit={{ scale: 0.5, opacity: 0, y: -10 }}
                  className="absolute -top-1 -right-1 sm:top-0 sm:-right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
