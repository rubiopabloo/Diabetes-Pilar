const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace 1: Add to accordion
const accordionTarget = `                            <!-- Pie Diabético -->
                            <div class="accordion-item" data-service="piediabetico" onclick="handleServiceClick('piediabetico', this)">
                                <img src="assets/piediabetico.jpg" alt="Pie Diabético" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Pie Diabético</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>`;

const extraAccordion = `
                            <!-- Oftalmología -->
                            <div class="accordion-item" data-service="oftalmologia" onclick="handleServiceClick('oftalmologia', this)">
                                <img src="assets/oftalmologia.jpg" alt="Oftalmología" loading="lazy" onerror="this.src='assets/diagnosticoporimagenes.jpg'">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Oftalmología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Ginecología -->
                            <div class="accordion-item" data-service="ginecologia" onclick="handleServiceClick('ginecologia', this)">
                                <img src="assets/ginecologia.jpg" alt="Ginecología" loading="lazy" onerror="this.src='assets/diagnosticoporimagenes.jpg'">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Ginecología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Gastroenterología -->
                            <div class="accordion-item" data-service="gastroenterologia" onclick="handleServiceClick('gastroenterologia', this)">
                                <img src="assets/gastroenterologia.jpg" alt="Gastroenterología" loading="lazy" onerror="this.src='assets/diagnosticoporimagenes.jpg'">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Gastroenterología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>`;

if (html.includes(accordionTarget)) {
    html = html.replace(accordionTarget, accordionTarget + extraAccordion);
}

// Replace 2: Add to serviceData
const serviceDataTarget = `                    'Educación intensiva sobre el autocuidado del pie.'
                ]
            }
        };`;

const extraServiceData = `                    'Educación intensiva sobre el autocuidado del pie.'
                ]
            },
            'oftalmologia': {
                title: 'Oftalmología',
                subtitle: 'Salud Visual y Prevención',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Especialistas en la salud integral de tus ojos, con foco en el control de retinopatía diabética.',
                bullets: [
                    'Exámenes de fondo de ojo.',
                    'Detección y seguimiento de retinopatía diabética.',
                    'Evaluación de agudeza visual.',
                    'Control y prevención de cataratas y glaucoma.'
                ]
            },
            'ginecologia': {
                title: 'Ginecología',
                subtitle: 'Salud Femenina Integral',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Atención ginecológica integral con especial atención en mujeres con diabetes y riesgo metabólico.',
                bullets: [
                    'Control ginecológico anual.',
                    'Asesoramiento en planificación familiar.',
                    'Manejo de diabetes gestacional.',
                    'Prevención integral de patologías femeninas.'
                ]
            },
            'gastroenterologia': {
                title: 'Gastroenterología',
                subtitle: 'Salud Digestiva y Metabólica',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Evaluación y tratamiento del sistema digestivo para optimizar la salud metabólica del paciente.',
                bullets: [
                    'Manejo de patologías digestivas comunes.',
                    'Estudios endoscópicos preventivos.',
                    'Asesoramiento en salud intestinal y microbiota.',
                    'Evaluación de complicaciones gastrointestinales por diabetes.'
                ]
            }
        };`;

if (html.includes(serviceDataTarget)) {
    html = html.replace(serviceDataTarget, extraServiceData);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html elements');

// UPDATE CONTACTO.HTML
let contacto = fs.readFileSync('contacto.html', 'utf8');

const contactFormTarget = `<div class="input-group">
                            <label for="mensaje">Dejanos tu mensaje y te contactaremos a la brevedad</label>
                            <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribí tu mensaje acá..."></textarea>
                        </div>

                        <button type="submit" class="contact-submit-btn">Enviar Mensaje</button>`;

const newContactForm = `<div class="input-group">
                            <label>Tratamiento Actual (Opcional)</label>
                            <div class="cf-tags-group">
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="pill" style="width:14px;height:14px;"></i> Medicación Oral
                                </div>
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="syringe" style="width:14px;height:14px;"></i> Insulina
                                </div>
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="activity" style="width:14px;height:14px;"></i> Bomba de Insulina
                                </div>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Antecedentes (Opcional)</label>
                            <div class="cf-tags-group">
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="heart" style="width:14px;height:14px;"></i> Riesgo Cardiovascular
                                </div>
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="eye" style="width:14px;height:14px;"></i> Oftalmológicos
                                </div>
                                <div class="cf-tag-btn" onclick="this.classList.toggle('tag-active');">
                                    <i data-lucide="file-warning" style="width:14px;height:14px;"></i> Renales
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="mensaje">Dejanos tu mensaje y te contactaremos a la brevedad</label>
                            <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribí tu mensaje acá..."></textarea>
                        </div>

                        <div class="contact-cta-group">
                            <button type="submit" class="contact-submit-btn" style="flex:1;">Enviar por WhatsApp</button>
                            <button type="button" class="contact-submit-btn email-btn" style="flex:1;">Enviar Email</button>
                        </div>`;

if (contacto.includes(contactFormTarget)) {
    contacto = contacto.replace(contactFormTarget, newContactForm);
    fs.writeFileSync('contacto.html', contacto, 'utf8');
    console.log('Updated contacto.html contact form');
}

// UPDATE NOTICIAS.HTML
let noticias = fs.readFileSync('noticias.html', 'utf8');
noticias = noticias.replace(/<button class="leer-mas-btn">Leer nota completa<\/button>/g, '');
fs.writeFileSync('noticias.html', noticias, 'utf8');
console.log('Updated noticias.html (removed leer nota completa)');
