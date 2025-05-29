const DOM = {
    get: selector => document.querySelector(selector),
    getAll: selector => document.querySelectorAll(selector)
};

const handleProjectDetails = () => {
    const projectCards = DOM.getAll('.project-card');
    const projectDetails = DOM.get('#project-details');
    const backButton = projectDetails.querySelector('.back-button');

    const toggleProjectDetails = (show = true) => {
        projectDetails.classList.toggle('hidden', !show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    projectCards.forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault();
            toggleProjectDetails(true);
        });
    });

    backButton.addEventListener('click', () => toggleProjectDetails(false));
};

const mobileMenu = (() => {
    let activeMenu = null;
    
    return {
        toggle: function() {
            const sidebar = DOM.get('.sidebar');
            const navbar = DOM.get('.nav-links');
            const overlay = DOM.get('.mobile-overlay');
            const projectDetails = DOM.get('.project-details');

            if(activeMenu === 'navbar') {
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                activeMenu = null;
            } else {
                sidebar.classList.remove('active');
                projectDetails.classList.add('hidden');
                navbar.classList.add('active');
                overlay.classList.add('active');
                activeMenu = 'navbar';
                window.scrollTo(0, 0);
            }
        }
    };
})();

const init = () => {
    handleProjectDetails();
    DOM.get('.navbar-toggle').addEventListener('click', mobileMenu.toggle);
};

document.addEventListener('DOMContentLoaded', init);

const setupSmoothScroll = () => {
    DOM.getAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animations = ['fade-in-up', 'fade-in-left', 'fade-in-right', 'zoom-in'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                
                if (entry.target.classList.contains('tool-card')) {
                    entry.target.classList.add('fade-in-up');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('fade-in-right');
                } else if (entry.target.tagName === 'SECTION') {
                    entry.target.classList.add('fade-in-left');
                } else {
                    entry.target.classList.add(randomAnimation);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .tool-card, .project-card, .section-content, .contact-form').forEach((el) => {
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

const handleContactForm = () => {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = 'var(--accent)';
            } else {
                input.style.borderColor = '#ff4444';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        const isValid = [...form.elements].every(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                return el.checkValidity();
            }
            return true;
        });

        if (isValid) {
            button.textContent = 'Message Sent!';
            button.style.background = '#4CAF50';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        } else {
            button.textContent = 'Fix Errors!';
            button.style.background = '#ff4444';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
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
            aboutMeTitle: 'About Me',
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

const animateSkillBars = () => {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        setTimeout(() => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        }, 100);
    });
};

const initLazyLoad = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
};

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    typeEffect();
    highlightActiveSection();
    handleContactForm();
    handlePortfolioFilter();
    animateStatistics();
    handleThemeToggle();
    handleLanguageToggle();
    handleScrollToTop();
    initLazyLoad();
    setupSmoothScroll();
    animateSkillBars();

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
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

const style = document.createElement('style');
style.textContent = `
.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
}
.mobile-overlay.active {
    display: block;
}
`;
document.head.appendChild(style);


