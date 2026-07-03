import { Link } from 'react-router-dom';
import { Ghost, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-8">
        <Ghost className="w-32 h-32 text-indigo-100 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-indigo-600">404</span>
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Página não encontrada
      </h1>
      <p className="text-slate-500 text-lg max-w-md mx-auto mb-10">
        A página que você está procurando pode ter sido removida, mudou de nome, ou está temporariamente indisponível.
      </p>
      
      <Link 
        to="/" 
        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:-translate-y-1"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Voltar para a Loja
      </Link>
    </div>
  );
};

export default NotFound;
