 /* Atualiza o ano automaticamente no rodapé — só roda se o elemento existir */
const anoAtualEl = document.getElementById('ano-atual');
if (anoAtualEl) {
  anoAtualEl.textContent = new Date().getFullYear();
}

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

/* ============================================================
   PORTFÓLIO — pausa o autoplay quando o usuário foca um card
   por teclado (acessibilidade)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.getElementById('carouselBuffets');
  if (!carouselEl) return;

  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
  const focusableItems = carouselEl.querySelectorAll('.buffet-card');

  focusableItems.forEach(item => {
    item.addEventListener('focus', () => carousel.pause());
    item.addEventListener('blur', () => carousel.cycle());
  });
});

/* SUBPAGINAS - LINK ATIVO */
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.filter-bar__item');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();

    if (linkPage === currentPage) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    }
  });
});

/* input data - só consegue digitar dias/meses/anos que é atual ou futuro */

document.addEventListener('DOMContentLoaded', function () {
  const inputData = document.getElementById('data');
  const botaoSubmit = document.querySelector('button[type="submit"].btn-submit-custom');
  const form = botaoSubmit ? botaoSubmit.closest('form') : null;

  // Pega a data de hoje no formato YYYY-MM-DD (formato interno do input type="date")
  function getHojeFormatado() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  const hojeFormatado = getHojeFormatado();

  // Impede o calendário de mostrar/aceitar datas passadas
  inputData.setAttribute('min', hojeFormatado);

  // Validação ao alterar o campo
  inputData.addEventListener('change', function () {
    if (inputData.value && inputData.value < hojeFormatado) {
      alert('A data não pode ser menor que a data atual.');
      inputData.value = '';
    }
  });

  // Validação ao enviar o formulário (garante que não passe nenhuma data inválida)
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!inputData.value) {
        event.preventDefault();
        alert('Por favor, selecione uma data.');
        return;
      }
      if (inputData.value < hojeFormatado) {
        event.preventDefault();
        alert('A data não pode ser menor que a data atual.');
      }
    });
  }
});

/* SUBPAGE LINK CARROSSEL RESP */
document.querySelectorAll('.filter-scroll').forEach((nav) => {
  const track = nav.querySelector('.filter-scroll__track');
  const prevBtn = nav.querySelector('.filter-scroll__arrow--prev');
  const nextBtn = nav.querySelector('.filter-scroll__arrow--next');
  const items = Array.from(track.querySelectorAll('li'));

  // Marca o link ativo com base na URL atual
  const currentPath = window.location.pathname.split('/').pop();
  track.querySelectorAll('.filter-scroll__item').forEach((item) => {
    const itemPath = item.getAttribute('href').split('/').pop();
    if (itemPath === currentPath) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  // Scroll item a item
  nextBtn.addEventListener('click', () => {
    const firstItem = items[0];
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 8;
    const step = itemWidth + gap;

    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - 1) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    const firstItem = items[0];
    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 8;
    const step = itemWidth + gap;

    if (track.scrollLeft <= 1) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });
});