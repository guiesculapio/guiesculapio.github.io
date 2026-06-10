/* =============================================
   ANIMAÇÕES COM INTERSECTION OBSERVER
   JavaScript Vanilla - Sem dependências
   ============================================= */

// Inicializar animações quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initNavigation();
  initCardAnimations();
});

// --- 1. INTERSECTION OBSERVER PARA ANIMAÇÕES AO SCROLL ---

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Animar apenas uma vez
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar animação aos elementos fade-in
  const fadeElements = document.querySelectorAll(".fade-in-element");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// --- 2. NAVEGAÇÃO COM DESTAQUE ATIVO ---

function initNavigation() {
  const navLinks = document.querySelectorAll(".header_menu a");
  const sections = document.querySelectorAll("section, main, footer");

  // Atualizar link ativo ao scrollar
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Adicionar animação ao clicar
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Remover classe active de todos os links
      navLinks.forEach((l) => l.classList.remove("active"));
      // Adicionar classe active no link clicado
      link.classList.add("active");
    });
  });

  // Scroll suave (fallback para navegadores antigos)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// --- 3. ANIMAÇÕES DE CARDS COM STAGGER ---

function initCardAnimations() {
  // Animar cards de empresa (experiência)
  const empresaCards = document.querySelectorAll(".empresa");
  empresaCards.forEach((card, index) => {
    card.classList.add("fade-in-element", `stagger-item-${index + 1}`);
  });

  // Animar cards de faculdade (formação)
  const faculdadeCards = document.querySelectorAll(".faculdade");
  faculdadeCards.forEach((card, index) => {
    card.classList.add("fade-in-element", `stagger-item-${index + 1}`);
  });

  // Animar seções principais
  const experienciaSection = document.querySelector(".experiencia");
  if (experienciaSection) {
    experienciaSection.classList.add("fade-in-element");
  }

  const formacaoSection = document.querySelector(".formacao");
  if (formacaoSection) {
    formacaoSection.classList.add("fade-in-element");
  }

  const footerSection = document.querySelector("footer");
  if (footerSection) {
    footerSection.classList.add("fade-in-element");
  }

  // Reinicializar observer para novos elementos
  initScrollAnimations();
}

// --- 4. OTIMIZAÇÃO - Throttle para scroll events ---

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Aplicar throttle ao scroll se houver muitos eventos
window.addEventListener(
  "scroll",
  throttle(() => {
    // Eventos de scroll já estão gerenciados acima
  }, 100),
  false,
);

// --- 5. DEBUGGING (opcional) - remover comentários para ativar ---

// console.log('✨ Animações inicializadas com sucesso!');
// console.log('📍 Elementos com fade-in:', document.querySelectorAll('.fade-in-element').length);
// console.log('🔗 Links de navegação:', document.querySelectorAll('.header_menu a').length);
