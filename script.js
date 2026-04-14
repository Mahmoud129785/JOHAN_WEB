// script.js - JOHAN | YUGI BOT - TERMINAL

// ========== 1. تأثير المصفوفة (Matrix Rain) ==========
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = width / fontSize;
    let drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = `rgba(0, ${180 + Math.random() * 75}, 80, ${0.3 + Math.random() * 0.5})`;
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        columns = width / fontSize;
        drops = [];
        for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    });
}

// ========== 2. بيانات الاسكربتات ==========
const scriptsData = [
    { name: "MADARA BOT", img: "https://files.catbox.moe/ig13ij.jpg", commands: "550", price: "FOR SALE" },
    { name: "UNKNOWN BOT", img: "https://files.catbox.moe/cnv7ux.jpg", commands: "550", price: "FOR SALE" },
    { name: "DARK BOT", img: "https://files.catbox.moe/0nq4mo.jpg", commands: "440", price: "FOR SALE" },
    { name: "FURINA BOT", img: "https://files.catbox.moe/4bre7w.jpg", commands: "270", price: "FOR SALE" }
];

// بيانات الخدمات
const servicesData = [
    { name: "WHATSAPP BOT DEV", desc: "Custom bots with protection, anti-spam, admin systems" },
    { name: "SECURITY SYSTEM", desc: "Advanced group protection against spam and attacks" },
    { name: "DOWNLOADER SYSTEM", desc: "Media downloader from YouTube, Instagram, TikTok" },
    { name: "STATISTICS SYSTEM", desc: "Real-time group analytics and reports" },
    { name: "GAMES SYSTEM", desc: "Interactive games for groups" },
    { name: "WEB DEVELOPMENT", desc: "Portfolios, dashboards, e-commerce" }
];

// بيانات المهارات
const skillsData = [
    { name: "JAVASCRIPT", percent: 92 },
    { name: "NODE.JS", percent: 88 },
    { name: "HTML", percent: 90 },
    { name: "CSS", percent: 85 }
];

// ========== 3. دوال العرض ==========
function renderScripts() {
    const container = document.getElementById('scriptsGrid');
    if (!container) return;
    container.innerHTML = scriptsData.map(s => `
        <div class="script-card" onclick="window.open('https://wa.me/972599351264?text=I want to buy ${s.name}','_blank')">
            <img src="${s.img}" class="script-img">
            <div class="script-name">${s.name}</div>
            <div class="script-badge">${s.commands} COMMANDS</div>
            <div class="script-badge">${s.price}</div>
            <button class="pixel-btn" style="margin-top:12px;">[ ORDER ]</button>
        </div>
    `).join('');
}

function renderServices() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    container.innerHTML = servicesData.map(s => `
        <div class="service-card">
            <div class="service-name">${s.name}</div>
            <div class="pixel-text">${s.desc}</div>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    container.innerHTML = skillsData.map(s => `
        <div class="skill-card">
            <div class="skill-name">${s.name}</div>
            <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: ${s.percent}%;"></div></div>
            <div class="script-badge">${s.percent}%</div>
        </div>
    `).join('');
}

// ========== 4. عدادات إحصائيات ==========
function animateStats() {
    const stats = [
        { id: 'yearsExp', target: 1 },
        { id: 'projectsCount', target: 25 },
        { id: 'clientsCount', target: 120 },
        { id: 'botsCount', target: 8 }
    ];
    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (!el) return;
        let current = 0;
        const target = stat.target;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 35);
    });
}

// ========== 5. نسخ الرقم ==========
function copyNumber() {
    navigator.clipboard.writeText('+972599351264');
    const toast = document.createElement('div');
    toast.textContent = '[ COPIED ]';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#00ff41';
    toast.style.color = '#000';
    toast.style.padding = '10px 20px';
    toast.style.fontFamily = 'Press Start 2P, monospace';
    toast.style.fontSize = '0.7rem';
    toast.style.zIndex = '9999';
    toast.style.border = '1px solid #000';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ========== 6. نظام التبويبات ==========
function setupTabs() {
    const btns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            panes.forEach(pane => pane.classList.remove('active'));
            const activePane = document.getElementById(tabId);
            if (activePane) activePane.classList.add('active');
        });
    });
}

// ========== 7. تأثير الـ Glitch العشوائي ==========
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    setInterval(() => {
        if (Math.random() > 0.9) {
            glitchElements.forEach(el => {
                el.style.animation = 'none';
                setTimeout(() => { el.style.animation = 'glitch 3s infinite'; }, 10);
            });
        }
    }, 4000);
}

// ========== 8. تأثير الكتابة على البطاقة ==========
function typeWriterEffect() {
    const quoteElement = document.querySelector('.pixel-quote');
    if (!quoteElement) return;
    const originalText = quoteElement.innerHTML;
    quoteElement.innerHTML = '';
    let i = 0;
    function type() {
        if (i < originalText.length) {
            quoteElement.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(type, 25);
        }
    }
    type();
}

// ========== 9. تأثير الماوس على الكروت ==========
function addCardHoverEffect() {
    const cards = document.querySelectorAll('.script-card, .service-card, .skill-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== 10. تشغيل كل حاجة ==========
document.addEventListener('DOMContentLoaded', () => {
    renderScripts();
    renderServices();
    renderSkills();
    animateStats();
    setupTabs();
    randomGlitch();
    typeWriterEffect();
    addCardHoverEffect();
    console.log('%c[SYSTEM] JOHAN PORTAL ACTIVATED', 'color: #00ff41; font-size: 14px');
    console.log('%c[STATUS] ALL SYSTEMS ONLINE', 'color: #00ff41; font-size: 12px');
});
