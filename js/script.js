// Prefixo para o nome do projeto
const CHAVE_PROJETO = 'financeTrack';

// Variáveis globais para armazenar os totais
let totalDespesas = 0;
let totalMetas = 0;
let fundoTotal = 0;
let totalLazer = 0;
let salarioTotal = 0;

// Função para atualizar os percentuais
function atualizarPercentuais() {
    if (salarioTotal <= 0) return;

    const percentualDespesas = (totalDespesas / salarioTotal) * 100;
    const percentualMetas = (totalMetas / salarioTotal) * 100;
    const percentualEmergencia = (fundoTotal / salarioTotal) * 100;
    const percentualLazer = (totalLazer / salarioTotal) * 100;

    document.getElementById('percentual-despesas').textContent = `Percentual destinado a Despesas: ${percentualDespesas.toFixed(2)}%`;
    document.getElementById('percentual-metas').textContent = `Percentual destinado a Metas: ${percentualMetas.toFixed(2)}%`;
    document.getElementById('percentual-emergencia').textContent = `Percentual destinado ao Fundo de Emergência: ${percentualEmergencia.toFixed(2)}%`;
    document.getElementById('percentual-lazer').textContent = `Percentual destinado a Lazer: ${percentualLazer.toFixed(2)}%`;
}

// Função para calcular sugestões de distribuição
function calcularSugestoes() {
    if (salarioTotal <= 0) return;

    const despesasSugestao = salarioTotal * 0.50;
    const metasSugestao = salarioTotal * 0.20;
    const emergenciaSugestao = salarioTotal * 0.15;
    const lazerSugestao = salarioTotal * 0.15;

    document.getElementById('sugestao-despesas').textContent = `Despesas: R$ ${despesasSugestao.toFixed(2)} (${(50).toFixed(2)}%)`;
    document.getElementById('sugestao-metas').textContent = `Metas: R$ ${metasSugestao.toFixed(2)} (${(20).toFixed(2)}%)`;
    document.getElementById('sugestao-emergencia').textContent = `Fundo de Emergência: R$ ${emergenciaSugestao.toFixed(2)} (${(15).toFixed(2)}%)`;
    document.getElementById('sugestao-lazer').textContent = `Lazer: R$ ${lazerSugestao.toFixed(2)} (${(15).toFixed(2)}%)`;
}

// Função para calcular a contribuição com base nas metas inseridas
function calcularContribuicao() {
    if (salarioTotal <= 0) return;

    const metasSugestao = salarioTotal * 0.20;
    const contribuicao = (totalMetas / metasSugestao).toFixed(2);
    document.getElementById('contribuicao-meta').textContent = `Contribuição sugerida: ${(contribuicao * 100).toFixed(2)}%`; // Atualiza o campo de contribuição
}

// Função para calcular o resto do salário
function calcularResto() {
    if (salarioTotal <= 0) return;

    const resto = salarioTotal - (totalDespesas + totalMetas + fundoTotal + totalLazer);
    document.getElementById('resto-salario').textContent = `Resto do Salário: R$ ${resto.toFixed(2)}`;
}

// Função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem(`${CHAVE_PROJETO}-despesas`, JSON.stringify(totalDespesas));
    localStorage.setItem(`${CHAVE_PROJETO}-metas`, JSON.stringify(totalMetas));
    localStorage.setItem(`${CHAVE_PROJETO}-fundoEmergencia`, JSON.stringify(fundoTotal));
    localStorage.setItem(`${CHAVE_PROJETO}-lazer`, JSON.stringify(totalLazer));
    localStorage.setItem(`${CHAVE_PROJETO}-salarioTotal`, JSON.stringify(salarioTotal));
}

