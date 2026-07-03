import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 animate-pulse flex flex-col h-full gap-4">
    <div className="w-full aspect-[4/3] bg-slate-200 rounded-xl"></div>
    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
    <div className="mt-auto flex flex-col gap-2">
      <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
      <div className="flex gap-2">
        <div className="h-9 bg-slate-200 rounded-xl w-1/2"></div>
        <div className="h-9 bg-slate-200 rounded-xl w-1/2"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { data: produtos, loading, error, refetch } = useFetch('http://localhost:3001/produtos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  
  const handleUpdate = () => {
    refetch();
  };

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
      <PackageSearch className="w-16 h-16 mb-4 text-red-400" />
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Ops, algo deu errado!</h2>
      <p className="text-slate-500">{error}</p>
    </div>
  );

  let filteredProducts = produtos ? [...produtos] : [];

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => Number(a.preco) - Number(b.preco));
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => Number(b.preco) - Number(a.preco));
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Nossos Produtos
          </h1>
          <p className="text-slate-500 text-lg">Encontre as melhores ofertas e produtos incríveis.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-56">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none font-medium text-slate-700 shadow-sm cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Ordenar (Padrão)</option>
              <option value="asc">Menor Preço</option>
              <option value="desc">Maior Preço</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm"
        >
          <PackageSearch className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">Nenhum produto encontrado.</h3>
          <p className="text-slate-500 mt-2">Tente buscar por um termo diferente.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((produto) => (
            <motion.div key={produto.id} variants={itemVariants} layout>
              <ProductCard produto={produto} onUpdate={handleUpdate} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
