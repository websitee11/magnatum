/* ================================================
   MAGNATUM Quantum Engine
   Parallax · Particles · Wave Collapse · Entanglement
   + Formspree Contact Form Integration
   ================================================ */

(function() {
    'use strict';

    // ── Quantum Particle Field ──────────────────────────
    const canvas = document.getElementById('quantumField');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;
    const PARTICLE_COUNT = 120;
    const CONNECTION_DIST = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class QParticle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.phase = Math.random() * Math.PI * 2;
            this.speed = 0.002 + Math.random() * 0.003;
            // Quantum color: indigo, blue, or violet
            const colors = [
                [99, 102, 241],   // indigo
                [6, 182, 212],    // cyan/blue
                [139, 92, 246],   // violet
                [129, 140, 248],  // light indigo
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 0.3 + Math.random() * 0.5;
        }
        update() {
            this.phase += this.speed;
            this.x += this.vx + Math.sin(this.phase) * 0.3;
            this.y += this.vy + Math.cos(this.phase) * 0.2;
            // Mouse interaction — quantum attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 && dist > 0) {
                this.x += dx * 0.002;
                this.y += dy * 0.002;
            }
            // Wrap around
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }
        draw() {
            const pulseAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.phase * 3));
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${pulseAlpha})`;
            ctx.fill();
            // Glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${pulseAlpha * 0.15})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new QParticle());
    }

    function drawEntanglementLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawEntanglementLines();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    // ── Parallax Engine ─────────────────────────────────
    const parallaxStars = document.getElementById('parallaxStars');
    const parallaxNebula = document.getElementById('parallaxNebula');
    const parallaxGrid = document.getElementById('parallaxGrid');

    function updateParallax() {
        const scrollY = window.scrollY;
        if (parallaxStars) parallaxStars.style.transform = `translateY(${scrollY * 0.05}px)`;
        if (parallaxNebula) parallaxNebula.style.transform = `translateY(${scrollY * 0.15}px)`;
        if (parallaxGrid) parallaxGrid.style.transform = `translateY(${scrollY * 0.08}px)`;

        // Content parallax
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax);
            const rect = el.getBoundingClientRect();
            const offset = (rect.top - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }
    window.addEventListener('scroll', updateParallax, { passive: true });

    // ── Navigation ──────────────────────────────────────
    const nav = document.getElementById('qNav');
    const navToggle = document.getElementById('qNavToggle');
    const navLinks = document.getElementById('qNavLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('.q-nav-link').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ── Quantum Observe — Wave Function Collapse ────────
    const observeOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const quantumObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0');
                setTimeout(() => {
                    entry.target.classList.add('q-visible');
                }, delay);
                quantumObserver.unobserve(entry.target);
            }
        });
    }, observeOptions);

    document.querySelectorAll('.quantum-observe').forEach(el => quantumObserver.observe(el));

    // ── Ecosystem Canvas ────────────────────────────────
    const ecoCanvas = document.getElementById('ecosystemCanvas');
    if (ecoCanvas) {
        const ectx = ecoCanvas.getContext('2d');
        let ecoNodes = [];
        let ecoFrame = 0;

        function resizeEco() {
            const rect = ecoCanvas.parentElement.getBoundingClientRect();
            ecoCanvas.width = rect.width;
            ecoCanvas.height = rect.height;
        }
        resizeEco();
        window.addEventListener('resize', resizeEco);

        const nodeData = [
            { label: 'Consultoría', color: [99, 102, 241], x: 0.2, y: 0.3 },
            { label: 'M&A', color: [99, 102, 241], x: 0.15, y: 0.6 },
            { label: 'Risk Mgmt', color: [99, 102, 241], x: 0.3, y: 0.55 },
            { label: 'Fintech', color: [6, 182, 212], x: 0.5, y: 0.25 },
            { label: 'AI/ML', color: [6, 182, 212], x: 0.6, y: 0.5 },
            { label: 'Cloud', color: [6, 182, 212], x: 0.45, y: 0.7 },
            { label: 'Valuación', color: [139, 92, 246], x: 0.8, y: 0.35 },
            { label: 'Capital', color: [139, 92, 246], x: 0.75, y: 0.65 },
            { label: 'MAGNATUM', color: [129, 140, 248], x: 0.5, y: 0.48 },
        ];

        const connections = [
            [0,1],[0,2],[0,8],[1,2],[3,4],[3,5],[3,8],[4,5],[6,7],[6,8],[7,8],
            [0,3],[2,5],[4,6],[1,7],[2,4]
        ];

        nodeData.forEach(nd => {
            ecoNodes.push({
                ...nd,
                px: nd.x * ecoCanvas.width,
                py: nd.y * ecoCanvas.height,
                phase: Math.random() * Math.PI * 2,
                radius: nd.label === 'MAGNATUM' ? 30 : 18,
            });
        });

        function drawEcosystem() {
            ectx.clearRect(0, 0, ecoCanvas.width, ecoCanvas.height);
            ecoFrame++;

            // Update positions
            ecoNodes.forEach(n => {
                n.phase += 0.008;
                n.px = n.x * ecoCanvas.width + Math.sin(n.phase) * 15;
                n.py = n.y * ecoCanvas.height + Math.cos(n.phase * 0.7) * 10;
            });

            // Draw connections
            connections.forEach(([i, j]) => {
                const a = ecoNodes[i], b = ecoNodes[j];
                const grad = ectx.createLinearGradient(a.px, a.py, b.px, b.py);
                grad.addColorStop(0, `rgba(${a.color.join(',')}, 0.2)`);
                grad.addColorStop(1, `rgba(${b.color.join(',')}, 0.2)`);
                ectx.beginPath();
                ectx.moveTo(a.px, a.py);
                ectx.lineTo(b.px, b.py);
                ectx.strokeStyle = grad;
                ectx.lineWidth = 1;
                ectx.stroke();

                // Traveling pulse
                const t = (Math.sin(ecoFrame * 0.02 + i) + 1) / 2;
                const px = a.px + (b.px - a.px) * t;
                const py = a.py + (b.py - a.py) * t;
                ectx.beginPath();
                ectx.arc(px, py, 2, 0, Math.PI * 2);
                ectx.fillStyle = `rgba(${a.color.join(',')}, 0.5)`;
                ectx.fill();
            });

            // Draw nodes
            ecoNodes.forEach(n => {
                // Glow
                const glowGrad = ectx.createRadialGradient(n.px, n.py, 0, n.px, n.py, n.radius * 3);
                glowGrad.addColorStop(0, `rgba(${n.color.join(',')}, 0.2)`);
                glowGrad.addColorStop(1, 'transparent');
                ectx.beginPath();
                ectx.arc(n.px, n.py, n.radius * 3, 0, Math.PI * 2);
                ectx.fillStyle = glowGrad;
                ectx.fill();

                // Node circle
                ectx.beginPath();
                ectx.arc(n.px, n.py, n.radius, 0, Math.PI * 2);
                ectx.fillStyle = `rgba(${n.color.join(',')}, 0.15)`;
                ectx.fill();
                ectx.strokeStyle = `rgba(${n.color.join(',')}, 0.6)`;
                ectx.lineWidth = 1.5;
                ectx.stroke();

                // Label
                ectx.font = n.label === 'MAGNATUM' ? 'bold 11px "JetBrains Mono"' : '10px "Inter"';
                ectx.fillStyle = `rgba(${n.color.join(',')}, 0.9)`;
                ectx.textAlign = 'center';
                ectx.fillText(n.label, n.px, n.py + n.radius + 16);
            });

            requestAnimationFrame(drawEcosystem);
        }
        // Wait for fonts
        setTimeout(drawEcosystem, 500);
    }

    // ── Mini Charts ─────────────────────────────────────
    document.querySelectorAll('.miniChart').forEach(chart => {
        const mctx = chart.getContext('2d');
        const parent = chart.parentElement;

        function drawMiniChart() {
            const w = parent.offsetWidth;
            const h = parent.offsetHeight;
            chart.width = w;
            chart.height = h;

            const points = [];
            const segments = 20;
            for (let i = 0; i <= segments; i++) {
                const x = (i / segments) * w;
                const baseY = h * 0.7 - (i / segments) * h * 0.5;
                const noise = Math.sin(i * 0.8 + Date.now() * 0.001) * h * 0.08;
                points.push({ x, y: baseY + noise });
            }

            // Fill gradient
            const grad = mctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
            grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
            mctx.beginPath();
            mctx.moveTo(0, h);
            points.forEach(p => mctx.lineTo(p.x, p.y));
            mctx.lineTo(w, h);
            mctx.closePath();
            mctx.fillStyle = grad;
            mctx.fill();

            // Line
            mctx.beginPath();
            points.forEach((p, i) => i === 0 ? mctx.moveTo(p.x, p.y) : mctx.lineTo(p.x, p.y));
            const lineGrad = mctx.createLinearGradient(0, 0, w, 0);
            lineGrad.addColorStop(0, '#6366f1');
            lineGrad.addColorStop(1, '#22d3ee');
            mctx.strokeStyle = lineGrad;
            mctx.lineWidth = 2;
            mctx.stroke();

            requestAnimationFrame(drawMiniChart);
        }
        setTimeout(drawMiniChart, 300);
    });

    // ── Code Typing Effect ──────────────────────────────
    const codeEl = document.getElementById('quantumCode');
    if (codeEl) {
        const codeLines = [
            'class QuantumEngine:',
            '    def __init__(self):',
            '        self.state = |ψ⟩',
            '        self.coherence = 0.999',
            '',
            '    def entangle(self, a, b):',
            '        return Bell(a, b)',
            '',
            '    def collapse(self, qubit):',
            '        return measure(qubit)',
        ];
        let lineIdx = 0, charIdx = 0;
        let fullText = '';
        function typeCode() {
            if (lineIdx < codeLines.length) {
                if (charIdx < codeLines[lineIdx].length) {
                    fullText += codeLines[lineIdx][charIdx];
                    charIdx++;
                } else {
                    fullText += '\n';
                    lineIdx++;
                    charIdx = 0;
                }
                codeEl.textContent = fullText;
                setTimeout(typeCode, 30 + Math.random() * 40);
            } else {
                // Reset after pause
                setTimeout(() => { fullText = ''; lineIdx = 0; charIdx = 0; typeCode(); }, 4000);
            }
        }
        setTimeout(typeCode, 1500);
    }

    // ── Counter Animation ───────────────────────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valEl = entry.target.querySelector('.q-metric-val');
                if (valEl && !valEl.dataset.animated) {
                    valEl.dataset.animated = 'true';
                    const target = parseFloat(valEl.dataset.count);
                    const isDecimal = String(target).includes('.');
                    const prefix = valEl.textContent.startsWith('$') ? '$' : '';
                    const unitEl = entry.target.querySelector('.q-metric-unit');
                    const unit = unitEl ? unitEl.textContent : '';
                    const duration = 2000;
                    const start = performance.now();

                    function animate(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        const current = target * eased;
                        if (isDecimal) {
                            valEl.textContent = prefix + current.toFixed(2);
                        } else {
                            valEl.textContent = prefix + Math.round(current);
                        }
                        if (progress < 1) requestAnimationFrame(animate);
                    }
                    requestAnimationFrame(animate);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.q-metric-card').forEach(card => counterObserver.observe(card));

    // ── Form Submission — Formspree to esteban.barrera@magnatum.cl ──
    const form = document.getElementById('quantumForm');
    const formSuccess = document.getElementById('qFormSuccess');
    const submitBtn = document.getElementById('qSubmitBtn');

    if (form) {
        // Sync reply-to field with email input
        const emailInput = document.getElementById('qEmail');
        const replyToField = document.getElementById('replyToField');
        if (emailInput && replyToField) {
            emailInput.addEventListener('input', () => {
                replyToField.value = emailInput.value;
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI: loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                const formData = new FormData(form);

                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.style.display = 'none';
                    formSuccess.classList.add('show');
                    if (window.lucide) lucide.createIcons();
                } else {
                    // Fallback: open mailto
                    const name = formData.get('nombre') || '';
                    const empresa = formData.get('empresa') || '';
                    const cargo = formData.get('cargo') || '';
                    const email = formData.get('email') || '';
                    const tel = formData.get('telefono') || '';
                    const area = formData.get('area_interes') || '';
                    const msg = formData.get('mensaje') || '';
                    const subject = encodeURIComponent('[MAGNATUM Web] Solicitud de ' + name);
                    const body = encodeURIComponent(
                        'Nombre: ' + name + '\n' +
                        'Empresa: ' + empresa + '\n' +
                        'Cargo: ' + cargo + '\n' +
                        'Email: ' + email + '\n' +
                        'Teléfono: ' + tel + '\n' +
                        'Área de interés: ' + area + '\n\n' +
                        'Mensaje:\n' + msg
                    );
                    window.location.href = 'mailto:esteban.barrera@magnatum.cl?subject=' + subject + '&body=' + body;

                    // Reset button
                    if (btnText) btnText.style.display = 'inline';
                    if (btnLoading) btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            } catch (err) {
                // Network error — fallback to mailto
                const formData = new FormData(form);
                const name = formData.get('nombre') || '';
                const empresa = formData.get('empresa') || '';
                const msg = formData.get('mensaje') || '';
                const subject = encodeURIComponent('[MAGNATUM Web] Solicitud de ' + name);
                const body = encodeURIComponent(
                    'Empresa: ' + empresa + '\nNombre: ' + name + '\n\nMensaje:\n' + msg
                );
                window.location.href = 'mailto:esteban.barrera@magnatum.cl?subject=' + subject + '&body=' + body;

                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }

    // ── Smooth Scroll ───────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Holographic Card Tilt ───────────────────────────
    document.querySelectorAll('.q-sol-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
            // Move glow
            const glow = card.querySelector('.q-sol-glow');
            if (glow) {
                glow.style.background = `radial-gradient(ellipse at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(99,102,241,0.25) 0%, transparent 70%)`;
                glow.style.opacity = '1';
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const glow = card.querySelector('.q-sol-glow');
            if (glow) glow.style.opacity = '0';
        });
    });

    // ── Quantum Status Updates ──────────────────────────
    const states = ['SUPERPOSITION', 'ENTANGLED', 'COLLAPSED', 'DECOHERENT', 'SUPERPOSITION'];
    let stateIdx = 0;
    setInterval(() => {
        stateIdx = (stateIdx + 1) % states.length;
        const el = document.getElementById('qState');
        if (el) el.textContent = states[stateIdx];
        const coh = document.getElementById('qCoherence');
        if (coh) coh.textContent = (99.90 + Math.random() * 0.09).toFixed(2) + '%';
    }, 5000);

    // ── Initialize Lucide Icons ─────────────────────────
    if (window.lucide) {
        lucide.createIcons();
    }

})();
