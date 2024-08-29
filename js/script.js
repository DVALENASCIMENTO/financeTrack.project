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

    document.getElementById('sugestao-despesas').textContent = `Despesas: R$ ${despesasSugestao.toFixed(2)}`;
    document.getElementById('sugestao-metas').textContent = `Metas: R$ ${metasSugestao.toFixed(2)}`;
    document.getElementById('sugestao-emergencia').textContent = `Fundo de Emergência: R$ ${emergenciaSugestao.toFixed(2)}`;
    document.getElementById('sugestao-lazer').textContent = `Lazer: R$ ${lazerSugestao.toFixed(2)}`;
}

// Função para calcular o resto do salário
function calcularResto() {
    if (salarioTotal <= 0) return;

    const resto = salarioTotal - (totalDespesas + totalMetas + fundoTotal + totalLazer);

    document.getElementById('resto-salario').textContent = `Resto do Salário: R$ ${resto.toFixed(2)}`;
}

// Função para salvar e carregar dados do localStorage
function salvarDados() {
    localStorage.setItem('despesas', JSON.stringify(totalDespesas));
    localStorage.setItem('metas', JSON.stringify(totalMetas));
    localStorage.setItem('fundoEmergencia', JSON.stringify(fundoTotal));
    localStorage.setItem('lazer', JSON.stringify(totalLazer));
    localStorage.setItem('salarioTotal', JSON.stringify(salarioTotal));
}

function carregarDados() {
    totalDespesas = JSON.parse(localStorage.getItem('despesas')) || 0;
    totalMetas = JSON.parse(localStorage.getItem('metas')) || 0;
    fundoTotal = JSON.parse(localStorage.getItem('fundoEmergencia')) || 0;
    totalLazer = JSON.parse(localStorage.getItem('lazer')) || 0;
    salarioTotal = JSON.parse(localStorage.getItem('salarioTotal')) || 0;

    document.getElementById('total-emergencia').textContent = `Total no Fundo: R$ ${fundoTotal.toFixed(2)}`;
    atualizarPercentuais();
    calcularResto(); // Atualizar o resto ao carregar os dados
}

// Funções para lidar com o formulário e listas
document.getElementById('form-salario').addEventListener('submit', (e) => {
    e.preventDefault();
    salarioTotal = parseFloat(document.getElementById('salario-total').value);
    document.getElementById('sugestoes-distribuicao').style.display = 'block';
    calcularSugestoes();
    calcularResto();
    salvarDados();
});

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

document.getElementById('form-metas').addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricao-meta').value;
    const valor = parseFloat(document.getElementById('valor-meta').value);
    totalMetas += valor;
    
    const item = document.createElement('li');
    item.textContent = `${descricao}: R$ ${valor.toFixed(2)}`;
    document.getElementById('lista-metas').appendChild(item);

    document.getElementById('descricao-meta').value = '';
    document.getElementById('valor-meta').value = '';

    atualizarPercentuais();
    calcularResto();
    salvarDados();
});

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

// Função para limpar dados
document.getElementById('limpar-dados').addEventListener('click', () => {
    localStorage.clear();
    totalDespesas = 0;
    totalMetas = 0;
    fundoTotal = 0;
    totalLazer = 0;
    salarioTotal = 0;

    document.getElementById('lista-despesas').innerHTML = '';
    document.getElementById('lista-metas').innerHTML = '';
    document.getElementById('lista-lazer').innerHTML = '';
    document.getElementById('total-emergencia').textContent = 'Total no Fundo: R$ 0.00';
    document.getElementById('resto-salario').textContent = 'Resto do Salário: R$ 0.00';
    document.getElementById('percentual-despesas').textContent = 'Percentual destinado a Despesas: 0.00%';
    document.getElementById('percentual-metas').textContent = 'Percentual destinado a Metas: 0.00%';
    document.getElementById('percentual-emergencia').textContent = 'Percentual destinado ao Fundo de Emergência: 0.00%';
    document.getElementById('percentual-lazer').textContent = 'Percentual destinado a Lazer: 0.00%';
    document.getElementById('sugestoes-distribuicao').style.display = 'none';
});

// Função para salvar em PDF
document.getElementById('salvar-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yOffset = 10;

    doc.text('Finance Track', 10, yOffset);
    yOffset += 10;
    doc.text(`Salário Total: R$ ${salarioTotal.toFixed(2)}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Despesas: R$ ${totalDespesas.toFixed(2)}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Metas: R$ ${totalMetas.toFixed(2)}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Fundo de Emergência: R$ ${fundoTotal.toFixed(2)}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Total Lazer: R$ ${totalLazer.toFixed(2)}`, 10, yOffset);
    yOffset += 10;

    const despesas = Array.from(document.getElementById('lista-despesas').children);
    despesas.forEach(item => {
        doc.text(item.textContent, 10, yOffset);
        yOffset += 10;
    });

    const metas = Array.from(document.getElementById('lista-metas').children);
    metas.forEach(item => {
        doc.text(item.textContent, 10, yOffset);
        yOffset += 10;
    });

    const lazer = Array.from(document.getElementById('lista-lazer').children);
    lazer.forEach(item => {
        doc.text(item.textContent, 10, yOffset);
        yOffset += 10;
    });

    doc.text(`Percentual destinado a Despesas: ${document.getElementById('percentual-despesas').textContent.split(': ')[1]}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Percentual destinado a Metas: ${document.getElementById('percentual-metas').textContent.split(': ')[1]}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Percentual destinado ao Fundo de Emergência: ${document.getElementById('percentual-emergencia').textContent.split(': ')[1]}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Percentual destinado a Lazer: ${document.getElementById('percentual-lazer').textContent.split(': ')[1]}`, 10, yOffset);

    doc.save('relatorio_financeiro.pdf');
});

// Função para voltar ao topo
document.getElementById('voltar-topo').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicialização
carregarDados();
