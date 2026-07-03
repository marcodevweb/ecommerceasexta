import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import useFetch from '../hooks/useFetch';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: produto, loading, error } = useFetch(`http://localhost:3001/produtos/${id}`);
  const { cart, addToCart } = useContext(CartContext);

  if (loading) return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-pulse">
      <div className="md:w-1/2 bg-slate-200"></div>
      <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
        <div className="h-10 bg-slate-200 rounded-xl w-3/4"></div>
        <div className="h-24 bg-slate-200 rounded-xl w-full"></div>
        <div className="h-12 bg-slate-200 rounded-xl w-1/3"></div>
        <div className="h-14 bg-slate-200 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  );

  if (error || !produto) return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Produto não encontrado!</h2>
      <p className="text-slate-500 mb-8">O item que você procurava não existe ou foi removido.</p>
      <button 
        onClick={() => navigate('/')} 
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Voltar para a Loja
      </button>
    </div>
  );

  const cartItem = cart.find(item => item.id === produto.id);
  const isEsgotado = Number(produto.estoque) === 0;
  const reachedMaxStock = cartItem && cartItem.quantidade >= Number(produto.estoque);
  const isDisabled = isEsgotado || reachedMaxStock;

  const handleAddToCart = () => {
    addToCart(produto);
    toast.success(`${produto.nome} adicionado ao carrinho!`, {
      icon: '🛒',
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para produtos
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-slate-50 relative p-8 flex items-center justify-center">
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className="w-full h-auto max-h-[500px] object-contain rounded-2xl drop-shadow-xl" 
          />
          {isEsgotado && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-xl tracking-widest shadow-xl uppercase transform -rotate-12">
                Esgotado
              </span>
            </div>
          )}
        </div>
        
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="mb-2">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              Cód: {produto.id.padStart(4, '0')}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {produto.nome}
          </h1>
          
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            {produto.descricao}
          </p>
          
          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-end gap-2 mb-2">
              <p className="text-4xl font-black text-indigo-600 tracking-tighter">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
              </p>
              <span className="text-slate-500 font-medium mb-1.5 text-sm">à vista</span>
            </div>
            <p className={`text-sm font-semibold flex items-center gap-1.5 ${isEsgotado ? 'text-red-500' : 'text-emerald-600'}`}>
              <ShieldCheck className="w-4 h-4" /> 
              {isEsgotado ? 'Sem estoque no momento' : `${produto.estoque} unidades disponíveis no estoque`}
            </p>
          </div>
          
          <div className="mt-auto flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isDisabled}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-lg ${
                isDisabled
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isEsgotado ? 'Produto Esgotado' : reachedMaxStock ? 'Limite Atingido' : 'Adicionar ao Carrinho'}
            </button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 font-medium mt-4">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Entrega rápida
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Compra segura
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
