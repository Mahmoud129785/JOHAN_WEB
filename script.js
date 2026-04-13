// المتغيرات العامة
let subscribersCount = 0;
const targetSubscribers = 1250; // عدد افتراضي - ممكن تتغيره حسب قناتك

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    startTypingEffect();
    animateStats();
    setupEventListeners();
});

// دخول الموقع
function enterSite() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainSite = document.getElementById('mainSite');
    
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.visibility = 'hidden';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainSite.style.display = 'block';
        setTimeout(() => {
            mainSite.style.opacity = '1';
        }, 100);
    }, 800);
}

// تأثير الكتابة
function startTypingEffect() {
    const texts = [
        'مطور بوتات محترف',
        'خبير JavaScript & Node.js',
        'صاحب 𝐘𝐔𝐈 𝐁𝐓',
        'متخصص في الاسكربتات'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typingText');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// عداد الإحصائيات
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + (target === 1 ? ' سنة' : '+');
            }
        };
        
        updateCount();
    });
    
    // عداد المشتركين
    animateSubscribers();
}

function animateSubscribers() {
    const element = document.getElementById('subscribersCount');    const duration = 3000;
    const increment = targetSubscribers / (duration / 16);
    let current = 0;
    
    const updateCount = () => {
        current += increment;
        if (current < targetSubscribers) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = targetSubscribers;
        }
    };
    
    updateCount();
}

// نظام الفلترة
function setupEventListeners() {
    // فلترة الاسكربتات
    const filterBtns = document.querySelectorAll('.filter-btn');
    const scriptCards = document.querySelectorAll('.script-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الكلاس النشط من كل الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة الكلاس النشط للزر المضغوط
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            scriptCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
        // التنقل بين الأقسام
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            scrollToSection(category);
        });
    });
    
    // فورم التواصل
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('تم إرسال رسالتك بنجاح! هتوصلك الرد في أقرب وقت ');
        this.reset();
    });
    
    // زر عرض المزيد
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', function() {
        showToast('قريباً خدمات جديدة! 🚀');
    });
    
    // Smooth scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.animated-bg');
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// التنقل بين الأقسام
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId + 'Section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// عرض تفاصيل الاسكربت
function showScriptDetails(scriptType) {
    const modal = document.getElementById('scriptModal');
    const modalBody = document.getElementById('modalBody');
    
    const scriptsData = {
        madara: {
            title: 'اسكربت مادارا بوت',            image: 'https://files.catbox.moe/ig13ij.jpg',
            price: '550 $',
            commands: 550,
            features: [
                'نظام حماية متقدم',
                'لوحة تحكم شاملة',
                'تحديثات دورية',
                'دعم فني 24/7',
                'سهولة التثبيت',
                'توثيق كامل'
            ],
            description: 'اسكربت متكامل لبوت مادارا مع 550 أمر متقدم. يتميز بالسرعة والاستقرار والميزات الاحترافية.'
        },
        unknown: {
            title: 'اسكربت مجهول الاسم',
            image: 'https://files.catbox.moe/cnv7ux.jpg',
            price: '550 $',
            commands: 550,
            features: [
                'ميزات حصرية',
                'حماية عالية',
                'أداء سريع',
                'تخصيص كامل',
                'دعم مستمر',
                'ضمان الجودة'
            ],
            description: 'اسكربت متطور بميزات فريدة وحصرية. مناسب للمجموعات الكبيرة والمتوسطة.'
        },
        dark: {
            title: 'اسكربت دارك',
            image: 'https://files.catbox.moe/0nq4mo.jpg',
            price: '440 $',
            commands: 440,
            features: [
                'ثيم داكن احترافي',
                'سرعة فائقة',
                'استهلاك موارد قليل',
                'سهولة الاستخدام',
                'تحديثات منتظمة',
                'دعم فني'
            ],
            description: 'اسكربت دارك بـ 440 أمر مع تصميم داكن احترافي وأداء عالي.'
        },
        furina: {
            title: 'اسكربت فورينا',
            image: 'https://files.catbox.moe/4bre7w.jpg',
            price: '270 $',
            commands: 270,
            features: [
                'تصميم أنمي جذاب',                'سهل الاستخدام',
                'مناسب للمبتدئين',
                'دعم فني',
                'تحديثات',
                'سعر مميز'
            ],
            description: 'اسكربت فورينا بتصميم أنمي جميل و 270 أمر. مثالي للبداية.'
        }
    };
    
    const script = scriptsData[scriptType];
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${script.image}" alt="${script.title}" style="width: 100%; max-width: 400px; border-radius: 15px; margin-bottom: 20px;">
            <h2 style="color: var(--primary-blue); margin-bottom: 10px;">${script.title}</h2>
            <p style="color: var(--neon-blue); font-size: 1.5rem; font-weight: 900;">${script.price}</p>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.8;">${script.description}</p>
        <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="margin-bottom: 15px; color: var(--primary-blue);">عدد الأوامر: ${script.commands}</h3>
        </div>
        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 15px; color: var(--primary-blue);">المميزات:</h3>
            <ul style="list-style: none; padding: 0;">
                ${script.features.map(f => `
                    <li style="padding: 10px; margin-bottom: 8px; background: rgba(0,212,255,0.1); border-radius: 8px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-check-circle" style="color: #00ff88;"></i>
                        <span>${f}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        <button onclick="buyScript('${scriptType}'); closeModal();" style="width: 100%; padding: 15px; background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); border: none; border-radius: 10px; color: white; font-weight: 700; cursor: pointer; font-size: 1.1rem;">
            <i class="fas fa-shopping-cart"></i> اشتري دلوقتي
        </button>
    `;
    
    modal.style.display = 'flex';
}

// إغلاق المودال
function closeModal() {
    document.getElementById('scriptModal').style.display = 'none';
}

// شراء اسكربت
function buyScript(scriptType) {
    const scriptNames = {
        madara: 'مادارا بوت',        unknown: 'مجهول الاسم',
        dark: 'دارك',
        furina: 'فورينا'
    };
    
    const message = `سلام يا ${scriptNames[scriptType]}، عايز اشتري الاسكربت ده`;
    const whatsappUrl = `https://wa.me/972599351264?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// فتح واتساب
function openWhatsApp() {
    const whatsappUrl = 'https://wa.me/972599351264';
    window.open(whatsappUrl, '_blank');
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// نظام Particles
function initializeParticles() {
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(0, 212, 255, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw connections
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// إغلاق المودال عند الضغط خارجها
window.onclick = function(event) {
    const modal = document.getElementById('scriptModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.script-card, .stat-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});