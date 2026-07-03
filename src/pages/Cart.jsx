import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, AlertTriangle, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal } = useContext(CartContext);

  const handleIncrease = (id, current, max) => {
    if (current >= max) {
      toast.error('Estoque máximo atingido para este item!', { icon: '⚠️' });
    } else {
      increaseQuantity(id);
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm mt-8"
      >
        <ShoppingBag className="w-20 h-20 mx-auto text-slate-200 mb-6" />
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Seu carrinho está vazio</h2>
        <p className="text-slate-500 mb-8 text-lg">Parece que você ainda não adicionou nada aqui.</p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          Começar a comprar <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Seu Carrinho</h1>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          <AnimatePresence initial={false}>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, scale: 0.95, overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center flex-1 w-full">
                    <img src={item.imagem} alt={item.nome} className="w-24 h-24 object-cover rounded-2xl border border-slate-100 bg-white shadow-sm" />
                    <div className="ml-6 flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{item.nome}</h3>
                      <div className="flex items-center gap-2 mb-2 text-sm text-slate-500">
                        <span>Estoque máx: {item.estoque}</span>
                        {item.quantidade >= item.estoque && (
                          <span className="flex items-center text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md text-xs">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Limite atingido
                          </span>
                        )}
                      </div>
                      <p className="text-indigo-600 font-black text-lg">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200/60">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-2 bg-white rounded-lg hover:bg-slate-50 text-slate-700 font-bold disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                        disabled={item.quantidade <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-slate-800 tabular-nums">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id, item.quantidade, item.estoque)}
                        className={`p-2 bg-white rounded-lg text-slate-700 font-bold transition-all shadow-sm ${
                          item.quantidade >= item.estoque 
                            ? 'opacity-40 cursor-not-allowed bg-slate-50' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="font-black text-xl w-32 text-right text-slate-800">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco * item.quantidade)}
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all"
                      title="Remover Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 gap-6">
          <Link to="/" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Continuar comprando
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider block mb-1">Total da Compra</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getTotal())}
              </span>
            </div>
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
