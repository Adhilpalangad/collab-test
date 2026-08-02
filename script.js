/* ============================================
   Cyber Portfolio
   Part 3.1
============================================ */

// ================= Typing Animation =================

const words = [
    "AI Developer",
    "Full Stack Developer",
    "Cybersecurity Enthusiast",
    "Python Programmer",
    "Machine Learning Enthusiast",
    "Open Source Contributor"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const current = words[wordIndex];

    if (!deleting) {

        typing.textContent = current.substring(0, letterIndex);

        letterIndex++;

        if (letterIndex > current.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typing.textContent = current.substring(0, letterIndex);

        letterIndex--;

        if (letterIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 60 : 120);

}

typeEffect();


// ================= Counter Animation =================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let count = 0;

            const speed = target / 120;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target;

                }

            }

            update();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(c => observer.observe(c));


// ================= Cursor Glow =================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (glow) {

        glow.style.left = e.clientX - 15 + "px";

        glow.style.top = e.clientY - 15 + "px";

    }

});


// ================= Navbar Scroll Effect =================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {

        nav.style.background = "rgba(2,6,23,.9)";

        nav.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";

    } else {

        nav.style.background = "rgba(5,10,25,.55)";

        nav.style.boxShadow = "none";

    }

});


// ================= Smooth Scroll =================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        if (href.startsWith("#")) {

            e.preventDefault();

            document.querySelector(href).scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/* =====================================================
   Cyber Portfolio
   Part 3.2
   Scroll Reveal | Tilt | Particles | Parallax
=====================================================*/

// ================= Scroll Reveal =================

const revealElements = document.querySelectorAll(
    ".glass,.stat,.skill-card,.project,.contact a,.profile-card"
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all .8s ease";

        }

    });

}, { threshold: .2 });

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(60px)";

    revealObserver.observe(el);

});


// ================= 3D Tilt Effect =================

document.querySelectorAll(".project,.skill-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y - rect.height / 2) / 15);
        const rotateY = ((rect.width / 2 - x) / 15);

        card.style.transform =

            `perspective(900px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 scale(1.05)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

            "perspective(900px) rotateX(0) rotateY(0) scale(1)";

    });

});


// ================= Floating Particles =================

const particleContainer = document.getElementById("particles");

if (particleContainer) {

    for (let i = 0; i < 60; i++) {

        const dot = document.createElement("span");

        dot.style.position = "absolute";

        dot.style.width = Math.random() * 4 + 2 + "px";

        dot.style.height = dot.style.width;

        dot.style.background = "#38bdf8";

        dot.style.borderRadius = "50%";

        dot.style.left = Math.random() * 100 + "%";

        dot.style.top = Math.random() * 100 + "%";

        dot.style.opacity = Math.random();

        dot.style.animation =

            `floatParticle ${5 + Math.random() * 12}s linear infinite`;

        particleContainer.appendChild(dot);

    }

}


// ================= Floating Animation CSS =================

const style = document.createElement("style");

style.innerHTML = `

@keyframes floatParticle{

0%{

transform:translateY(0);

opacity:0;

}

20%{

opacity:.8;

}

100%{

transform:translateY(-120vh);

opacity:0;

}

}

`;

document.head.appendChild(style);


// ================= Mouse Hover Glow =================

document.querySelectorAll(".project,.skill-card,.stat").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow =

            "0 0 35px rgba(56,189,248,.6)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "";

    });

});


// ================= Hero Parallax =================

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.transform =

            `translateY(${window.scrollY * 0.15}px)`;

    }

});


// ================= Button Ripple =================

document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn => {

    btn.addEventListener("click", (e) => {

        const ripple = document.createElement("span");

        const rect = btn.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple .6s linear";
        ripple.style.pointerEvents = "none";

        btn.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple{

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);


// ================= Live Clock =================

const clock = document.createElement("div");

clock.id = "liveClock";

clock.style.position = "fixed";
clock.style.right = "20px";
clock.style.bottom = "20px";
clock.style.padding = "10px 18px";
clock.style.background = "rgba(0,0,0,.5)";
clock.style.border = "1px solid #38bdf8";
clock.style.borderRadius = "12px";
clock.style.backdropFilter = "blur(10px)";
clock.style.color = "#38bdf8";
clock.style.fontWeight = "600";
clock.style.zIndex = "999";

document.body.appendChild(clock);

setInterval(() => {

    const d = new Date();

    clock.innerHTML = d.toLocaleTimeString();

}, 1000);


// ================= Welcome Animation =================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "opacity 1.2s";

        document.body.style.opacity = "1";

    }, 100);

});

console.log("🚀 Cyber Portfolio Loaded Successfully");
/* ============================================
   Cyber Portfolio
   Part 3.3 - Premium Features
============================================ */

// =========================
// JARVIS Startup Screen
// =========================

window.addEventListener("load", () => {

    const splash = document.createElement("div");

    splash.id = "splash";

    splash.innerHTML = `

<div class="loader-box">

<h1>J.A.R.V.I.S</h1>

<p>Initializing Portfolio...</p>

<div class="loader"></div>

</div>

`;

    document.body.appendChild(splash);

    const css = document.createElement("style");

    css.innerHTML = `

#splash{

position:fixed;

left:0;

top:0;

width:100%;

height:100%;

background:#020617;

display:flex;

justify-content:center;

align-items:center;

z-index:99999;

animation:fadeSplash 4s forwards;

}

