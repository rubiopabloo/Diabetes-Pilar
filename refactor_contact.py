import re

with open(r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB\contacto.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Title and Subtitle
content = content.replace(
    '''<div class="registration-header" style="text-align: center; padding: 48px 24px 24px;">
            <h1 style="font-size: 38px;">Para poder ayudarte te queremos conocer mas</h1>
            <p>es importante que complete estos datos y brindarte una atención mas personalizada.</p>
        </div>''',
    '''<div class="registration-header" style="text-align: center; padding: 48px 24px 24px;">
            <h1 style="font-size: 32px; color: #1E293B; font-weight: 700; margin-bottom: 12px; line-height: 1.2;">Para poder ayudarte te queremos conocer más</h1>
            <p style="font-size: 16px; color: #475569; max-width: 600px; margin: 0 auto; line-height: 1.5;">Es importante que completes estos datos para poder brindarte una atención más personalizada.</p>
        </div>'''
)

# 2. Update step labels
content = content.replace('Paso 1 de 2', 'Paso 1 de 3')
content = content.replace('Paso 2 de 2', 'Paso 2 de 3')

# 3. Update Step 1 Button
content = content.replace(
    '''<button type="button" class="reg-btn" style="background: #0288D1; color: white; width: 100%;" onclick="nextStep()">''',
    '''<button type="button" class="reg-btn" style="background: #0288D1; color: white; width: 100%;" onclick="nextStep(1)">'''
)

# 4. Split Step 2 into Step 2 and Step 3
# Finding the separation point
sep_point = '<!-- Antecedentes Personales -->'
split_content = content.split(sep_point)

if len(split_content) == 2:
    step3_start = '''
                            <div class="registration-cta-group" style="margin-top: 20px; flex-direction: row; gap: 10px; display: flex;">
                                <button type="button" class="reg-btn" style="background: transparent; border: 1px solid #cbd5e1; color: #475569; flex: 1;" onclick="prevStep(2)">
                                    <i data-lucide="arrow-left"></i>
                                    Volver
                                </button>
                                <button type="button" class="reg-btn" style="background: #00897B; color: white; flex: 1;" onclick="nextStep(2)">
                                    Siguiente
                                    <i data-lucide="arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- PASO 3: Antecedentes & Envío -->
                    <div class="form-step" id="step-3">
                        <div class="registration-card-header">
                            <div class="step-bar" style="background: #43A047;"></div>
                            <div>
                                <p class="step-label" style="color: #43A047;">Paso 3 de 3</p>
                                <h3 class="step-title">Antecedentes</h3>
                            </div>
                        </div>
                        <div class="registration-card-body">
                            <!-- Antecedentes Personales -->'''
    content = split_content[0] + step3_start + split_content[1]

# 5. Remove Email button and update back button in step 3
content = content.replace(
    '''<button type="button" class="reg-btn" style="background: transparent; border: 1px solid #cbd5e1; color: #475569;" onclick="prevStep()">''',
    '''<button type="button" class="reg-btn" style="background: transparent; border: 1px solid #cbd5e1; color: #475569;" onclick="prevStep(3)">'''
)
content = re.sub(r'<button type="button" class="reg-btn reg-btn--email" onclick="sendViaEmail\(\)">.*?Email.*?<i data-lucide="mail"></i>.*?</button>', '', content, flags=re.DOTALL)

# Also ensure "Siguiente Paso" is correct
content = content.replace("Siguiente Paso", "Siguiente")

# 6. Update JS logic
js_logic_old = '''// ── Form Step Navigation ──
        function nextStep() {
            const nombre  = document.getElementById('cf-nombre');
            const apellido= document.getElementById('cf-apellido');
            const dni     = document.getElementById('cf-dni');
            const tel     = document.getElementById('cf-tel');
            const telConf = document.getElementById('cf-tel-confirm');

            const fields = [nombre, apellido, dni, tel, telConf];
            const allOk = fields.map(validateField).every(Boolean);
            
            if (!allOk) return;

            if (tel.value.trim() !== telConf.value.trim()) {
                telConf.classList.add('field-error');
                alert("Los números de teléfono no coinciden.");
                return;
            }

            document.getElementById('step-1').classList.remove('active');
            document.getElementById('step-2').classList.add('active');
        }

        function prevStep() {
            document.getElementById('step-2').classList.remove('active');
            document.getElementById('step-1').classList.add('active');
        }'''

js_logic_new = '''// ── Form Step Navigation ──
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
        }'''

content = content.replace(js_logic_old, js_logic_new)

# 7. Update submit logic to return to step 1 from step 3 and include terms alert
submit_old = '''// Validar campos obligatorios (Paso 2)
            const fields = [terms, obraSoc, motivo];
            const allOk = fields.map(validateField).every(Boolean);
            
            if (!allOk) return;'''
            
submit_new = '''// Validar campos obligatorios (Paso 3)
            const fields = [terms];
            const allOk = fields.map(validateField).every(Boolean);
            
            if (!allOk) {
                alert("Debes aceptar los Términos y Condiciones para continuar.");
                return;
            }'''
content = content.replace(submit_old, submit_new)

content = content.replace('''prevStep();''', '''document.getElementById('step-3').classList.remove('active');
            document.getElementById('step-1').classList.add('active');''')

# 8. Remove the form email JS entirely
content = re.sub(r'// ── Form email ──.*?window\.location\.href.*?}', '', content, flags=re.DOTALL)


with open(r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB\contacto.html", "w", encoding="utf-8") as f:
    f.write(content)

print("contacto.html updated successfully.")
