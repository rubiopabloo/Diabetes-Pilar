const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const anchor = "            'piediabetico': {";

if (html.includes("'oftalmologia': {")) {
    console.log("Payloads already exist.");
} else {
    let index = html.indexOf(anchor);
    if (index !== -1) {
        const payload = `            'oftalmologia': {
                title: 'Oftalmología',
                subtitle: 'Salud Visual Integral',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Prevenimos y tratamos complicaciones visuales asociadas a la diabetes y afecciones generales del ojo.',
                bullets: [
                    'Controles de fondo de ojo rutinarios.',
                    'Diagnóstico temprano de retinopatía diabética.',
                    'Detección y tratamiento de cataratas.',
                    'Cuidado especializado para personas con riesgo oftalmológico.'
                ]
            },
            'ginecologia': {
                title: 'Ginecología',
                subtitle: 'Atención Ginecológica Especializada',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Cuidado integral para la salud de la mujer, desde consultas de rutina hasta seguimiento en pacientes diabéticas.',
                bullets: [
                    'Controles ginecológicos y PAP.',
                    'Consultas preconcepcionales en pacientes con diabetes.',
                    'Manejo de menopausia y alteraciones hormonales.',
                    'Asesoría en salud reproductiva.'
                ]
            },
            'gastroenterologia': {
                title: 'Gastroenterología',
                subtitle: 'Salud del Sistema Digestivo',
                image: 'assets/diagnosticoporimagenes.jpg',
                description: 'Diagnóstico y tratamiento de las enfermedades del aparato digestivo con un enfoque integral.',
                bullets: [
                    'Evaluación de alteraciones digestivas crónicas.',
                    'Diagnóstico de problemas hepáticos y biliares.',
                    'Tratamiento de afecciones funcionales gastrointestinales.',
                    'Estudios endoscópicos recomendados.'
                ]
            },
`;
        html = html.slice(0, index) + payload + html.slice(index);
        fs.writeFileSync('index.html', html, 'utf8');
        console.log("Payloads injected.");
    } else {
        console.log("Could not find anchor.");
    }
}
