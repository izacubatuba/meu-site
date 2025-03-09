// Função para carregar as informações do produto a ser editado
function carregarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoBarras = urlParams.get('codigoBarras');

    if (codigoBarras) {
        fetch(`http://127.0.0.1:5000/api/produto/${codigoBarras}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }
                return response.json();
            })
            .then(produto => {
                document.getElementById('productName').value = produto.descricao_produto;
                document.getElementById('productCode').value = produto.cod_barras;

                if (produto.imagem) {
                    document.getElementById('productImageUrl').value = produto.imagem;
                }
            })
            .catch(error => {
                alert("Produto não encontrado!");
                window.location.href = 'index.html'; // Redireciona caso o produto não seja encontrado
            });
    }
}

// Função para salvar as alterações no produto na API
function salvarAlteracoes(event) {
    event.preventDefault();

    const nome = document.getElementById('productName').value;
    const codigoBarras = document.getElementById('productCode').value;

    let imagem = '';
    const imageOption = document.querySelector('input[name="imageOption"]:checked').value;

    if (imageOption === 'upload') {
        const imagemFile = document.getElementById('productImage').files[0];
        if (imagemFile) {
            imagem = URL.createObjectURL(imagemFile); // Cria uma URL temporária para a imagem
        }
    } else if (imageOption === 'link') {
        imagem = document.getElementById('productImageUrl').value;
    }

    // Criando objeto com os dados atualizados
    const produtoAtualizado = {
        descricao_produto: nome,
        cod_barras: codigoBarras,
        imagem: imagem || undefined, // Se não houver imagem, mantém o valor antigo
    };

    // Enviando requisição para atualizar na API
    fetch(`http://127.0.0.1:5000/api/produto/${codigoBarras}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            alert("Erro ao atualizar o produto: " + data.erro);
        } else {
            alert("Produto alterado com sucesso!");
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        alert("Erro ao atualizar o produto.");
        console.error(error);
    });
}

// Escuta o envio do formulário
document.getElementById('productForm').addEventListener('submit', salvarAlteracoes);

// Carrega as informações do produto ao carregar a página
window.onload = carregarProduto;
