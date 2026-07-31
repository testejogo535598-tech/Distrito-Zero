let carrinho = [];

export function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
}

export function removerDoCarrinho(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
}

export function listarCarrinho() {
  return carrinho;
}

export function limparCarrinho() {
  carrinho = [];
}

export function calcularTotal() {
  return carrinho.reduce((total, item) => total + item.preco, 0);
}
