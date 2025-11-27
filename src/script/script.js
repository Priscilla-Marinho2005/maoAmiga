
// MENU HAMBUERGER: 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

const menuLinks = navMenu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }
});

// FILTRO:
const campoBusca = document.querySelector(".campoBusca input");
const menuCausas = document.querySelector(".menuCausas");
const botoesCausas = document.querySelectorAll(".menuCausas p");
const verMais = document.querySelector(".verMais");
const ongs = document.querySelectorAll(".ong");
const contador = document.querySelector(".filtro > div > p");

// DROPDOWN:
verMais.addEventListener("click", () => {
    menuCausas.classList.toggle("oculto");
});

botoesCausas.forEach(causa => {
    causa.addEventListener("click", () => {
        const filtroNecessidade = causa.textContent.trim().toLowerCase();
        filtrar(filtroNecessidade, campoBusca.value.toLowerCase());
        menuCausas.classList.add("oculto");
    });
});

// FILTRAGEM:
campoBusca.addEventListener("input", () => {
    filtrar("", campoBusca.value.toLowerCase());
});

function filtrar(necessidade, texto) {
    let total = 0;

    ongs.forEach(ong => {
        const nomeOng = ong.querySelector("h2").textContent.toLowerCase();
        const necessidadesLista = [...ong.querySelectorAll(".necessidades p")].map(p => p.textContent.toLowerCase());

        let aparece = true;

        // Filtro por nome ou necessidade
        if (texto) {
            const contemNome = nomeOng.includes(texto);
            const contemNecessidade = necessidadesLista.some(n => n.includes(texto));
            aparece = contemNome || contemNecessidade;
        }

        // Filtro por necessidade do menu
        if (necessidade) {
            aparece = necessidadesLista.includes(necessidade);
        }

        ong.style.display = aparece ? "grid" : "none";

        if (aparece) total++;
    });

    contador.textContent = `${total} ONGs encontradas`;
}

