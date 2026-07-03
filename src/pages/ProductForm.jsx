import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, X, AlertCircle, PackagePlus, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { createProduto, updateProduto, getProdutoById } from '../services/api';

const ProductForm = ({ modo }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(modo === 'edicao');
  const [shake, setShake] = useState(false);

  const nomeRef = useRef(null);
  const descricaoRef = useRef(null);
  const precoRef = useRef(null);
  const imagemRef = useRef(null);
  const estoqueRef = useRef(null);

  useEffect(() => {
    if (modo === 'edicao' && id) {
      const fetchProduto = async () => {
        try {
          const data = await getProdutoById(id);
          setFormData({
            nome: data.nome,
            descricao: data.descricao,
            preco: data.preco.toString(),
            imagem: data.imagem,
            estoque: data.estoque.toString()
          });
        } catch (error) {
          toast.error('Erro ao buscar dados do produto para edição.');
          navigate('/');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProduto();
    }
  }, [modo, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória.';
    
    if (!formData.preco.toString().trim()) {
      newErrors.preco = 'Preço é obrigatório.';
    } else if (isNaN(Number(formData.preco)) || Number(formData.preco) < 0) {
      newErrors.preco = 'Insira um valor válido maior ou igual a zero.';
    }

    if (!formData.imagem.trim()) newErrors.imagem = 'URL da imagem é obrigatória.';
    
    if (!formData.estoque.toString().trim()) {
      newErrors.estoque = 'Estoque é obrigatório.';
    } else if (!Number.isInteger(Number(formData.estoque)) || Number(formData.estoque) < 0) {
      newErrors.estoque = 'Insira um número inteiro válido e positivo.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);

      if (newErrors.nome) nomeRef.current.focus();
      else if (newErrors.descricao) descricaoRef.current.focus();
      else if (newErrors.preco) precoRef.current.focus();
      else if (newErrors.imagem) imagemRef.current.focus();
      else if (newErrors.estoque) estoqueRef.current.focus();
      
      toast.error('Por favor, corrija os erros no formulário.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const dataToSave = {
      ...formData,
      preco: Number(formData.preco),
      estoque: Number(formData.estoque)
    };

    try {
      if (modo === 'edicao') {
        await updateProduto(id, dataToSave);
        toast.success('Produto atualizado com sucesso!');
      } else {
        await createProduto(dataToSave);
        toast.success('Produto cadastrado com sucesso!');
      }
      navigate('/');
    } catch (error) {
      toast.error(`Erro ao ${modo === 'edicao' ? 'editar' : 'cadastrar'} produto.`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return (
    <div className="max-w-2xl mx-auto p-12 text-center animate-pulse">
      <div className="h-10 bg-slate-200 rounded w-1/2 mx-auto mb-10"></div>
      <div className="space-y-6">
        <div className="h-14 bg-slate-200 rounded-xl"></div>
        <div className="h-24 bg-slate-200 rounded-xl"></div>
        <div className="h-14 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={false}
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
          {modo === 'edicao' ? <Pencil className="w-6 h-6" /> : <PackagePlus className="w-6 h-6" />}
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {modo === 'edicao' ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-slate-700 font-bold mb-2">Nome do Produto</label>
          <input
            type="text"
            name="nome"
            ref={nomeRef}
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Teclado Mecânico"
            className={`w-full p-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 transition-all ${
              errors.nome ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1.5 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.nome}</p>}
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">Descrição Detalhada</label>
          <textarea
            name="descricao"
            ref={descricaoRef}
            value={formData.descricao}
            onChange={handleChange}
            rows="3"
            placeholder="Descreva as características do produto..."
            className={`w-full p-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 transition-all resize-none ${
              errors.descricao ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          ></textarea>
          {errors.descricao && <p className="text-red-500 text-sm mt-1.5 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.descricao}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-slate-700 font-bold mb-2">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              name="preco"
              ref={precoRef}
              value={formData.preco}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full p-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 transition-all ${
                errors.preco ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.preco && <p className="text-red-500 text-sm mt-1.5 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.preco}</p>}
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">Estoque Inicial</label>
            <input
              type="number"
              name="estoque"
              ref={estoqueRef}
              value={formData.estoque}
              onChange={handleChange}
              placeholder="0"
              className={`w-full p-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 transition-all ${
                errors.estoque ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.estoque && <p className="text-red-500 text-sm mt-1.5 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.estoque}</p>}
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">URL da Imagem</label>
          <input
            type="text"
            name="imagem"
            ref={imagemRef}
            value={formData.imagem}
            onChange={handleChange}
            placeholder="https://..."
            className={`w-full p-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-4 transition-all ${
              errors.imagem ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.imagem && <p className="text-red-500 text-sm mt-1.5 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {errors.imagem}</p>}
        </div>

        <div className="flex gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 mr-2" /> Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save className="w-5 h-5 mr-2" /> Salvar</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;
