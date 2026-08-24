/* ELEMENTS */

const body = document.body;

const header = document.querySelector(".header");

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");

const revealElements = document.querySelectorAll(".reveal");

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const currentYear = document.getElementById("currentYear");


/* CURRENT YEAR */

currentYear.textContent = new Date().getFullYear();


/* DARK / LIGHT MODE */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    body.classList.add("dark-theme");

    themeToggle.textContent = "☀";

} else {

    themeToggle.textContent = "☾";

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-theme");

    const isDark = body.classList.contains("dark-theme");

    themeToggle.textContent = isDark ? "☀" : "☾";

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

});


/* MOBILE NAVIGATION */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    menuToggle.classList.toggle("active");

});


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

    });

});


/* HEADER SCROLL EFFECT */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ACTIVE NAVIGATION LINK */

function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* SCROLL REVEAL */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* CONTACT FORM */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document
            .getElementById("name")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const subject =
        document
            .getElementById("subject")
            .value
            .trim();

    const message =
        document
            .getElementById("message")
            .value
            .trim();


    if (
        !name ||
        !email ||
        !subject ||
        !message
    ) {

        formStatus.textContent =
            "Please complete all fields.";

        formStatus.style.color =
            "#e05252";

        return;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formStatus.textContent =
            "Please enter a valid email address.";

        formStatus.style.color =
            "#e05252";

        return;

    }


    formStatus.textContent =
        `Thank you, ${name}! Your message is ready to be sent.`;

    formStatus.style.color =
        "#31a873";


    contactForm.reset();


    

});


/* CLOSE MOBILE MENU WHEN CLICKING OUTSIDE */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

    }

});