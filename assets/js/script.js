 /*Atualiza o ano atuomáticamente no rodapé*/ 
 document.getElementById('ano-atual').textContent = new Date().getFullYear();

 function enviarWpp() {
    const hora        = obterSaudacao();
    const nome        = document.getElementById('nome').value.trim();
    const regiao      = document.getElementById('regiao-evento').value;
    const tipobuffet  = document.getElementById('tipo-buffet').value;
    const data        = document.getElementById('data').value;
    const pessoas     = document.getElementById('pessoas').value;
    const numero      = '5521964859428';
    const checkboxes  = document.querySelectorAll('input[name="customizacao"]:checked');
    const personalizacoes = [...checkboxes].map(cb => `• ${cb.labels[0].textContent.trim()}`).join('\n');

    const texto =
        `${hora}! Me chamo ${nome}. Gostaria de solicitar um orçamento para o meu evento. Segue os detalhes:\n\n` +
        `*Buffet*\n` +
        `Tipo: ${tipobuffet}\n` +
        `Região: ${regiao}\n` +
        `Data: ${data}\n` +
        `Convidados: ${pessoas}` +
        (personalizacoes ? `\n\n*Personalizações*\n${personalizacoes}` : '');

    const link = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
}

function obterSaudacao() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12)  return 'Bom dia';
    if (hora >= 12 && hora < 18) return 'Boa tarde';
    return 'Boa noite';
}
