// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const menu = document.getElementById('menu');

mobileMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    mobileMenuBtn.innerHTML = menu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            menu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

const scrollFunction = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for fade-in elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Check for elements in view
    fadeInOnScroll();
});

// Add scroll event listeners
window.addEventListener('scroll', () => {
    fadeInOnScroll();
    scrollFunction();
});

// Back to top functionality
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation for images
const pengajianImages = document.querySelectorAll('.pengajian-img');
pengajianImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.transition = 'opacity 0.5s ease';
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
});

// Dynamic date for copyright year
const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').textContent = `© ${currentYear} Kumpulan Pengajian Solo. Hak Cipta Dilindungi.`;

// Search functionality placeholder
const setupSearch = () => {
    // Here you would add actual search functionality when implementing
    // This is just a placeholder for demonstration
    const searchForm = document.createElement('form');
    searchForm.className = 'search-form';
    searchForm.innerHTML = `
        <div style="position: relative; max-width: 400px; margin: 2rem auto;">
            <input type="text" placeholder="Cari pengajian..." style="
                width: 100%;
                padding: 12px 45px 12px 15px;
                border-radius: 30px;
                border: 2px solid var(--secondary-color);
                outline: none;
                font-size: 1rem;
            ">
            <button type="submit" style="
                position: absolute;
                right: 5px;
                top: 5px;
                background: var(--primary-color);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;
    
    // Insert before pengajian list
    const pengajianSection = document.getElementById('pengajian');
    const sectionTitle = pengajianSection.querySelector('.section-title');
    pengajianSection.insertBefore(searchForm, sectionTitle.nextSibling);
    
    // Add event listener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Fitur pencarian akan segera hadir!');
    });
};

// Initialize search after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
});

// Filter buttons for pengajian categories
const setupFilterButtons = () => {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    filterContainer.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin: 1.5rem 0 2.5rem;
    `;
    
    const filters = [
        'Semua', 'Salaf' , 'Fiqih', 'Tafsir', 'Hadits', 'Akhlak',
    ];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.textContent = filter;
        button.className = filter === 'Semua' ? 'filter-btn active' : 'filter-btn';
        button.style.cssText = `
            padding: 8px 16px;
            border-radius: 20px;
            background-color: ${filter === 'Semua' ? 'var(--primary-color)' : 'var(--light-color)'};
            color: ${filter === 'Semua' ? 'var(--white-color)' : 'var(--primary-color)'};
            border: 1px solid var(--primary-color);
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('mouseover', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = 'var(--accent-color)';
                button.style.color = 'var(--white-color)';
            }
        });
        
        button.addEventListener('mouseout', () => {
            if (!button.classList.contains('active')) {
                button.style.backgroundColor = 'var(--light-color)';
                button.style.color = 'var(--primary-color)';
            }
        });
        
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'var(--light-color)';
                btn.style.color = 'var(--primary-color)';
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'var(--white-color)';
            
            // In a real implementation, this would filter the pengajian list
            alert(`Filter ${filter} akan segera diimplementasikan!`);
        });
        
        filterContainer.appendChild(button);
    });
    
    // Insert after search form
    const pengajianSection = document.getElementById('pengajian');
    const searchForm = pengajianSection.querySelector('.search-form');
    pengajianSection.insertBefore(filterContainer, searchForm.nextSibling);
};

// Initialize filter buttons after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        setupFilterButtons();
    }, 100); // Small delay to ensure search form is already inserted
});

// Initialize calendar after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
    }, 200); // Small delay to ensure other elements are already inserted
});

// Script untuk Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialWrapper = document.getElementById('testimonialWrapper');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;

    // Set up testimonial dots functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(slideIndex) {
        // Update current slide
        currentSlide = slideIndex;

        // Move the wrapper
        testimonialWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.style.backgroundColor = 'var(--primary-color)';
            } else {
                dot.style.backgroundColor = '#ccc';
            }
        });
    }

    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        goToSlide(currentSlide);
    }, 5000);

    // Hover effect on ustadz cards
    const ustadzCards = document.querySelectorAll('.fade-in');
    ustadzCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            if (this.style.transform) {
                this.style.transform = 'translateY(-10px)';
            }
        });

        card.addEventListener('mouseout', function() {
            if (this.style.transform) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would normally send the email to your server
                alert(`Terima kasih telah berlangganan dengan email: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // Interactive map for mosque locations
    // This would be replaced with an actual map API in production
    const setupMap = () => {
        // Create a section for the map
        const mapSection = document.createElement('section');
        mapSection.className = 'container';
        mapSection.style.marginTop = '4rem';
        mapSection.style.marginBottom = '4rem';

        mapSection.innerHTML = `
        <h2 class="section-title">Peta Lokasi Pengajian</h2>
        <div style="position: relative; height: 400px; background-color: #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('/api/placeholder/1200/600') no-repeat center center/cover;"></div>
            
            <!-- Map markers -->
            <div class="map-marker" style="position: absolute; top: 45%; left: 30%; cursor: pointer;">
                <div style="width: 20px; height: 20px; background-color: var(--primary-color); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
                <div class="map-tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background-color: white; padding: 8px 12px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); min-width: 150px; display: none;">
                    <h4 style="margin: 0 0 5px; color: var(--primary-color);">Masjid Agung Solo</h4>
                    <p style="margin: 0; font-size: 0.8rem;">Kajian Fiqih Kontemporer</p>
                </div>
            </div>
            
            <div class="map-marker" style="position: absolute; top: 35%; left: 55%; cursor: pointer;">
                <div style="width: 20px; height: 20px; background-color: var(--primary-color); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
                <div class="map-tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background-color: white; padding: 8px 12px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); min-width: 150px; display: none;">
                    <h4 style="margin: 0 0 5px; color: var(--primary-color);">Masjid Al-Hikmah</h4>
                    <p style="margin: 0; font-size: 0.8rem;">Kajian Tafsir Al-Qur'an</p>
                </div>
            </div>
            
            <div class="map-marker" style="position: absolute; top: 65%; left: 70%; cursor: pointer;">
                <div style="width: 20px; height: 20px; background-color: var(--primary-color); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
                <div class="map-tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background-color: white; padding: 8px 12px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); min-width: 150px; display: none;">
                    <h4 style="margin: 0 0 5px; color: var(--primary-color);">Masjid Nurul Huda</h4>
                    <p style="margin: 0; font-size: 0.8rem;">Kajian Hadits Arbain</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 20px; right: 20px; background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <p style="margin: 0; font-size: 0.8rem;">*Ini adalah peta ilustrasi</p>
            </div>
        </div>
        <div style="text-align: center; margin-top: 1.5rem;">
            <a href="#" class="btn">Lihat Semua Lokasi</a>
        </div>
        `;

        // Insert before contact section
        const contactSection = document.getElementById('contact');
        contactSection.parentNode.insertBefore(mapSection, contactSection);

        // Add interactivity to map markers
        setTimeout(() => {
            const mapMarkers = document.querySelectorAll('.map-marker');
            mapMarkers.forEach(marker => {
                marker.addEventListener('mouseover', function() {
                    this.querySelector('.map-tooltip').style.display = 'block';
                });
                
                marker.addEventListener('mouseout', function() {
                    this.querySelector('.map-tooltip').style.display = 'none';
                });
                
                marker.addEventListener('click', function() {
                    const title = this.querySelector('h4').textContent;
                    alert(`Anda memilih ${title}. Informasi detail akan segera hadir!`);
                });
            });
        }, 100);
    };

    // Add upcoming events ticker
    const setupEventsTicker = () => {
        const tickerContainer = document.createElement('div');
        tickerContainer.className = 'events-ticker';
        tickerContainer.style.cssText = `
        background-color: var(--primary-color);
        color: white;
        padding: 10px 0;
        overflow: hidden;
        position: relative;
        `;

        const tickerContent = document.createElement('div');
        tickerContent.className = 'ticker-content';
        tickerContent.style.cssText = `
        display: flex;
        animation: ticker 30s linear infinite;
        white-space: nowrap;
        `;

        const events = [
        'Kajian Akbar "Menyambut Bulan Suci Ramadhan" - Masjid Agung Solo - 15 Mei 2025',
        'Pengajian Rutin Ibu-Ibu - Masjid Al-Hikmah - Setiap Jumat, 16.00 WIB',
        'Kajian Dhuha "Membentuk Pribadi Islami" - Masjid Nurul Huda - Setiap Minggu, 09.00 WIB',
        'Tabligh Akbar "Menjaga Persatuan Umat" - Alun-Alun Kidul - 20 Mei 2025',
        'Kajian Subuh bersama Ustadz Ahmad Zuhdi - Masjid Al-Falah - Setiap Ahad'
        ];

        // Create event items
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'ticker-item';
            eventItem.style.cssText = `
                padding: 0 20px;
                display: flex;
                align-items: center;
            `;

            eventItem.innerHTML = `
                <i class="fas fa-bullhorn" style="margin-right: 10px;"></i>
                <span>${event}</span>
            `;

            tickerContent.appendChild(eventItem);
        });

        // Create duplicate items for seamless loop
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'ticker-item';
            eventItem.style.cssText = `
                padding: 0 20px;
                display: flex;
                align-items: center;
            `;

            eventItem.innerHTML = `
                <i class="fas fa-bullhorn" style="margin-right: 10px;"></i>
                <span>${event}</span>
            `;

            tickerContent.appendChild(eventItem);
        });

        tickerContainer.appendChild(tickerContent);

        // Add animation style
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .events-ticker:hover .ticker-content {
            animation-play-state: paused;
        }
        `;
        document.head.appendChild(styleElement);

        // Insert after header
        const header = document.querySelector('header');
        header.parentNode.insertBefore(tickerContainer, header.nextSibling);
    };

    // Add FAQ section
    const setupFAQ = () => {
        const faqSection = document.createElement('section');
        faqSection.className = 'container';
        faqSection.style.marginTop = '4rem';

        faqSection.innerHTML = `
        <h2 class="section-title">Pertanyaan Umum</h2>
        <div style="max-width: 800px; margin: 0 auto;">
            <!-- FAQ Item 1 -->
            <div class="faq-item" style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
                <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 1rem 0;">
                    <h3 style="font-size: 1.1rem; color: var(--primary-color); margin: 0;">Bagaimana cara mendaftarkan pengajian di website ini?</h3>
                    <i class="fas fa-chevron-down" style="color: var(--primary-color); transition: transform 0.3s ease;"></i>
                </div>
                <div class="faq-answer" style="padding: 0 1rem 1rem; display: none;">
                    <p>Untuk mendaftarkan pengajian, Anda dapat menghubungi kami melalui halaman kontak atau mengklik tombol "Daftarkan Pengajian" pada website ini. Tim kami akan menghubungi Anda untuk memverifikasi informasi pengajian yang akan ditampilkan.</p>
                </div>
            </div>
            
            <!-- FAQ Item 2 -->
            <div class="faq-item" style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
                <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 1rem 0;">
                    <h3 style="font-size: 1.1rem; color: var(--primary-color); margin: 0;">Apakah informasi pengajian di website ini selalu diperbarui?</h3>
                    <i class="fas fa-chevron-down" style="color: var(--primary-color); transition: transform 0.3s ease;"></i>
                </div>
                <div class="faq-answer" style="padding: 0 1rem 1rem; display: none;">
                    <p>Ya, kami selalu memperbarui informasi pengajian secara rutin. Tim kami juga selalu memverifikasi setiap informasi untuk memastikan keakuratan data yang ditampilkan di website.</p>
                </div>
            </div>
            
            <!-- FAQ Item 3 -->
            <div class="faq-item" style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
                <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 1rem 0;">
                    <h3 style="font-size: 1.1rem; color: var(--primary-color); margin: 0;">Apakah ada biaya untuk mengakses informasi di website ini?</h3>
                    <i class="fas fa-chevron-down" style="color: var(--primary-color); transition: transform 0.3s ease;"></i>
                </div>
                <div class="faq-answer" style="padding: 0 1rem 1rem; display: none;">
                    <p>Tidak, semua informasi pengajian yang tersedia di website kami dapat diakses secara gratis. Kami berkomitmen untuk memudahkan masyarakat Muslim di Solo Raya dalam mencari informasi kajian Islam.</p>
                </div>
            </div>
            
            <!-- FAQ Item 4 -->
            <div class="faq-item" style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
                <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 1rem 0;">
                    <h3 style="font-size: 1.1rem; color: var(--primary-color); margin: 0;">Bagaimana cara berlangganan notifikasi pengajian terbaru?</h3>
                    <i class="fas fa-chevron-down" style="color: var(--primary-color); transition: transform 0.3s ease;"></i>
                </div>
                <div class="faq-answer" style="padding: 0 1rem 1rem; display: none;">
                    <p>Anda dapat berlangganan notifikasi pengajian terbaru dengan mendaftarkan email Anda pada form newsletter di website ini. Kami akan mengirimkan informasi pengajian terbaru secara berkala ke email Anda.</p>
                </div>
            </div>
        </div>
        `;

        // Insert before footer
        const footer = document.querySelector('footer');
        footer.parentNode.insertBefore(faqSection, footer);

        // Add interactivity to FAQ items
        setTimeout(() => {
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    
                    // Toggle answer visibility
                    if (answer.style.display === 'none' || !answer.style.display) {
                        answer.style.display = 'block';
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        answer.style.display = 'none';
                        icon.style.transform = 'rotate(0)';
                    }
                });
            });
        }, 100);
    };

    // Add WhatsApp floating button
    const addWhatsAppButton = () => {
        const whatsappButton = document.createElement('a');
        whatsappButton.href = "#"; // Replace with your WhatsApp link
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: #25D366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 99;
        animation: pulse 1.5s infinite;
        `;

        whatsappButton.innerHTML = `<i class="fab fa-whatsapp" style="font-size: 2rem;"></i>`;

        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'whatsapp-tooltip';
        tooltip.style.cssText = `
        position: absolute;
        bottom: 70px;
        left: 0;
        background-color: white;
        color: #333;
        padding: 8px 12px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        min-width: 150px;
        display: none;
        font-size: 0.9rem;
        `;
        tooltip.textContent = 'Hubungi kami via WhatsApp';

        // Add pulse animation
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        `;
        document.head.appendChild(styleElement);

        whatsappButton.appendChild(tooltip);
        document.body.appendChild(whatsappButton);

        // Add interactivity
        whatsappButton.addEventListener('mouseover', () => {
            tooltip.style.display = 'block';
        });

        whatsappButton.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        whatsappButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Fitur WhatsApp akan segera hadir!');
        });
    };

    // Initialize all additional components
    document.addEventListener('DOMContentLoaded', () => {
        // Add delay to ensure the main content is loaded first
        setTimeout(() => {
            setupMap();
            setupEventsTicker();
            setupFAQ();
            addWhatsAppButton();
        }, 300);
    });

    // Add preloader
    const addPreloader = () => {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
        `;

        preloader.innerHTML = `
        <div style="width: 80px; height: 80px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <h2 style="margin-top: 20px; color: var(--primary-color);">Kumpulan Pengajian Solo</h2>
        <p style="color: #666;">Memuat...</p>
        `;

        // Add spin animation
        const styleElement = document.createElement('style');
        styleElement.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        `;
        document.head.appendChild(styleElement);

        document.body.appendChild(preloader);

        // Hide preloader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Remove preloader after animation
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        });
    };

    // Add preloader immediately
    addPreloader();

    // Add theme switch functionality
    const addThemeSwitch = () => {
        const themeButton = document.createElement('button');
        themeButton.id = 'theme-switch';
        themeButton.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 98;
        transition: background-color 0.3s ease;
        `;

        themeButton.innerHTML = `<i class="fas fa-moon"></i>`;

        document.body.appendChild(themeButton);

        // Theme switch functionality
        let darkMode = false;

        themeButton.addEventListener('click', () => {
            if (darkMode) {
                // Switch to light mode
                document.documentElement.style.setProperty('--primary-color', '#1b5e20');
                document.documentElement.style.setProperty('--secondary-color', '#4caf50');
                document.documentElement.style.setProperty('--accent-color', '#8bc34a');
                document.documentElement.style.setProperty('--light-color', '#e8f5e9');
                document.documentElement.style.setProperty('--dark-color', '#0a3410');
                document.body.style.backgroundColor = '#f5f5f5';
                document.body.style.color = '#333';
                themeButton.innerHTML = `<i class="fas fa-moon"></i>`;
            } else {
                // Switch to dark mode
                document.documentElement.style.setProperty('--primary-color', '#2e7d32');
                document.documentElement.style.setProperty('--secondary-color', '#388e3c');
                document.documentElement.style.setProperty('--accent-color', '#7cb342');
                document.documentElement.style.setProperty('--light-color', '#1c2827');
                document.documentElement.style.setProperty('--dark-color', '#081c08');
                document.body.style.backgroundColor = '#121212';
                document.body.style.color = '#e0e0e0';
                themeButton.innerHTML = `<i class="fas fa-sun"></i>`;
            }

            darkMode = !darkMode;
        });
    };

    // Add theme switch after DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            addThemeSwitch();
        }, 400);
    });
}); // Correctly closed the function.