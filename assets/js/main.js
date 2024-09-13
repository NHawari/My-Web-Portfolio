(function() {
    window.addEventListener('scroll', function() {
        const navmenu = document.querySelector('.navmenu');
        
        navmenu.style.opacity = '0.4'; 
    
        clearTimeout(header.dataset.scrollTimer);
    
        navmenu.dataset.scrollTimer = setTimeout(function() {
            navmenu.style.opacity = '1';
        }, 300);
    });

    window.onscroll = function() {
        var header = document.getElementById("header");
        var h3 = header.querySelector("h3"); 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
        if (scrollTop > 50) {
            h3.style.opacity = '0'; 
            h3.style.transition = 'opacity 0.3s ease-in-out'; 
            header.style.backgroundColor = 'Transparent'; 
        } else {
            h3.style.opacity = '1'; 
            header.style.backgroundColor = ''; 
        }
    };
    
    document.addEventListener("DOMContentLoaded", function() {
        const faders = document.querySelectorAll('.fade-in');
    
        const appearOptions = {
            threshold: 0.5,
            rootMargin: "0px 0px -50px 0px"
        };
    
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
    
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const faders = document.querySelectorAll('.fade-in-bottom');
    
        const appearOptions = {
            threshold: 0.5,
            rootMargin: "0px 0px -50px 0px"
        };
    
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);
    
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    });    

    const texts = ["Data Analyst", "Data Scientist", "Software Engineer"];
    const typingSpeed = 100;
    const delayBetweenTexts = 2000; 
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            document.getElementById("text").innerHTML += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenTexts);
        }
    }

    function erase() {
        if (charIndex > 0) {
            document.getElementById("text").innerHTML = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, typingSpeed / 2);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, typingSpeed);
        }
    }
    type();
    
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
    
        let currentSection = "";
    
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 50) {
                currentSection = section.getAttribute('id');
            }
        });
    
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    const canvas = document.getElementById('staticNoiseCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function generateStaticNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const value = Math.random() * 255;
            imageData.data[i] = value;     // Red
            imageData.data[i + 1] = value; // Green
            imageData.data[i + 2] = value; // Blue
            imageData.data[i + 3] = 255;   // Alpha
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function updateStaticNoise() {
        generateStaticNoise();
        requestAnimationFrame(updateStaticNoise);
    }

    updateStaticNoise();  

    document.addEventListener("DOMContentLoaded", function() {
        function initSlides(slideClass) {
            let slideIndex = 0;
            const slides = document.querySelectorAll(slideClass);
    
            function showSlides() {
                slides.forEach((slide, index) => {
                    slide.style.opacity = "0";
                    slide.classList.remove("active");
                });
    
                slideIndex++;
                if (slideIndex > slides.length) { 
                    slideIndex = 1; 
                }
    
                slides[slideIndex - 1].style.opacity = "1";
                slides[slideIndex - 1].classList.add("active");
                setTimeout(showSlides, 3000); 
            }
    
            showSlides();
        }
        initSlides(".project1 .mySlides");
        initSlides(".project2 .mySlides");
        initSlides(".project3 .mySlides");
        initSlides(".project4 .mySlides");
        initSlides(".project5 .mySlides");
        initSlides(".project6 .mySlides");
        initSlides(".project7 .mySlides");
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        let projectsPerPage = getProjectsPerPage(window.innerWidth);
        const projectBoxes = document.querySelectorAll(".project-box");
        const paginationLinks = document.querySelectorAll(".page-link:not(.prev):not(.next)");
        const prevButton = document.querySelector(".page-link.prev");
        const nextButton = document.querySelector(".page-link.next");
        var pageNumbers = document.querySelector('.page-numbers');


        function getProjectsPerPage(width) {
            if (width > 767) {
                return 2; 
            } else {
                return 1;
            }
        }
    
        let currentPage = 1;
        let totalPages = Math.ceil(projectBoxes.length / projectsPerPage);
    
        function updatePaginationButtons() {
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }
    
        function showPage(page) {
            currentPage = page;
            const start = (page - 1) * projectsPerPage;
            const end = start + projectsPerPage;
    
            projectBoxes.forEach((project, index) => {
                project.style.display = index >= start && index < end ? "block" : "none";
            });
    
            paginationLinks.forEach(link => {
                link.classList.remove("active");
            });
            document.querySelector(`.page-link[data-page="${page}"]`).classList.add("active");
    
            updatePaginationButtons();
        }
    
        paginationLinks.forEach(link => {
            link.addEventListener("click", function() {
                const page = parseInt(this.dataset.page);
                if (window.innerWidth < 767) {
                    paginationLinks.forEach(item => {
                        item.style.transform = 'translateX(0)';
                    });
                    if (page === 1) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (page === 2) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (page === 3) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-2.9rem)';
                        });
                    } else if (page === 4) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-5.8rem)';
                        });
                    } else if (page === 5) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-8.7rem)';
                        });
                    } else if (page === 6) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)';
                        });
                    } else {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)'; 
                        });
                    }
                } 
                showPage(page);
            });
        });
    
        prevButton.addEventListener("click", function() {
            if (currentPage > 1) {
                if (window.innerWidth < 767) {
                    paginationLinks.forEach(item => {
                        item.style.transform = 'translateX(0)';
                    });
                    if (currentPage - 1 === 1) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (currentPage - 1 === 2) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (currentPage - 1 === 3) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-2.9rem)';
                        });
                    } else if (currentPage - 1 === 4) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-5.8rem)';
                        });
                    } else if (currentPage - 1 === 5) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-8.7rem)';
                        });
                    } else if (currentPage - 1 === 6) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)';
                        });
                    } else {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)'; 
                        });
                    }
                }
                showPage(currentPage - 1);
            }
        });
    
        nextButton.addEventListener("click", function() {
            if (currentPage < totalPages) {
                if (window.innerWidth < 767) {
                    paginationLinks.forEach(item => {
                        item.style.transform = 'translateX(0)';
                    });
                    if (currentPage + 1 === 1) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (currentPage + 1 === 2) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(0)'; 
                        });
                    } else if (currentPage + 1 === 3) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-2.9rem)';
                        });
                    } else if (currentPage + 1 === 4) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-5.8rem)';
                        });
                    } else if (currentPage + 1 === 5) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-8.7rem)';
                        });
                    } else if (currentPage + 1 === 6) {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)';
                        });
                    } else {
                        paginationLinks.forEach(item => {
                            item.style.transform = 'translateX(-11.6rem)'; 
                        });
                    }
                }
                showPage(currentPage + 1);
            }
        });


        function updateProjectsPerPage() {
            const newProjectsPerPage = getProjectsPerPage(window.innerWidth);
            if (projectsPerPage !== newProjectsPerPage) {
                projectsPerPage = newProjectsPerPage;
                totalPages = Math.ceil(projectBoxes.length / projectsPerPage);
                showPage(1); // Show the first page with the updated project count
            }
        }
    
        window.addEventListener("resize", updateProjectsPerPage);

        showPage(1);
    }); 
})();
