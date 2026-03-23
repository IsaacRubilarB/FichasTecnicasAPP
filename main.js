// Esperar a que el HTML cargue por completo
document.addEventListener('DOMContentLoaded', () => {
    const gridAviones = document.getElementById('grid-aviones');
    const seccionFichas = document.getElementById('seccion-fichas');
    const seleccionAvion = document.getElementById('seleccion-avion');
    const listaDocumentos = document.getElementById('lista-documentos');
    const tituloAvion = document.getElementById('titulo-avion');

    // 1. Renderizar los aviones desde data.js
    if (typeof flota !== 'undefined') {
        flota.forEach(avion => {
            const card = document.createElement('div');
            card.className = 'card-avion';
            card.innerHTML = `
                <img src="${avion.imagen}" alt="${avion.nombre}" onerror="this.src='https://via.placeholder.com/400x250?text=Imagen+No+Encontrada'">
                <h3>${avion.nombre}</h3>
            `;
            
            card.onclick = () => mostrarFichas(avion.id);
            gridAviones.appendChild(card);
        });
    } else {
        console.error("Error: No se encontró la variable 'flota' en data.js");
    }

   // 2. Función para mostrar la lista de documentos con ICONOS MEJORADOS (Versión CeRam/Alodine)
    window.mostrarFichas = function(id) {
        const avionSeleccionado = flota.find(a => a.id === id);
        
        tituloAvion.innerText = `Documentación Técnica: ${avionSeleccionado.nombre}`;
        listaDocumentos.innerHTML = ''; 

        avionSeleccionado.docs.forEach(doc => {
            const btn = document.createElement('button');
            btn.className = 'btn-doc';
            let iconoHTML = '';
            const nombreDoc = doc.nombre.toLowerCase();

            // 1. REC / Protección de Bordes de Ataque
            if (nombreDoc.includes('rec') && !nombreDoc.includes('tape')) {
                iconoHTML = '<div class="icono-tecnico icono-rec"></div>'; 

            // 2. Cintas Técnicas (REC TAPE)
            } else if (nombreDoc.includes('tape')) {
                iconoHTML = '<div class="icono-tecnico icono-tape"></div>';

            // 3. Pegamentos y Adhesivos (Epoxy / Adhesion)
            } else if (nombreDoc.includes('adhesivo') || nombreDoc.includes('epoxy') || nombreDoc.includes('adhesion')) {
                iconoHTML = '<div class="icono-tecnico icono-pegamento"></div>';

            // 4. Alodine y Primers (Escudos🛡️)
            } else if (nombreDoc.includes('alodine') || nombreDoc.includes('primer')) {
                if (nombreDoc.includes('green') || nombreDoc.includes('515x')) {
                    iconoHTML = '<div class="icono-tecnico icono-primer-green"></div>';
                } else if (nombreDoc.includes('yellow') || nombreDoc.includes('10p20')) {
                    iconoHTML = '<div class="icono-tecnico icono-primer-yellow"></div>';
                } else if (nombreDoc.includes('brown') || nombreDoc.includes('3035')) {
                    iconoHTML = '<div class="icono-tecnico icono-primer-brown"></div>';
                } else {
                    iconoHTML = '<div class="icono-tecnico icono-alodine"></div>';
                }

            // 5. Resto de categorías (Top Coat / Mezcla / General)
            } else if (nombreDoc.includes('top coat') || nombreDoc.includes('finish')) {
                iconoHTML = '<div class="icono-tecnico icono-topcoat"></div>';
            } else if (nombreDoc.includes('guia') || nombreDoc.includes('mezcla')) {
                iconoHTML = '<div class="icono-tecnico icono-mezcla"></div>';
            } else {
                iconoHTML = '<div class="icono-tecnico icono-general"></div>';
            }

            btn.innerHTML = `${iconoHTML}<span class="nombre-doc">${doc.nombre}</span>`;
            btn.onclick = () => verPDF(doc.path);
            listaDocumentos.appendChild(btn);
        });
            

        seleccionAvion.classList.add('hidden');
        seccionFichas.classList.remove('hidden');
    };

    // 3. Función para abrir el PDF en el visor (Modal)
    window.verPDF = function(ruta) {
        const modal = document.getElementById('modal-visor');
        const frame = document.getElementById('pdf-frame');
        
        frame.src = ruta;
        modal.classList.remove('hidden');
    };

    // 4. Función para cerrar el visor
    window.cerrarVisor = function() {
        document.getElementById('modal-visor').classList.add('hidden');
        document.getElementById('pdf-frame').src = ''; 
    };

    // 5. Función para volver a la pantalla principal
    window.volverInicio = function() {
        seccionFichas.classList.add('hidden');
        seleccionAvion.classList.remove('hidden');
    };
});