// script.js - 𝐉𝐎𝐇𝐀𝐍 | 𝐘𝐔𝐆𝐈 𝐁𝐎𝐓 - تأثيرات خرافية

// ========== 1. تأثير المصفوفة الخضراء ==========
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    let drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = `rgba(0, ${200 + Math.random() * 55}, 100, ${0.3 + Math.random() * 0.5})`;
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    });
}

// ========== 2. تأثير الجسيمات ==========
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
    const pCtx = particleCanvas.getContext('2d');
    let pWidth = window.innerWidth, pHeight = window.innerHeight;
    particleCanvas.width = pWidth; particleCanvas.height = pHeight;
    let particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * pWidth, y: Math.random() * pHeight,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.8, speedY: (Math.random() - 0.5) * 0.8,
            color: `rgba(0, ${180 + Math.random() * 75}, 100, ${Math.random() * 0.5 + 0.2})`
        });
    }
    function drawParticles() {
        pCtx.clearRect(0, 0, pWidth, pHeight);
        for (let p of particles) {
            pCtx.beginPath(); pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            pCtx.fillStyle = p.color; pCtx.fill();
            p.x += p.speedX; p.y += p.speedY;
            if (p.x < 0) p.x = pWidth; if (p.x > pWidth) p.x = 0;
            if (p.y < 0) p.y = pHeight; if (p.y > pHeight) p.y = 0;
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
}

// ========== 3. الأصوات ==========
function playClickSound() {
    const sound = document.getElementById('clickSound');
    if (sound) { sound.currentTime = 0; sound.play().catch(e => console.log('صوت مش شغال')); }
}
function playHoverSound() {
    const sound = document.getElementById('hoverSound');
    if (sound) { sound.currentTime = 0; sound.play().catch(e => console.log('صوت مش شغال')); }
}
function addClickSounds() {
    document.querySelectorAll('.click-sound, .category-btn, .buy-btn, .contact-btn').forEach(el => {
        el.addEventListener('click', (e) => { e.stopPropagation(); playClickSound(); });
        el.addEventListener('mouseenter', () => playHoverSound());
    });
}

// ========== 4. نسخ الرقم ==========
function copyNumber() {
    navigator.clipboard.writeText('+972599351264').then(() => showToast('✅ تم نسخ الرقم!'))
    .catch(() => showToast('❌ فشل النسخ'));
}
function showToast(msg) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast-msg'; document.body.appendChild(toast); }
    toast.textContent = msg; toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => { toast.style.display = 'none'; toast.style.opacity = '1'; }, 300); }, 2500);
}

// ========== 5. مهارات ==========
function animateSkills() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        let progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ========== 6. عدادات واقعية ==========
function animateStats() {
    const stats = [
        { id: 'yearsExp', target: 1 },
        { id: 'projectsCount', target: 25 },
        { id: 'clientsCount', target: 120 },
        { id: 'botsCount', target: 8 },
        { id: 'channelMembers', target: 2500 },
        { id: 'linesCount', target: 15000 }
    ];
    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (!el) return;
        let current = 0, target = stat.target, increment = target / 50;
        let timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = stat.id === 'channelMembers' || stat.id === 'linesCount' ? target.toLocaleString() : Math.floor(target);
                clearInterval(timer);
            } else {
                el.textContent = stat.id === 'channelMembers' || stat.id === 'linesCount' ? Math.floor(current).toLocaleString() : Math.floor(current);
            }
        }, 35);
    });
}

// ========== 7. تبديل الأقسام (Categories) ==========
function setupCategories() {
    const btns = document.querySelectorAll('.category-btn');
    const sections = {
        home: document.getElementById('homeSection'),
        scripts: document.getElementById('scriptsSection'),
        services: document.getElementById('servicesSection'),
        skills: document.getElementById('skillsSection'),
        projects: document.getElementById('projectsSection'),
        contact: document.getElementById('contactSection')
    };
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            Object.values(sections).forEach(section => { if (section) section.classList.remove('active'); });
            if (sections[category]) sections[category].classList.add('active');
        });
    });
}

// ========== 8. تفعيل الضغط على الاسكربتات ==========
function setupScripts() {
    document.querySelectorAll('.script-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-btn') || e.target.parentElement.classList.contains('buy-btn')) return;
            const url = card.getAttribute('data-script-url');
            if (url) window.open(url, '_blank');
        });
        const buyBtn = card.querySelector('.buy-btn');
        if (buyBtn) buyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = card.getAttribute('data-script-url');
            if (url) window.open(url, '_blank');
        });
    });
}

// ========== 9. تأثير 3D على الكروت ==========
function add3DEffect() {
    document.querySelectorAll('.glass-card, .script-card, .service-card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const centerX = rect.width / 2, centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25, rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ========== 10. تشغيل كل حاجة ==========
document.addEventListener('DOMContentLoaded', () => {
    animateSkills(); animateStats(); addClickSounds(); setupCategories(); setupScripts(); add3DEffect();
    console.log('%c𝐘𝐔𝐆𝐈 𝐁𝐎𝐓 | 𝐉𝐎𝐇𝐀𝐍 - الموقع شغال بكفاءة 100%', 'color: #00ff88; font-size: 14px');
});