// Função para carregar dados do localStorage
function carregarDados() {
    totalDespesas = JSON.parse(localStorage.getItem(`${CHAVE_PROJETO}-despesas`)) || 0;
    totalMetas = JSON.parse(localStorage.getItem(`${CHAVE_PROJETO}-metas`)) || 0;
    fundoTotal = JSON.parse(localStorage.getItem(`${CHAVE_PROJETO}-fundoEmergencia`)) || 0;
    totalLazer = JSON.parse(localStorage.getItem(`${CHAVE_PROJETO}-lazer`)) || 0;
    salarioTotal = JSON.parse(localStorage.getItem(`${CHAVE_PROJETO}-salarioTotal`)) || 0;

    document.getElementById('total-emergencia').textContent = `Total no Fundo: R$ ${fundoTotal.toFixed(2)}`;
    atualizarPercentuais();
    calcularResto();
    calcularSugestoes(); // Atualizar sugestões ao carregar os dados
}

// Função para lidar com o formulário de salário
document.getElementById('form-salario').addEventListener('submit', (e) => {
    e.preventDefault();
    salarioTotal = parseFloat(document.getElementById('salario-total').value);
    document.getElementById('sugestoes-distribuicao').style.display = 'block';
    calcularSugestoes();
    calcularResto();
    salvarDados();
});

// Função para lidar com o formulário de despesas
document.getElementById('form-despesas').addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao-despesa').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    totalDespesas += valor;

    const item = document.createElement('li');
    item.textContent = `${descricao}: R$ ${valor.toFixed(2)}`;
    document.getElementById('lista-despesas').appendChild(item);

    document.getElementById('descricao-despesa').value = '';
    document.getElementById('valor-despesa').value = '';

    atualizarPercentuais();
    calcularResto();
    salvarDados();
});

// Função para lidar com o formulário de metas
document.getElementById('form-metas').addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao-meta').value;
    const valor = parseFloat(document.getElementById('valor-meta').value);
    const periodicidade = parseFloat(document.getElementById('periodicidade-meta').value); // Nova linha para periodicidade
    
    // Verificar se o total de metas não ultrapassa 20% do salário
    const metasSugestao = salarioTotal * 0.20;
    if (totalMetas + valor > metasSugestao) {
        alert(`A soma das metas não pode ultrapassar R$ ${metasSugestao.toFixed(2)}.`);
        return;
    }

    totalMetas += valor;

    // Calcular a contribuição com base na periodicidade
    const contribuicao = (valor / periodicidade).toFixed(2);
    const item = document.createElement('li');
    item.textContent = `${descricao}: R$ ${valor.toFixed(2)} (Contribuição: R$ ${contribuicao})`;
    document.getElementById('lista-metas').appendChild(item);

    document.getElementById('descricao-meta').value = '';
    document.getElementById('valor-meta').value = '';
    document.getElementById('periodicidade-meta').value = ''; // Limpar o campo de periodicidade

    atualizarPercentuais();
    calcularResto();
    salvarDados();

    // Atualizar a contribuição ao adicionar uma nova meta
    calcularContribuicao();
});

// Função para lidar com o formulário de fundo de emergência
document.getElementById('form-fundo-emergencia').addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valor-emergencia').value);
    fundoTotal += valor;

    document.getElementById('total-emergencia').textContent = `Total no Fundo: R$ ${fundoTotal.toFixed(2)}`;
    document.getElementById('valor-emergencia').value = '';

    atualizarPercentuais();
    calcularResto();
    salvarDados();
});

// Função para lidar com o formulário de lazer
document.getElementById('form-lazer').addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao-lazer').value;
    const valor = parseFloat(document.getElementById('valor-lazer').value);
    totalLazer += valor;

    const item = document.createElement('li');
    item.textContent = `${descricao}: R$ ${valor.toFixed(2)}`;
    document.getElementById('lista-lazer').appendChild(item);

    document.getElementById('descricao-lazer').value = '';
    document.getElementById('valor-lazer').value = '';

    atualizarPercentuais();
    calcularResto();
    salvarDados();
});

// Carregar dados ao iniciar
window.onload = carregarDados;