const Minesweeper = (function() {
    const DIFFICULTY_LEVELS = {
        easy: { size: 10, mines: 10 },
        medium: { size: 15, mines: 35 },
        hard: { size: 20, mines: 70 }
    };

    let grid = [];
    let gameOver = false;
    let timer = 0;
    let timerInterval;
    let firstClick = true;
    let gameWon = false;
    let currentDifficulty = 'easy';
    let gridSize = DIFFICULTY_LEVELS.easy.size;
    let minesCount = DIFFICULTY_LEVELS.easy.mines;
    let gameMethods = {};

    function init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        createGameUI(container);

        startNewGame();

        gameMethods = {
            newGame: startNewGame,
            setDifficulty: (difficulty) => {
                if (DIFFICULTY_LEVELS[difficulty]) {
                    currentDifficulty = difficulty;
                    gridSize = DIFFICULTY_LEVELS[difficulty].size;
                    minesCount = DIFFICULTY_LEVELS[difficulty].mines;
                    startNewGame();
                    
                   
                    adjustGridSize();
                }
            }
        };

        adjustGridSize();
        
        return gameMethods;
    }
    

    function createGameUI(container) {

        container.innerHTML = '';

        const title = document.createElement('h2');
        title.textContent = document.documentElement.lang === 'tr' ? 'Mayın Tarlası' : 'Minesweeper';
        title.className = 'minesweeper-title';
        container.appendChild(title);

        const controls = document.createElement('div');
        controls.className = 'minesweeper-controls';

        const difficultySelector = document.createElement('div');
        difficultySelector.className = 'difficulty-selector';
        
        const easyLabel = document.documentElement.lang === 'tr' ? 'Kolay' : 'Easy';
        const mediumLabel = document.documentElement.lang === 'tr' ? 'Orta' : 'Medium';
        const hardLabel = document.documentElement.lang === 'tr' ? 'Zor' : 'Hard';
        
        const easyBtn = createButton(easyLabel, () => {
            setActiveButton(difficultySelector, easyBtn);
            gameMethods.setDifficulty('easy');
        });
        
        const mediumBtn = createButton(mediumLabel, () => {
            setActiveButton(difficultySelector, mediumBtn);
            gameMethods.setDifficulty('medium');
        });
        
        const hardBtn = createButton(hardLabel, () => {
            setActiveButton(difficultySelector, hardBtn);
            gameMethods.setDifficulty('hard');
        });
        
        easyBtn.classList.add('active');
        difficultySelector.appendChild(easyBtn);
        difficultySelector.appendChild(mediumBtn);
        difficultySelector.appendChild(hardBtn);
        
        controls.appendChild(difficultySelector);

        const infoDisplay = document.createElement('div');
        infoDisplay.className = 'minesweeper-info';
        
        const minesLeft = document.createElement('div');
        minesLeft.innerHTML = '<i class="fas fa-bomb"></i> <span id="mines-left">' + minesCount + '</span>';
        minesLeft.className = 'mines-left';
        
        const timerDisplay = document.createElement('div');
        timerDisplay.innerHTML = '<i class="fas fa-clock"></i> <span id="timer">0</span>s';
        timerDisplay.className = 'timer-display';
        
        infoDisplay.appendChild(minesLeft);
        infoDisplay.appendChild(timerDisplay);
        
        controls.appendChild(infoDisplay);

        const newGameBtn = document.createElement('button');
        newGameBtn.innerHTML = '<i class="fas fa-redo"></i>';
        newGameBtn.className = 'new-game-btn';
        newGameBtn.title = document.documentElement.lang === 'tr' ? 'Yeni Oyun' : 'New Game';
        newGameBtn.addEventListener('click', startNewGame);
        
        controls.appendChild(newGameBtn);
    
        container.appendChild(controls);

        const gameArea = document.createElement('div');
        gameArea.className = 'minesweeper-game-area';

        const gridContainer = document.createElement('div');
        gridContainer.id = 'grid';
        gridContainer.className = 'minesweeper-grid';
        
        gameArea.appendChild(gridContainer);

        container.appendChild(gameArea);

        const footer = document.createElement('div');
        footer.className = 'minesweeper-footer glass';
        const instructionText = document.documentElement.lang === 'tr' 
            ? '<p><i class="fas fa-mouse-pointer"></i> Sol tık: Hücreyi aç | <i class="fas fa-flag"></i> Sağ tık: Bayrak koy</p>'
            : '<p><i class="fas fa-mouse-pointer"></i> Left click: Reveal cell | <i class="fas fa-flag"></i> Right click: Flag mine</p>';
        
        footer.innerHTML = instructionText;

        container.appendChild(footer);

        const messageOverlay = document.createElement('div');
        messageOverlay.id = 'message-overlay';
        messageOverlay.className = 'message-overlay hidden';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content glass';
        
        const messageText = document.createElement('div');
        messageText.id = 'message-text';
        messageText.className = 'message-text';
        
        const closeButtonText = document.documentElement.lang === 'tr' ? 'Tekrar Oyna' : 'Play Again';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = closeButtonText;
        closeButton.className = 'message-button';
        closeButton.addEventListener('click', () => {
            messageOverlay.classList.add('hidden');
            startNewGame();
        });
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(closeButton);
        messageOverlay.appendChild(messageContent);
        
        container.appendChild(messageOverlay);
    }

    function adjustGridSize() {
        const gridElement = document.getElementById('grid');
        if (!gridElement) return;
        
        gridElement.style.gridTemplateColumns = `repeat(${gridSize}, var(--cell-size))`;

        const isMobile = window.innerWidth <= 768;
        const cellSize = isMobile ? 25 : 30; 

        const containerWidth = Math.min(
            gridSize * cellSize + (gridSize * 2) + 20, 
            window.innerWidth * 0.95 
        );
        
        const container = document.getElementById('minesweeper-container');
        if (container) {
            container.style.maxWidth = `${containerWidth}px`;
        }
    }

    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    function setActiveButton(parent, activeButton) {
        Array.from(parent.children).forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    function createGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';
        gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        
        grid = [];
        
        for(let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for(let j = 0; j < gridSize; j++) {
                grid[i][j] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
                
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleClick);
                cell.addEventListener('contextmenu', handleRightClick);
                
                gridElement.appendChild(cell);
            }
        }
        
        adjustGridSize();
    }
    
    function placeMines(firstRow, firstCol) {
        let minesPlaced = 0;
        while(minesPlaced < minesCount) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            
            if(Math.abs(row - firstRow) > 1 || Math.abs(col - firstCol) > 1) {
                if(!grid[row][col].isMine) {
                    grid[row][col].isMine = true;
                    minesPlaced++;
                }
            }
        }
        calculateNeighborMines();
    }
    
    function calculateNeighborMines() {
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                if(!grid[i][j].isMine) {
                    let count = 0;
                    for(let di = -1; di <= 1; di++) {
                        for(let dj = -1; dj <= 1; dj++) {
                            const ni = i + di;
                            const nj = j + dj;
                            if(ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize) {
                                if(grid[ni][nj].isMine) count++;
                            }
                        }
                    }
                    grid[i][j].neighborMines = count;
                }
            }
        }
    }
    
    function handleClick(event) {
        if(gameOver) return;
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        if(firstClick) {
            firstClick = false;
            placeMines(row, col);
            startTimer();
        }
        
        if(grid[row][col].isFlagged) return;
        
        if(grid[row][col].isMine) {
            gameOver = true;
            revealAllMines();
            const loseMessage = document.documentElement.lang === 'tr' ? 'Oyunu Kaybettiniz!' : 'Game Over!';
            showMessage(loseMessage, 'lose');
            clearInterval(timerInterval);
            return;
        }
        
        revealCell(row, col);
        checkWin();
    }
    
    function handleRightClick(event) {
        event.preventDefault();
        if(gameOver || firstClick) return;
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        
        if(!grid[row][col].isRevealed) {
            grid[row][col].isFlagged = !grid[row][col].isFlagged;
            
            const cell = event.target;
            if(grid[row][col].isFlagged) {
                cell.innerHTML = '<i class="fas fa-flag"></i>';
                cell.classList.add('flagged');
            } else {
                cell.innerHTML = '';
                cell.classList.remove('flagged');
            }
            
            updateMinesCount();
        }
    }
    
    function revealCell(row, col) {
        if(row < 0 || row >= gridSize || col < 0 || col >= gridSize) return;
        if(grid[row][col].isRevealed || grid[row][col].isFlagged) return;
        
        grid[row][col].isRevealed = true;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('revealed');
        
        if(grid[row][col].neighborMines > 0) {
            cell.textContent = grid[row][col].neighborMines;
            
            cell.classList.add(`neighbors-${grid[row][col].neighborMines}`);
        } else {
            for(let di = -1; di <= 1; di++) {
                for(let dj = -1; dj <= 1; dj++) {
                    revealCell(row + di, col + dj);
                }
            }
        }
    }
    
    function revealAllMines() {
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                
                if(grid[i][j].isMine) {
                    cell.innerHTML = '<i class="fas fa-bomb"></i>';
                    cell.classList.add('mine');
                }
                
                if(grid[i][j].isFlagged && !grid[i][j].isMine) {
                    cell.innerHTML = '<i class="fas fa-times"></i>';
                    cell.classList.add('wrong-flag');
                }
            }
        }
    }
    

    function checkWin() {
        let unrevealedSafeCells = 0;
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                if(!grid[i][j].isMine && !grid[i][j].isRevealed) {
                    unrevealedSafeCells++;
                }
            }
        }
        
        if(unrevealedSafeCells === 0) {
            gameOver = true;
            gameWon = true;
            
            for(let i = 0; i < gridSize; i++) {
                for(let j = 0; j < gridSize; j++) {
                    if(grid[i][j].isMine && !grid[i][j].isFlagged) {
                        grid[i][j].isFlagged = true;
                        const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                        cell.innerHTML = '<i class="fas fa-flag"></i>';
                        cell.classList.add('flagged');
                    }
                }
            }
            
            const winMessagePrefix = document.documentElement.lang === 'tr' ? 'Tebrikler! ' : 'Congratulations! ';
            const winMessageSuffix = document.documentElement.lang === 'tr' ? ` saniyede kazandınız!` : ` won in ${timer} seconds!`;
            
            showMessage(winMessagePrefix + timer + winMessageSuffix, 'win');
            clearInterval(timerInterval);
        }
    }
    
    function updateMinesCount() {
        let flagCount = 0;
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                if(grid[i][j].isFlagged) flagCount++;
            }
        }
        document.getElementById('mines-left').textContent = minesCount - flagCount;
    }
    
    function startTimer() {
        clearInterval(timerInterval);
        timer = 0;
        document.getElementById('timer').textContent = timer;
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById('timer').textContent = timer;
        }, 1000);
    }
    
    function showMessage(message, type) {
        const overlay = document.getElementById('message-overlay');
        const messageText = document.getElementById('message-text');
        
        messageText.textContent = message;
        overlay.className = `message-overlay ${type}`;
        
        setTimeout(() => {
            overlay.classList.remove('hidden');
        }, 500);
    }
    
    function startNewGame() {
        gameOver = false;
        gameWon = false;
        firstClick = true;
        clearInterval(timerInterval);
        timer = 0;
        document.getElementById('timer').textContent = '0';
        document.getElementById('mines-left').textContent = minesCount;
        
        const messageOverlay = document.getElementById('message-overlay');
        if(messageOverlay) {
            messageOverlay.classList.add('hidden');
        }
        
        createGrid();
    }
    
    window.addEventListener('resize', adjustGridSize);
    
    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('minesweeper-container')) {
        Minesweeper.init('minesweeper-container');
    }
});