/* ═══════════════════════════════════════
   main.js — Jared Butler Portfolio
   ═══════════════════════════════════════ */

// ── Theme Toggle ──────────────────────
const html      = document.documentElement;
const themeBtn  = document.getElementById('theme-toggle');
const iconSun   = themeBtn.querySelector('.icon-sun');
const iconMoon  = themeBtn.querySelector('.icon-moon');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        iconSun.style.display  = '';
        iconMoon.style.display = 'none';
    } else {
        iconSun.style.display  = 'none';
        iconMoon.style.display = '';
    }
}

// Load saved preference (or system preference)
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ── Translator Dropdown ───────────────
const translateBtn      = document.getElementById('translate-btn');
const translateDropdown = document.getElementById('translate-dropdown');

translateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    translateDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!translateBtn.contains(e.target) && !translateDropdown.contains(e.target)) {
        translateDropdown.classList.remove('open');
    }
});

// ── Google Translate Init ─────────────
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it,pt,zh-CN,ja,ko,ar,hi,ru',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        },
        'google_translate_element'
    );
}

// ── Mobile Menu ───────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMobile     = document.getElementById('nav-mobile');
const iconMenu      = mobileMenuBtn.querySelector('.icon-menu');
const iconClose     = mobileMenuBtn.querySelector('.icon-close');

function setMobileMenu(open) {
    navMobile.classList.toggle('open', open);
    iconMenu.style.display  = open ? 'none' : '';
    iconClose.style.display = open ? ''     : 'none';
}

mobileMenuBtn.addEventListener('click', () => {
    setMobileMenu(!navMobile.classList.contains('open'));
});

navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
});

// ── Nav scroll shadow ─────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav highlight on scroll ───
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(s => obs.observe(s));
}

// ── Scroll-reveal ─────────────────────
function initReveal() {
    const targets = document.querySelectorAll(
        '.project-card, .stat-card, .skills-category, .contact-card, .about-text, .about-stats'
    );

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings slightly
                const siblings = [...entry.target.parentElement.children];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 80}ms`;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    targets.forEach(el => {
        el.classList.add('reveal');
        obs.observe(el);
    });
}

// ── Typed rotating subtitle ──────────
const subtitles = [
    'Computer Science Student',
    'Cybersecurity Enthusiast',
    'Systems & Networking Nerd',
    'Open Source Tinkerer',
    'Problem Solver',
];

let subIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-subtitle');

function typeSubtitle() {
    const current = subtitles[subIdx];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
            deleting = true;
            return setTimeout(typeSubtitle, 2000);
        }
        setTimeout(typeSubtitle, 65);
    } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            subIdx = (subIdx + 1) % subtitles.length;
        }
        setTimeout(typeSubtitle, 38);
    }
}

// ── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Boot ─────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    typeSubtitle();
    initReveal();
    initNavHighlight();
});
