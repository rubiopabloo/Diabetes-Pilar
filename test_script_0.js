
        lucide.createIcons();

        // ── Mobile menu ──
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', navLinks.classList.contains('active') ? 'x' : 'menu');
                lucide.createIcons();
            });
        }

        // ── Diabetes toggle (Sí / No) ──
        const toggleBtns = document.querySelectorAll('#cf-diabetes-toggle button');
        const diabetesInput = document.getElementById('cf-diabetes');
        const diabetesTypeSection = document.getElementById('diabetes-type-section');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('toggle-active'));
                btn.classList.add('toggle-active');
                
                const isSi = btn.dataset.val === 'Sí';
                diabetesInput.value = isSi ? 'Sí' : 'No';
                
                if (isSi) {
                    diabetesTypeSection.classList.add('active');
                } else {
                    diabetesTypeSection.classList.remove('active');
                    // Uncheck any selected diabetes types
                    document.querySelectorAll('input[name="tipo_diabetes"]').forEach(cb => cb.checked = false);
                }
            });
        });

        // ── Form validation helper ──
        function validateField(el) {
            if (el.type === 'checkbox') {
                const ok = el.checked;
                if (!ok) el.parentElement.classList.add('field-error');
                return ok;
            }
            
            const ok = el.value.trim() !== '';
            if (!ok) {
                el.classList.add('field-error');
                el.addEventListener('input', () => el.classList.remove('field-error'), { once: true });
            }
            return ok;
        }

        // Helper to get checked checkboxes values
        function getCheckedValues(name) {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
        }

        // ── Form Step Navigation ──
        function nextStep(currentStep) {
            if (currentStep === 1) {
                const nombre  = document.getElementById('cf-nombre');
                const apellido= document.getElementById('cf-apellido');
                const dni     = document.getElementById('cf-dni');
                const tel     = document.getElementById('cf-tel');
                const telConf = document.getElementById('cf-tel-confirm');

                const fields = [nombre, apellido, dni, tel, telConf];
                const allOk = fields.map(validateField).every(Boolean);
                
                if (!allOk) {
                    alert("Por favor, completa todos los campos obligatorios resaltados en rojo.");
                    return;
                }

                if (tel.value.trim() !== telConf.value.trim()) {
                    telConf.classList.add('field-error');
                    alert("Los números de teléfono no coinciden.");
                    return;
                }

                document.getElementById('step-1').classList.remove('active');
                document.getElementById('step-2').classList.add('active');
            } else if (currentStep === 2) {
                const obraSoc = document.getElementById('cf-obrasocial');
                const motivo  = document.getElementById('cf-motivo');
                const fields = [obraSoc, motivo];
                const allOk = fields.map(validateField).every(Boolean);
                
                if (!allOk) {
                    alert("Por favor, completa todos los campos obligatorios resaltados en rojo.");
                    return;
                }

                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-3').classList.add('active');
            }
        }

        function prevStep(currentStep) {
            if (currentStep === 2) {
                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-1').classList.add('active');
            } else if (currentStep === 3) {
                document.getElementById('step-3').classList.remove('active');
                document.getElementById('step-2').classList.add('active');
            }
        }

        // ── Form submit ──
        document.getElementById('main-contact-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre  = document.getElementById('cf-nombre');
            const apellido= document.getElementById('cf-apellido');
            const dni     = document.getElementById('cf-dni');
            const tel     = document.getElementById('cf-tel');
            const telConf = document.getElementById('cf-tel-confirm');
            const terms   = document.getElementById('cf-terms');
            
            const obraSoc = document.getElementById('cf-obrasocial');
            const afiliado= document.getElementById('cf-afiliado');
            const motivo  = document.getElementById('cf-motivo');
            const mensaje = document.getElementById('cf-mensaje');

            // Validar campos obligatorios (Paso 3)
            const fields = [terms];
            const allOk = fields.map(validateField).every(Boolean);
            
            if (!allOk) {
                alert("Debes aceptar los Términos y Condiciones para continuar.");
                return;
            }

            // Recopilar datos médicos
            const hasDiabetes = diabetesInput.value;
            const tiposDiabetes = getCheckedValues('tipo_diabetes');
            const tratamientos = getCheckedValues('tratamiento');
            const antecedentes = getCheckedValues('antecedentes');

            const msg = [
                `*Nuevo Registro — Diabetes Pilar*`,
                ``,
                `👤 *DATOS PERSONALES*`,
                `Nombre: ${nombre.value.trim()} ${apellido.value.trim()}`,
                `DNI: ${dni.value.trim()}`,
                `WhatsApp: +54 9 ${tel.value.trim()}`,
                ``,
                `🏥 *DATOS MÉDICOS*`,
                `Obra Social: ${obraSoc.value}`,
                afiliado.value.trim() ? `Nro Afiliado: ${afiliado.value.trim()}` : '',
                `Motivo de consulta: ${motivo.value}`,
                `¿Tengo Diabetes?: ${hasDiabetes}`,
                tiposDiabetes.length > 0 ? `Tipo de Diabetes: ${tiposDiabetes.join(', ')}` : '',
                tratamientos.length > 0 ? `Tratamiento Actual: ${tratamientos.join(', ')}` : '',
                antecedentes.length > 0 ? `Antecedentes: ${antecedentes.join(', ')}` : '',
                ``,
                mensaje.value.trim() ? `📝 *Mensaje:* ${mensaje.value.trim()}` : ''
            ].filter(Boolean).join('\n');

            const waUrl = `https://wa.me/5491121661818?text=${encodeURIComponent(msg)}`;

            // Open WhatsApp
            window.open(waUrl, '_blank');

            // Show success modal
            const modal = document.getElementById('contact-success-modal');
            modal.style.display = 'flex';
            lucide.createIcons();

            // Reset form
            this.reset();
            diabetesInput.value = 'No';
            diabetesTypeSection.classList.remove('active');
            document.querySelectorAll('#cf-diabetes-toggle button').forEach((b, i) => b.classList.toggle('toggle-active', i === 1));
            
            // Go back to step 1
            document.getElementById('step-3').classList.remove('active');
            document.getElementById('step-1').classList.add('active');
        });

        &body=${body}`;
        }

        // ── Close success modal ──
        function closeSuccessModal() {
            document.getElementById('contact-success-modal').style.display = 'none';
        }
        // Also close on backdrop click
        document.getElementById('contact-success-modal').addEventListener('click', function(e) {
            if (e.target === this) closeSuccessModal();
        });
    