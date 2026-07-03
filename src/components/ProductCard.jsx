import { Link } from 'react-router-dom';
import { deleteProduto } from '../services/api';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Eye, PackageX } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ produto, onUpdate }) => {
  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir ${produto.nome}?`)) {
      try {
        await deleteProduto(produto.id);
        toast.success(`${produto.nome} excluído!`);
        if (onUpdate) onUpdate();
      } catch (error) {
        toast.error('Erro ao excluir produto.');
      }
    }
  };

  const isEsgotado = Number(produto.estoque) === 0;

  return (
    <motion.div 
      layout
      className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
        <img 
          src={produto.imagem} 
          alt={produto.nome} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {isEsgotado && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="bg-red-500 text-white px-4 py-1.5 rounded-full font-bold tracking-wide flex items-center gap-1.5 shadow-lg">
              <PackageX className="w-4 h-4" /> Esgotado
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">{produto.nome}</h3>
        <p className="text-2xl font-black text-indigo-600 mb-4 tracking-tight">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
        </p>
        
        <div className="mt-auto flex flex-col gap-2">
          {!isEsgotado ? (
            <Link
              to={`/produto/${produto.id}`}
              className="w-full flex items-center justify-center py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Link>
          ) : (
            <div className="w-full py-2.5 bg-slate-100 text-slate-400 font-semibold rounded-xl text-center cursor-not-allowed border border-slate-200">
              Indisponível
            </div>
          )}
          
          <div className="flex justify-between gap-2 mt-1">
            <Link
              to={`/editar/${produto.id}`}
              className="flex-1 flex items-center justify-center py-2 bg-slate-50 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" /> Editar
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Excluir
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
