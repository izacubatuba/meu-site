// Função para carregar produtos do localStorage e exibir na página
function carregarProdutos() {
    const container = document.getElementById("productsContainer");
    
    // Tenta recuperar os produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Verifica se há produtos salvos
    if (produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    container.innerHTML = ""; // Limpa o container antes de renderizar

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${produto.imagem || 'sem-imagem.jpg'}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p class="codigo-barras">Código: ${produto.codigoBarras}</p>
            <a href="#" class="btn-editar" onclick="editarProduto('${produto.codigoBarras}')">Editar</a>
            <a href="#" class="btn-excluir" onclick="confirmarExclusao('${produto.codigoBarras}')">Excluir</a>
        `;

        container.appendChild(card);
    });
}

// Função para editar um produto
function editarProduto(codigo) {
    window.location.href = `editar_produto.html?codigoBarras=${codigo}`;
}

// Função para confirmar exclusão
function confirmarExclusao(codigo) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        excluirProduto(codigo);
    }
}

// Função para excluir um produto
function excluirProduto(codigo) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter(produto => produto.codigoBarras !== codigo);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
}

// Executa o carregamento dos produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
