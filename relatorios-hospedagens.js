// Dados simulados para os relatórios
const dadosSimulados = {
    hospedagens: {
        1: { nome: "Hotel Belo Horizonte Centro", tipo: "hotel", capacidade: 180 },
        2: { nome: "Pousada Serra Verde", tipo: "pousada", capacidade: 45 },
        3: { nome: "Resort Águas Claras", tipo: "resort", capacidade: 320 },
        4: { nome: "Hostel Downtown", tipo: "hostel", capacidade: 80 }
    },
    ocupacoes: [
        { data: "2025-06-01", hospedagem: 1, ocupados: 150, hospedes: 280, checkins: 45, checkouts: 38, tarifa: 180.50 },
        { data: "2025-06-02", hospedagem: 1, ocupados: 165, hospedes: 310, checkins: 52, checkouts: 37, tarifa: 195.75 },
        { data: "2025-06-03", hospedagem: 2, ocupados: 38, hospedes: 72, checkins: 15, checkouts: 12, tarifa: 120.00 },
        { data: "2025-06-04", hospedagem: 3, ocupados: 285, hospedes: 540, checkins: 78, checkouts: 65, tarifa: 350.25 },
        { data: "2025-06-05", hospedagem: 4, ocupados: 65, hospedes: 98, checkins: 28, checkouts: 22, tarifa: 85.90 }
    ]
};

let chartsInstances = {};

// Event listeners
document.getElementById('periodoFilter').addEventListener('change', function() {
    const customRow = document.getElementById('customDateRow');
    if (this.value === 'custom') {
        customRow.style.display = 'grid';
    } else {
        customRow.style.display = 'none';
    }
});

// Definir datas padrão
const hoje = new Date();
const seteDiasAtras = new Date(hoje);
seteDiasAtras.setDate(hoje.getDate() - 7);

document.getElementById('dataInicio').valueAsDate = seteDiasAtras;
document.getElementById('dataFim').valueAsDate = hoje;

function gerarRelatorio() {
    const btn = document.querySelector('.btn-generate');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Mostrar seções do relatório
        document.getElementById('summarySection').style.display = 'block';
        document.getElementById('chartsSection').style.display = 'block';
        document.getElementById('tableSection').style.display = 'block';
        document.getElementById('insightsSection').style.display = 'block';
        
        // Atualizar dados do resumo
        atualizarResumo();
        
        // Gerar gráficos
        gerarGraficos();
        
        // Preencher tabela
        preencherTabela();
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Scroll suave para os resultados
        document.getElementById('summarySection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 2000);
}

function atualizarResumo() {
    // Simulação de cálculos baseados nos dados
    document.getElementById('taxaMediaOcupacao').textContent = '78.5%';
    document.getElementById('totalHospedes').textContent = '1,300';
    document.getElementById('quartosOcupados').textContent = '703';
    document.getElementById('receitaMedia').textContent = 'R$ 186,48';
}

function gerarGraficos() {
    // Destruir gráficos existentes
    Object.values(chartsInstances).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Gráfico de Evolução da Ocupação
    const ctx1 = document.getElementById('occupancyChart').getContext('2d');
    chartsInstances.occupancy = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06'],
            datasets: [{
                label: 'Taxa de Ocupação (%)',
                data: [75, 82, 68, 89, 73, 85, 78],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Gráfico de Distribuição por Tipo
    const ctx2 = document.getElementById('typeChart').getContext('2d');
    chartsInstances.type = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Hotel', 'Resort', 'Pousada', 'Hostel'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#667eea', '#764ba2', '#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico Comparativo
    const ctx3 = document.getElementById('comparisonChart').getContext('2d');
    chartsInstances.comparison = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Hotel BH Centro', 'Pousada Serra Verde', 'Resort Águas Claras', 'Hostel Downtown'],
            datasets: [{
                label: 'Taxa de Ocupação (%)',
                data: [83, 84, 89, 81],
                backgroundColor: ['#667eea', '#28a745', '#764ba2', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Gráfico de Sazonalidade
    const ctx4 = document.getElementById('seasonalityChart').getContext('2d');
    chartsInstances.seasonality = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Ocupação Média (%)',
                data: [65, 68, 70, 72, 85, 95, 92],
                backgroundColor: [
                    '#dc3545', '#fd7e14', '#ffc107', 
                    '#28a745', '#20c997', '#17a2b8', '#6f42c1'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function preencherTabela() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    const dados = [
        ['07/06/2025', 'Hotel BH Centro', 'Hotel', '180', '150', '83.3%', '280', '45', '38', 'R$ 180,50'],
        ['07/06/2025', 'Resort Águas Claras', 'Resort', '320', '285', '89.1%', '540', '78', '65', 'R$ 350,25'],
        ['06/06/2025', 'Pousada Serra Verde', 'Pousada', '45', '38', '84.4%', '72', '15', '12', 'R$ 120,00'],
        ['06/06/2025', 'Hostel Downtown', 'Hostel', '80', '65', '81.3%', '98', '28', '22', 'R$ 85,90'],
        ['05/06/2025', 'Hotel BH Centro', 'Hotel', '180', '165', '91.7%', '310', '52', '37', 'R$ 195,75']
    ];
    
    dados.forEach(linha => {
        const tr = document.createElement('tr');
        linha.forEach(celula => {
            const td = document.createElement('td');
            td.textContent = celula;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function exportarRelatorio() {
    const btn = document.querySelector('.btn-export');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Relatório exportado com sucesso!');
        
        // Aqui você implementaria a lógica real de exportação
        // Por exemplo, gerar PDF ou Excel
    }, 2000);
}

// Event listeners para exportação da tabela
document.querySelectorAll('.btn-table-export').forEach(btn => {
    btn.addEventListener('click', function() {
        const tipo = this.textContent.trim();
        alert(`Exportando tabela em formato ${tipo}...`);
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Gerar relatório inicial automaticamente
    setTimeout(() => {
        gerarRelatorio();
    }, 1000);
});
