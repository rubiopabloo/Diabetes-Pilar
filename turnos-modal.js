// ===== Turnos Online Modal System =====
// Self-injecting modal — just include this script in any page.

(function() {
    // ----- CSS -----
    const modalCSS = document.createElement('style');
    modalCSS.textContent = `
    /* Turnos Modal Overlay */
    .turnos-modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.35s ease;
    }
    .turnos-modal-overlay.active {
        display: flex;
        opacity: 1;
    }

    /* Modal Container */
    .turnos-modal-container {
        position: relative;
        width: 100%;
        max-width: 1060px;
        max-height: 92vh;
        background: white;
        border-radius: 28px;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        scrollbar-color: rgba(2, 136, 209, 0.2) transparent;
        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
        transform: scale(0.92) translateY(20px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .turnos-modal-overlay.active .turnos-modal-container {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    .turnos-modal-container::-webkit-scrollbar {
        width: 8px;
    }
    .turnos-modal-container::-webkit-scrollbar-track {
        background: transparent;
        margin: 16px 0;
    }
    .turnos-modal-container::-webkit-scrollbar-thumb {
        background: rgba(2, 136, 209, 0.18);
        border-radius: 20px;
        border: 2px solid transparent;
        background-clip: padding-box;
    }
    .turnos-modal-container::-webkit-scrollbar-thumb:hover {
        background: rgba(2, 136, 209, 0.35);
        border: 2px solid transparent;
        background-clip: padding-box;
    }

    /* Close Button */
    .turnos-modal-close {
        position: absolute;
        top: 20px; right: 20px;
        width: 44px; height: 44px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.25);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
        color: white;
        z-index: 3;
        transition: all 0.25s ease;
    }
    .turnos-modal-close:hover {
        background: rgba(255,255,255,0.3);
        transform: rotate(90deg);
    }
    .turnos-modal-close svg {
        width: 20px; height: 20px;
        stroke: currentColor; stroke-width: 2.5;
        fill: none; stroke-linecap: round; stroke-linejoin: round;
    }

    /* Header */
    .tm-header {
        background: linear-gradient(135deg, #0277BD 0%, #01579B 40%, #004c8c 100%);
        padding: 30px 50px 25px;
        position: relative;
        overflow: hidden;
    }
    .tm-header::before {
        content: '';
        position: absolute;
        top: -80px; right: -80px;
        width: 300px; height: 300px;
        border-radius: 50%;
        background: rgba(79, 195, 247, 0.15);
        filter: blur(60px);
    }
    .tm-header::after {
        content: '';
        position: absolute;
        bottom: -50px; left: 30%;
        width: 180px; height: 180px;
        border-radius: 50%;
        background: rgba(255,255,255,0.06);
    }
    .tm-header-content { position: relative; z-index: 2; }
    .tm-label {
        font-size: 11px; text-transform: uppercase;
        letter-spacing: 2.5px; color: rgba(255,255,255,0.6);
        font-weight: 700; margin-bottom: 8px;
    }
    .tm-title {
        color: white; font-size: 32px;
        font-weight: 800; line-height: 1.1;
        letter-spacing: -0.8px; margin-bottom: 8px;
    }
    .tm-subtitle {
        color: rgba(255,255,255,0.8);
        font-size: 14px; line-height: 1.5;
        max-width: 600px;
    }

    /* Body */
    .tm-body { padding: 25px 50px 35px; }
    .tm-intro {
        text-align: center;
        font-size: 14px; color: #475569;
        line-height: 1.6;
        margin-bottom: 20px;
    }
    .tm-intro a {
        color: #0288D1; font-weight: 700;
        text-decoration: none;
        border-bottom: 2px solid rgba(2,136,209,0.25);
        transition: border-color 0.3s;
    }
    .tm-intro a:hover { border-bottom-color: #0288D1; }

    /* Cards Grid */
    .tm-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 25px;
    }
    .tm-card {
        background: #f8fafc;
        border-radius: 18px;
        padding: 22px 18px;
        border: 1px solid #f1f5f9;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .tm-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    }
    .tm-card-icon {
        width: 44px; height: 44px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 15px;
    }
    .tm-card-icon svg {
        width: 22px; height: 22px;
        stroke: currentColor; stroke-width: 2;
        fill: none; stroke-linecap: round; stroke-linejoin: round;
    }
    .tm-icon-blue { background: #e1f5fe; color: #0288d1; }
    .tm-icon-green { background: #e8f5e9; color: #2e7d32; }
    .tm-icon-orange { background: #fff3e0; color: #ef6c00; }
    .tm-card h4 {
        font-size: 16px; font-weight: 800;
        color: #1E293B; margin-bottom: 8px;
    }
    .tm-card p {
        font-size: 12.5px; color: #475569;
        line-height: 1.5; margin: 0;
    }
    .tm-card ul {
        list-style: none; padding: 0; margin: 0;
    }
    .tm-card ul li {
        position: relative; padding-left: 18px;
        margin-bottom: 5px; font-size: 12.5px;
        color: #475569; line-height: 1.4;
    }
    .tm-card ul li::before {
        content: "\\2713"; position: absolute; left: 0;
        color: #2e7d32; font-weight: 800;
    }

    /* CTA */
    .tm-cta-text {
        text-align: center; font-size: 15px;
        font-weight: 700; color: #1E293B;
        margin-bottom: 18px;
    }
    .tm-buttons {
        display: flex; justify-content: center;
        gap: 15px; flex-wrap: wrap;
    }
    .tm-btn {
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 8px; width: 210px;
        padding: 20px 15px; border-radius: 18px;
        text-decoration: none; font-weight: 800;
        font-size: 15px; transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    .tm-btn:hover { transform: translateY(-3px); }
    .tm-btn-icon {
        width: 44px; height: 44px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
    }
    .tm-btn-icon svg {
        width: 22px; height: 22px;
        stroke: currentColor; stroke-width: 2;
        fill: none; stroke-linecap: round; stroke-linejoin: round;
    }
    .tm-btn-socio {
        background: linear-gradient(135deg, #0288d1, #01579b);
        color: white;
        box-shadow: 0 6px 18px rgba(2,136,209,0.25);
    }
    .tm-btn-socio:hover {
        box-shadow: 0 10px 24px rgba(2,136,209,0.35);
        color: white;
    }
    .tm-btn-socio .tm-btn-icon {
        background: rgba(255,255,255,0.2); color: white;
    }
    .tm-btn-nosocio {
        background: white; color: #1E293B;
        border-color: #e2e8f0;
        box-shadow: 0 6px 18px rgba(0,0,0,0.04);
    }
    .tm-btn-nosocio:hover {
        border-color: #0288d1;
        box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        color: #1E293B;
    }
    .tm-btn-nosocio .tm-btn-icon {
        background: #e1f5fe; color: #0288d1;
    }
    .tm-btn-label {
        font-size: 10px; font-weight: 500;
        opacity: 0.65; text-transform: uppercase;
        letter-spacing: 0.8px;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .tm-header { padding: 25px 20px 20px; }
        .tm-title { font-size: 24px !important; }
        .tm-body { padding: 20px 15px 25px; }
        .tm-cards { grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px; }
        .tm-card { padding: 15px; }
        .tm-buttons { flex-direction: column; align-items: center; gap: 10px; }
        .tm-btn { width: 100%; max-width: 260px; padding: 15px; }
        .tm-cta-text { font-size: 13.5px; margin-bottom: 15px; }
        .turnos-modal-container { border-radius: 20px; }
    }
    @media (max-width: 480px) {
        .tm-title { font-size: 22px !important; }
        .tm-subtitle { font-size: 13px; }
        .turnos-modal-close { top: 14px; right: 14px; width: 38px; height: 38px; }
    }
    `;
    document.head.appendChild(modalCSS);

    // ----- HTML -----
    const modalHTML = `
    <div class="turnos-modal-overlay" id="turnosModalOverlay" onclick="if(event.target===this)closeTurnosModal()">
        <div class="turnos-modal-container" style="position:relative;">
            
            <!-- PRÓXIMAMENTE OVERLAY -->
            <div style="position: absolute; inset: 0; z-index: 10; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); background: rgba(255,255,255,0.45); display: flex; align-items: center; justify-content: center; border-radius: 28px;">
                <div style="background: rgba(2, 136, 209, 0.95); color: white; padding: 15px 40px; border-radius: 50px; font-weight: 800; font-size: clamp(20px, 4vw, 28px); letter-spacing: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transform: rotate(-5deg); text-align: center;">PRÓXIMAMENTE</div>
            </div>

            <button class="turnos-modal-close" onclick="closeTurnosModal()" style="z-index: 11;">
                <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="tm-header">
                <div class="tm-header-content">
                    <p class="tm-label">Turnos Online</p>
                    <h2 class="tm-title">Gestión de Turnos Online</h2>
                    <p class="tm-subtitle">Reserve, modifique o cancele sus turnos médicos de forma inmediata, las 24 horas del día, los 7 días de la semana.</p>
                </div>
            </div>
            <div class="tm-body">
                <p class="tm-intro">
                    Nuestro sistema le permite gestionar turnos online para socios y no socios, en los consultorios de <a href="https://maps.google.com/?q=Av.+Pueyrred%C3%B3n+1341+CABA" target="_blank">Av. Pueyrredón 1341, CABA</a>.
                </p>
                <div class="tm-cards">
                    <div class="tm-card">
                        <div class="tm-card-icon tm-icon-blue">
                            <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        </div>
                        <h4>Tiempo</h4>
                        <p>Reserve sus turnos en forma inmediata, en cualquier momento del día, sin necesidad de espera en llamadas telefónicas o gestiones personalizadas.</p>
                    </div>
                    <div class="tm-card">
                        <div class="tm-card-icon tm-icon-green">
                            <svg viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                        </div>
                        <h4>Beneficios</h4>
                        <ul>
                            <li>Programar turnos</li>
                            <li>Modificar los turnos programados</li>
                            <li>Cancelar los turnos programados</li>
                        </ul>
                    </div>
                    <div class="tm-card">
                        <div class="tm-card-icon tm-icon-orange">
                            <svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        <h4>Actualización Inmediata</h4>
                        <p>El sistema informará inmediatamente sobre reprogramaciones, cambios o cancelaciones en los turnos asignados.</p>
                    </div>
                </div>
                <p class="tm-cta-text">Para acceder al sistema de Turnos, pulse la opción que corresponda:</p>
                <div class="tm-buttons">
                    <a href="#" class="tm-btn tm-btn-socio" target="_blank">
                        <div class="tm-btn-icon">
                            <svg viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2"></rect><path d="M3 10h18"></path><path d="M7 15h.01"></path><path d="M11 15h2"></path></svg>
                        </div>
                        <span>SOY SOCIO</span>
                        <span class="tm-btn-label">Acceder con credencial</span>
                    </a>
                    <a href="#" class="tm-btn tm-btn-nosocio" target="_blank">
                        <div class="tm-btn-icon">
                            <svg viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <span>NO SOY SOCIO</span>
                        <span class="tm-btn-label">Acceder como particular</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`;

    // Inject into page
    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // ----- JS API -----
    window.openTurnosModal = function() {
        const overlay = document.getElementById('turnosModalOverlay');
        if (!overlay) return;
        overlay.style.display = 'flex';
        // Force reflow then animate
        void overlay.offsetWidth;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeTurnosModal = function() {
        const overlay = document.getElementById('turnosModalOverlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        setTimeout(function() {
            overlay.style.display = 'none';
        }, 350);
        document.body.style.overflow = '';
    };

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeTurnosModal();
    });
})();
