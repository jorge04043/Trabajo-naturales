
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const header = document.getElementById('header-main');
    const main = document.getElementById('main-content');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    header.classList.toggle('active');
    main.classList.toggle('active');
}

function irA(seccion) {
    document.getElementById(seccion).scrollIntoView({ behavior: 'smooth' });
    toggleMenu();
}

function calcularMRU() {
    const distancia = parseFloat(document.getElementById('distancia').value) || 0;
    const tiempo = parseFloat(document.getElementById('tiempo').value) || 0;
    const velocidad = parseFloat(document.getElementById('velocidad').value) || 0;
    const posInicial = parseFloat(document.getElementById('posInicial').value) || 0;
    
    let resultado = '';
    
    if (distancia > 0 && tiempo > 0) {
        const v = distancia / tiempo;
        resultado += `<strong>Velocidad:</strong> ${v.toFixed(2)} m/s<br>`;
        document.getElementById('velocidad').value = v.toFixed(2);
    }
    
    if (velocidad > 0 && tiempo > 0) {
        const d = velocidad * tiempo;
        resultado += `<strong>Distancia:</strong> ${d.toFixed(2)} m<br>`;
        document.getElementById('distancia').value = d.toFixed(2);
    }
    
    if (velocidad > 0 && tiempo > 0) {
        const x = posInicial + velocidad * tiempo;
        resultado += `<strong>Posición final:</strong> ${x.toFixed(2)} m<br>`;
    }
    
    if (distancia > 0 && velocidad > 0) {
        const t = distancia / velocidad;
        resultado += `<strong>Tiempo:</strong> ${t.toFixed(2)} s<br>`;
    }
    
    document.getElementById('resultado').innerHTML = resultado;
    dibujarGrafico(velocidad, tiempo, posInicial);
}

function dibujarGrafico(v, t, x0) {
    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#a8edea');
    gradient.addColorStop(1, '#fed6e3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(550, 250);
    ctx.lineTo(550, 50);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Tiempo (s)', 520, 280);
    ctx.fillText('Posición (m)', 10, 80);
    
    if (v > 0 && t > 0) {
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 250 - (x0 * 2));
        ctx.lineTo(50 + (t * 80), 250 - ((x0 + v * t) * 2));
        ctx.stroke();
        
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(50, 250 - (x0 * 2), 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText('x₀', 35, 265 - (x0 * 2));
    }
}

