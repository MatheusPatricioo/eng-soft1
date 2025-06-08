// Dados simulados das hospedagens
const hospedagensData = {
    1: {
        nome: "Hotel Belo Horizonte Centro",
        tipo: "Hotel",
        capacidade: 180,
        localizacao: "Centro, Belo Horizonte - MG"
    },
    2: {
        nome: "Pousada Serra Verde",
        tipo: "Pousada",
        capacidade: 45,
        localizacao: "Serra do Cipó - MG"
    },
    3: {
        nome: "Resort Águas Claras",
        tipo: "Resort",
        capacidade: 320,
        localizacao: "Caldas Novas - GO"
    },
    4: {
        nome: "Hostel Downtown",
        tipo: "Hostel",
        capacidade: 80,
        localizacao: "Savassi, Belo Horizonte - MG"
    }
};

// Definir data atual como padrão
document.getElementById('dataReferencia').valueAsDate = new Date();

function carregarDados() {
    const hospedagemId = document.getElementById('hospedagemSelect').value;
    const dataReferencia = document.getElementById('dataReferencia').value;
    
    if (!hospedagemId || !dataReferencia) {
        alert('Por favor, selecione a hospedagem e a data de referência.');
        return;
    }
    
    // Mostrar loading
    const btn = document.querySelector('.btn-load');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Carregar informações da hospedagem
        const hospedagem = hospedagensData[hospedagemId];
        document.getElementById('nomeHospedagem').textContent = hospedagem.nome;
        document.getElementById('tipoHospedagem').textContent = hospedagem.tipo;
        document.getElementById('capacidadeTotal').textContent = hospedagem.capacidade + ' quartos';
        document.getElementById('localizacao').textContent = hospedagem.localizacao;
        
        // Definir capacidade total nos campos
        document.getElementById('quartosDisponiveis').max = hospedagem.capacidade;
        document.getElementById('quartosOcupados').max = hospedagem.capacidade;
        document.getElementById('quartosManutencao').max = hospedagem.capacidade;
        
        // Mostrar seções
        document.getElementById('hospedagemInfo').style.display = 'block';
        document.getElementById('ocupacaoForm').style.display = 'block';
        document.getElementById('historicoSection').style.display = 'block';
        
        // Restaurar botão
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Scroll suave para o formulário
        document.getElementById('ocupacaoForm').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 1500);
}

function calcularTaxaOcupacao() {
    const capacidadeTotal = parseInt(document.getElementById('capacidadeTotal').textContent) || 0;
    const quartosOcupados = parseInt(document.getElementById('quartosOcupados').value) || 0;
    const quartosManutencao = parseInt(document.getElementById('quartosManutencao').value) || 0;
    
    const quartosDisponiveis = capacidadeTotal - quartosManutencao;
    const taxaOcupacao = quartosDisponiveis > 0 ? (quartosOcupados / quartosDisponiveis) * 100 : 0;
    
    // Atualizar display
    document.getElementById('taxaOcupacao').textContent = taxaOcupacao.toFixed(1) + '%';
    document.getElementById('occupancyBar').style.width = taxaOcupacao + '%';
    
    // Atualizar campo de quartos disponíveis
    document.getElementById('quartosDisponiveis').value = Math.max(0, quartosDisponiveis - quartosOcupados);
    
    // Mudar cor da barra baseada na ocupação
    const bar = document.getElementById('occupancyBar');
    if (taxaOcupacao < 50) {
        bar.style.background = 'linear-gradient(90deg, #dc3545, #fd7e14)';
    } else if (taxaOcupacao < 80) {
        bar.style.background = 'linear-gradient(90deg, #ffc107, #fd7e14)';
    } else {
        bar.style.background = 'linear-gradient(90deg, #28a745, #20c997, #17a2b8)';
    }
}

// Event listeners para cálculo automático
document.getElementById('quartosOcupados').addEventListener('input', calcularTaxaOcupacao);
document.getElementById('quartosManutencao').addEventListener('input', calcularTaxaOcupacao);

// Máscara para valores monetários
document.getElementById('tarifaMedia').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    e.target.value = value;
});

function limparFormulario() {
    if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {
        document.getElementById('formOcupacao').reset();
        document.getElementById('taxaOcupacao').textContent = '0%';
        document.getElementById('occupancyBar').style.width = '0%';
    }
}

// Validação e envio do formulário
document.getElementById('formOcupacao').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const quartosOcupados = parseInt(document.getElementById('quartosOcupados').value) || 0;
    const hospedes = parseInt(document.getElementById('hospedes').value) || 0;
    
    if (quartosOcupados === 0 && hospedes === 0) {
        alert('Por favor, informe pelo menos os quartos ocupados ou o número de hóspedes.');
        return;
    }
    
    // Simular envio
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Confirmando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Ocupação lançada com sucesso!');
        
        // Aqui você pode redirecionar ou atualizar a página
        // window.location.href = 'dashboard.html';
    }, 2000);
});

// Salvar rascunho
document.querySelector('.btn-draft').addEventListener('click', function() {
    const btn = this;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Rascunho salvo com sucesso!');
    }, 1500);
});

// Efeitos visuais nos inputs
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Validação em tempo real
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
});
