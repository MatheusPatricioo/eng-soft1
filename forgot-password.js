document.getElementById('forgotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (email) {
        const btn = document.querySelector('.reset-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Mostrar mensagem de sucesso
            const form = document.getElementById('forgotForm');
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Link de redefinição enviado para seu e-mail!';
            form.insertBefore(successMsg, form.firstChild);
            
            // Limpar o campo
            document.getElementById('resetEmail').value = '';
            
            // Remover mensagem após 5 segundos
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 2000);
    }
});

// Efeito de foco nos inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});
