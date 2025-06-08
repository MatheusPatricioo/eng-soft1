// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Validação e envio do formulário
document.getElementById('hospedagemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e1e5e9';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Hospedagem cadastrada com sucesso!');
        
        // Aqui você pode redirecionar ou limpar o formulário
        // window.location.href = 'dashboard.html';
    }, 2000);
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

// Auto-preenchimento baseado no CEP (simulado)
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        // Aqui você pode integrar com uma API de CEP
        console.log('Buscando dados do CEP:', cep);
    }
});
