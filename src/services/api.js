const BASE_URL = 'http://localhost:3001';

export const getProdutos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProdutoById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/produtos/${id}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createProduto = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduto = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir produto');
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
