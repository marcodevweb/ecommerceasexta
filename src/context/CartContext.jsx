import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produto) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === produto.id);
      if (existing) {
        if (existing.quantidade < produto.estoque) {
          return prev.map((item) =>
            item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
          );
        } else {
          alert('Estoque máximo atingido para este produto!');
          return prev;
        }
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.quantidade < item.estoque) {
            return { ...item, quantidade: item.quantidade + 1 };
          } else {
            alert('Estoque máximo atingido!');
            return item;
          }
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