.loader-box{

text-align:center;

color:#38bdf8;

}

.loader{

margin:auto;

margin-top:30px;

width:70px;

height:70px;

border-radius:50%;

border:6px solid #38bdf8;

border-top:6px solid transparent;

animation:spin 1s linear infinite;

}

@keyframes spin{

100%{

transform:rotate(360deg);

}

}

@keyframes fadeSplash{

0%,80%{

opacity:1;

}

100%{

opacity:0;

visibility:hidden;

}

}

`;

    document.head.appendChild(css);

    setTimeout(() => {

        splash.remove();

    }, 4200);

});


// =========================
// Dark Mode Toggle
// =========================

const toggle = document.createElement("button");

toggle.innerHTML = "🌙";

toggle.style.position = "fixed";

toggle.style.left = "20px";

toggle.style.bottom = "20px";

toggle.style.width = "55px";

toggle.style.height = "55px";

toggle.style.borderRadius = "50%";

toggle.style.border = "none";

toggle.style.cursor = "pointer";

toggle.style.fontSize = "24px";

toggle.style.background = "#38bdf8";

toggle.style.zIndex = "9999";

document.body.appendChild(toggle);

let dark = true;

toggle.onclick = () => {

    if (dark) {

        document.body.style.background = "#ffffff";

        document.body.style.color = "#111";

        toggle.innerHTML = "☀";

    } else {

        document.body.style.background = "#030712";

        document.body.style.color = "white";

        toggle.innerHTML = "🌙";

    }

    dark = !dark;

};


// =========================
// Shooting Stars
// =========================

function createStar() {

    const star = document.createElement("div");

    star.style.position = "fixed";

    star.style.width = "2px";

    star.style.height = "120px";

    star.style.background = "linear-gradient(white,transparent)";

    star.style.left = Math.random() * window.innerWidth + "px";

    star.style.top = "-100px";

    star.style.transform = "rotate(45deg)";

    star.style.opacity = ".8";

    star.style.zIndex = "-1";

    document.body.appendChild(star);

    let pos = -100;

    const move = setInterval(() => {

        pos += 10;

        star.style.top = pos + "px";

        star.style.left = parseFloat(star.style.left) + 8 + "px";

        if (pos > window.innerHeight) {

            clearInterval(move);

            star.remove();

        }

    }, 16);

}

setInterval(createStar, 2500);


// =========================
// Skill Animation
// =========================

const bars = document.querySelectorAll(".progress div");

const skillObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.width = entry.target.style.width;

        }

    });

});

bars.forEach(bar => {

    skillObserver.observe(bar);

});


// =========================
// AI Assistant Popup
// =========================

setTimeout(() => {

    const popup = document.createElement("div");

    popup.innerHTML = `

🤖 Welcome to Harikrishnan's Portfolio!

`;

    popup.style.position = "fixed";

    popup.style.right = "20px";

    popup.style.top = "90px";

    popup.style.padding = "15px 20px";

    popup.style.background = "#2563eb";

    popup.style.borderRadius = "15px";

    popup.style.boxShadow = "0 0 20px #38bdf8";

    popup.style.zIndex = "9999";

    popup.style.animation = "fadeIn .5s";

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 5000);

}, 5000);


// =========================
// Keyboard Shortcuts
// =========================

document.addEventListener("keydown", (e) => {

    if (e.key === "h") {

        window.location = "#about";

    }

    if (e.key === "p") {

        window.location = "#projects";

    }

    if (e.key === "s") {

        window.location = "#skills";

    }

});


// =========================
// Double Click Easter Egg
// =========================

document.body.addEventListener("dblclick", () => {

    const msg = document.createElement("div");

    msg.innerHTML = "🚀 Welcome Developer!";

    msg.style.position = "fixed";

    msg.style.left = "50%";

    msg.style.top = "50%";

    msg.style.transform = "translate(-50%,-50%)";

    msg.style.padding = "25px";

    msg.style.fontSize = "28px";

    msg.style.background = "#38bdf8";

    msg.style.color = "#000";

    msg.style.borderRadius = "20px";

    msg.style.zIndex = "99999";

    document.body.appendChild(msg);

    setTimeout(() => {

        msg.remove();

    }, 2500);

});


console.log("🔥 Premium Portfolio Activated");