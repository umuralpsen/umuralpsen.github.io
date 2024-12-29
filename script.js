document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .service-card, .project-card').forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
};

const typeEffect = () => {
    const text = "Computer Engineer";
    const titleElement = document.querySelector('.title');
    let i = 0;

    const typing = () => {
        if (i < text.length) {
            titleElement.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(typing, 100);
        }
    };
    typing();
};

const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

const toggleLanguage = () => {
    const currentLang = document.documentElement.lang;
    const translations = {
        en: {  },
        tr: {  }
    };
};

const handleContactForm = () => {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.background = '#4CAF50';
        form.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
};

const handleProjectDetails = () => {
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.getElementById('project-details');
    const backButton = projectDetails.querySelector('.back-button');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            projectDetails.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
    backButton.addEventListener('click', () => {
        projectDetails.classList.add('hidden');
        document.body.style.overflow = '';
    });
};

const handlePortfolioFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

const animateStatistics = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            stat.textContent = Math.round(current);
            
            if (current < target) {
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
};

const handleThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        icon.className = document.body.dataset.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('theme', document.body.dataset.theme);
    });
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

const handleLanguageToggle = () => {
    const langToggle = document.getElementById('langToggle');
    const translations = {
        en: {
            about: 'About',
            tools: 'Tools',
            projects: 'Projects',
            education: 'Education',
            contact: 'Contact',
            title: 'Computer Engineer',
            email: 'EMAIL',
            phone: 'CONTACT',
            location: 'LOCATION',
            downloadCV: 'Download CV',
            projectTitle: 'GPR AND AI FOR BUILDING DIGITAL SIMULATION',
            projectDescription: 'A project that aims to combine GPR machine and Artificial Intelligence to simulate the building and reveal its weaknesses.',
            university: 'Istanbul Technical University',
            department: 'Computer Engineering',
            namePlaceholder: 'Name',
            emailPlaceholder: 'Email',
            messagePlaceholder: 'Message',
            sendButton: 'Send Message',
            aboutMe: 'About Me',
            aboutMeText: "As a dedicated fourth-year Bachelor of Science student in Computer Engineering, I am passionate about leveraging technology to solve complex problems. Throughout my academic journey, I have honed my skills in various programming languages and project management. I am eager to apply my theoretical knowledge to real-world challenges in the field of computer engineering. My goal is to contribute to innovative projects that push the boundaries of technology while continuously expanding my expertise in this ever-evolving field.",
            toolsTitle: 'Tools & Skills',
            projectsTitle: 'Projects',
            educationTitle: 'Education',
            contactTitle: 'Contact Me',
            contactLabels: {
                'EMAIL': 'EMAIL',
                'CONTACT': 'CONTACT',
                'LOCATION': 'LOCATION'
            },
            aboutMeTitle: 'About Me',
            sectionTitles: {
                'about': 'About Me',
                'tools': 'Tools & Skills',
                'projects': 'Projects',
                'education': 'Education',
                'contact': 'Contact'
            }
        },
        tr: {
            about: 'Hakkımda',
            tools: 'Araçlar',
            projects: 'Projeler',
            education: 'Eğitim',
            contact: 'İletişim',
            title: 'Bilgisayar Mühendisi',
            email: 'E-POSTA',
            phone: 'İLETİŞİM',
            location: 'KONUM',
            downloadCV: 'CV İndir',
            projectTitle: 'BİNA DİJİTAL SİMÜLASYONU İÇİN GPR VE YAPAY ZEKA',
            projectDescription: 'GPR cihazı ve Yapay Zeka\'yı birleştirerek binanın simülasyonunu oluşturmayı ve zayıf noktalarını ortaya çıkarmayı amaçlayan bir proje.',
            university: 'İstanbul Teknik Üniversitesi',
            department: 'Bilgisayar Mühendisliği',
            namePlaceholder: 'İsim',
            emailPlaceholder: 'E-posta',
            messagePlaceholder: 'Mesaj',
            sendButton: 'Mesaj Gönder',
            aboutMeTitle: 'Hakkımda',
            aboutMeText: "Bilgisayar Mühendisliği'nde dördüncü sınıf lisans öğrencisi olarak, karmaşık problemleri çözmek için teknolojiyi kullanma konusunda tutkulu birisiyim. Akademik yolculuğum boyunca, çeşitli programlama dilleri ve proje yönetimi konularında becerilerimi geliştirdim. Teorik bilgilerimi bilgisayar mühendisliği alanındaki gerçek dünya zorluklarına uygulamak için sabırsızlanıyorum. Amacım, bu sürekli gelişen alanda uzmanlığımı genişletirken teknolojinin sınırlarını zorlayan yenilikçi projelere katkıda bulunmaktır.",
            toolsTitle: 'Araçlar & Yetenekler',
            projectsTitle: 'Projeler',
            educationTitle: 'Eğitim',
            contactTitle: 'İletişim',
            contactLabels: {
                'EMAIL': 'E-POSTA',
                'CONTACT': 'İLETİŞİM',
                'LOCATION': 'KONUM'
            },
            sectionTitles: {
                'about': 'Hakkımda',
                'tools': 'Araçlar & Yetenekler',
                'projects': 'Projeler',
                'education': 'Eğitim',
                'contact': 'İletişim'
            }
        }
    };

    const updateContent = (translations) => {
        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('href').substring(1);
            if (translations[key]) {
                link.textContent = translations[key];
            }
        });

        document.querySelector('.title').textContent = translations.title;

        document.querySelectorAll('.contact-item p').forEach(item => {
            const originalText = item.getAttribute('data-original') || item.textContent;
            if (!item.getAttribute('data-original')) {
                item.setAttribute('data-original', originalText);
            }
            const translation = translations.contactLabels[originalText];
            if (translation) {
                item.textContent = translation;
            }
        });

        document.querySelector('.cv-download-btn').textContent = translations.downloadCV;

        const projectTitle = document.querySelector('.project-card h3');
        const projectDesc = document.querySelector('.project-card p');
        if (projectTitle && projectDesc) {
            projectTitle.textContent = translations.projectTitle;
            projectDesc.textContent = translations.projectDescription;
        }

        const form = document.querySelector('.contact-form');
        if (form) {
            form.querySelector('input[type="text"]').placeholder = translations.namePlaceholder;
            form.querySelector('input[type="email"]').placeholder = translations.emailPlaceholder;
            form.querySelector('textarea').placeholder = translations.messagePlaceholder;
            form.querySelector('button').textContent = translations.sendButton;
        }

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionId = section.id;
            const titleElement = section.querySelector('h2');
            
            if (titleElement && translations.sectionTitles[sectionId]) {
                titleElement.textContent = translations.sectionTitles[sectionId];
            }
        });

        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const aboutTitle = aboutSection.querySelector('h2');
            const aboutText = aboutSection.querySelector('p');
            
            if (aboutTitle) {
                aboutTitle.textContent = translations.aboutMe;
            }
            if (aboutText) {
                aboutText.textContent = translations.aboutMeText;
            }
        }

        document.querySelectorAll('section').forEach(section => {
            const sectionId = section.getAttribute('id');
            if (sectionId === 'about') {
                const titleElement = section.querySelector('h2');
                if (titleElement) {
                    titleElement.textContent = translations.aboutMeTitle;
                }
            }
        });
    };

    langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        
        document.documentElement.lang = newLang;
        updateContent(translations[newLang]);
        
        localStorage.setItem('lang', newLang);
        
        langToggle.textContent = newLang.toUpperCase() === 'TR' ? 'EN/TR' : 'TR/EN';
    });

    const savedLang = localStorage.getItem('lang') || 'tr';
    if (savedLang !== document.documentElement.lang) {
        document.documentElement.lang = savedLang;
        updateContent(translations[savedLang]);
        langToggle.textContent = savedLang.toUpperCase() === 'TR' ? 'EN/TR' : 'TR/EN';
    }
};

const handleScrollToTop = () => {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

const handleMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    typeEffect();
    highlightActiveSection();
    handleContactForm();
    handleProjectDetails();
    handlePortfolioFilter();
    animateStatistics();
    handleThemeToggle();
    handleLanguageToggle();
    handleScrollToTop();
    handleMobileMenu();

    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.initiatorType === 'img') {
                    console.log(`Image load time: ${entry.duration}ms`, entry.name);
                }
            });
        });
        observer.observe({ entryTypes: ['resource'] });
    }

    const preloadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.onload = () => img.removeAttribute('data-src');
        });
    };

    const lazyLoad = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };

    preloadImages();
    lazyLoad();
}); 