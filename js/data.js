// Contenido del módulo "Reproducción celular" – Prof. Miguel Ramos (prototipo)
window.MODULE = {
  title: "Reproducción celular",
  intro: { audio: "audio/n0_intro.mp3", img: "img/w_huancane.webp" },
  stations: [
  { id: 1, name: "La célula y el ADN", level: "Básico", min: 15, emoji: "🔬", color: "#a0c4ff", audio: "audio/n1.mp3",
    slides: [
      { t: "¿Qué es una célula?", img: ["img/w_celula_animal_vegetal.webp"], txt: ["La <b>célula</b> es la unidad más pequeña de la vida.", "Tu cuerpo tiene unos <b>30 billones</b> de células."] },
      { t: "Todos estamos hechos de células", img: ["img/w_quinua_titicaca.webp"], cap: "Quinua en la Isla del Sol, lago Titicaca.", txt: ["La quinua, la papa, la alpaca… ¡y tú!", "Las células de las plantas tienen <b>pared celular</b> y <b>cloroplastos</b>."] },
      { t: "Del ADN al cromosoma", img: ["img/w_cromosoma.webp"], txt: ["El <b>ADN</b> es el “libro de recetas” de la vida: guarda las instrucciones de tu cuerpo.", "Se enrolla como lana en un ovillo 🧶 y forma los <b>cromosomas</b>."], tip: "Un cromosoma ya copiado tiene <b>2 cromátidas hermanas</b> unidas por el <b>centrómero</b>." },
      { t: "Nuestros 46 cromosomas", img: ["img/w_cariotipo.webp"], txt: ["Ser humano: <b>46 cromosomas = 23 pares</b>.", "Un juego viene de mamá y otro de papá."], tip: "Papa cultivada: 48 · Quinua: 36 · Cebolla: 16" },
      { t: "¿Por qué se dividen las células?", img: ["img/s_por_que_dividen.svg"], txt: ["1️⃣ Para <b>crecer</b>.", "2️⃣ Para <b>reparar</b> heridas y reemplazar células viejas."] },
      { t: "De 1 célula a un estudiante de Huancané", img: ["img/w_huancane.webp"], cap: "Vista de Huancané (Puno).", txt: ["Todos empezamos como <b>1 sola célula</b>: el cigoto.", "Se dividió millones de veces → ¡tu cuerpo!"], tip: "Recuerda: célula → núcleo → ADN → cromosomas." }
    ],
    quiz: [
      { q: "¿Cuál es la unidad más pequeña de la vida?", o: ["El átomo", "La célula", "El órgano", "El tejido"], a: 1, e: "La célula es la unidad básica (estructural y funcional) de todos los seres vivos. Un átomo no está vivo." },
      { q: "¿Dónde se guarda el ADN en tus células?", o: ["En el núcleo", "En la pared celular", "En la vacuola", "Fuera de la célula"], a: 0, e: "En las células como las nuestras (eucariotas), el ADN está dentro del núcleo. ¡Las células animales ni siquiera tienen pared celular!" },
      { q: "Un cromosoma se forma cuando…", o: ["la célula come mucho", "el ADN se enrolla y se compacta", "la célula muere", "se rompe la membrana"], a: 1, e: "El ADN se enrolla y compacta (como lana en un ovillo) y así se forman los cromosomas, visibles al dividirse la célula." },
      { q: "¿Cuántos cromosomas tiene una célula de tu cuerpo?", o: ["23", "48", "46", "12"], a: 2, e: "Las células del cuerpo humano tienen 46 cromosomas (23 pares). 48 es la papa cultivada, y 23 está en los gametos." },
      { q: "Rosa, de Huancané, se raspó la rodilla y a la semana sanó. ¿Qué lo permitió?", o: ["La división celular para reparar", "La fotosíntesis", "La digestión", "La respiración"], a: 0, e: "Las células de la piel se dividieron (mitosis) y formaron células nuevas que cerraron la herida: ¡reparación!" }
    ] },
  { id: 2, name: "El ciclo celular", level: "Básico–intermedio", min: 15, emoji: "🔄", color: "#bdb2ff", audio: "audio/n2.mp3",
    slides: [
      { t: "El ciclo celular", img: ["img/s_ciclo_analogias.svg"], txt: ["Es la “vida” de una célula: crece, copia su ADN y se divide.", "Se repite una y otra vez, como el año escolar."] },
      { t: "Interfase: la etapa más larga", img: ["img/w_ciclo_celular.webp"], txt: ["En la <b>interfase</b> ocurre el crecimiento, la duplicación de los cromosomas y casi todas las funciones celulares.", "Tiene 3 periodos: <b>G1 → S → G2</b>."] },
      { t: "G1: crecer 🍲", big: "G1", txt: ["La célula <b>duplica su tamaño</b>.", "Aumenta sus <b>organelas, enzimas</b> y otras moléculas."], tip: "Como un estudiante que se alimenta con quinua y crece." },
      { t: "S: síntesis del ADN 📄📄", big: "S", txt: ["La célula <b>copia (replica) todo su ADN</b>.", "Cada cromosoma queda con 2 cromátidas hermanas."], tip: "Como fotocopiar tu cuaderno completo antes del examen." },
      { t: "G2: prepararse 🎒", big: "G2", txt: ["Periodo <b>después de la síntesis</b> del ADN y <b>antes de la división</b>.", "Revisa errores y fabrica proteínas para dividirse."], tip: "Como alistar la mochila la noche antes del desfile." },
      { t: "G0: descanso 😴", big: "G0", txt: ["Algunas células <b>salen del ciclo</b> y casi no se dividen.", "Ejemplo: las <b>neuronas</b>."] },
      { t: "Fase M: la división", img: ["img/w_fluorescencia_mitosis.webp"], cap: "Microscopio de fluorescencia: la célula del centro se está dividiendo (verde = huso de microtúbulos).", txt: ["Después de la interfase viene la <b>fase M</b>: mitosis + citocinesis."], tip: "Orden: G1 → S → G2 → M (y algunas pasan a G0)." }
    ],
    quiz: [
      { q: "¿Cuál es la etapa más larga del ciclo celular?", o: ["Mitosis", "Interfase", "Anafase", "Citocinesis"], a: 1, e: "La interfase ocupa casi todo el ciclo (alrededor del 90 % del tiempo): ahí la célula crece y copia su ADN." },
      { q: "¿Qué ocurre en la fase S?", o: ["La célula descansa", "Se divide el citoplasma", "Se duplica (sintetiza) el ADN", "Desaparece el núcleo"], a: 2, e: "S significa síntesis: la célula replica todo su ADN. Por eso cada cromosoma pasa a tener 2 cromátidas." },
      { q: "La célula duplica su tamaño y aumenta sus organelas en…", o: ["G2", "S", "G0", "G1"], a: 3, e: "En G1 la célula crece: duplica su tamaño y fabrica organelas, enzimas y otras moléculas." },
      { q: "Las neuronas, que casi nunca se dividen, están en…", o: ["G0", "G1", "S", "Metafase"], a: 0, e: "G0 es un estado de “descanso” fuera del ciclo: la célula trabaja, pero no se divide." },
      { q: "¿Cuál es el orden correcto?", o: ["S → G1 → M → G2", "G1 → S → G2 → M", "G2 → G1 → S → M", "M → S → G2 → G1"], a: 1, e: "Primero crece (G1), luego copia el ADN (S), se prepara (G2) y se divide (M)." }
    ] },
  { id: 3, name: "La mitosis", level: "Intermedio", min: 20, emoji: "🧬", color: "#9bf6ff", audio: "audio/n3.mp3",
    slides: [
      { t: "¿Qué es la mitosis?", img: ["img/w_mitosis_secuencia.webp"], txt: ["<b>1 célula → 2 células hijas idénticas</b>.", "Sirve para crecer y reparar."] },
      { t: "Truco: PMAT", pmat: true, txt: ["<b>P</b>ara <b>M</b>añana <b>A</b>lgo <b>T</b>ranquilo", "Profase · Metafase · Anafase · Telofase", "…y al final, la <b>citocinesis</b>."] },
      { t: "Mira la mitosis en movimiento ▶️", anim: "mitosis", txt: ["Toca ▶ o cada fase. Cambia entre célula <b>animal</b> y <b>vegetal</b>."] },
      { t: "1. Profase", img: ["img/w_cebolla_profase.webp"], cap: "Raíz de cebolla: núcleos con cromosomas condensándose.", txt: ["Los cromosomas se <b>condensan</b> y se hacen visibles.", "La membrana del núcleo desaparece y se forma el <b>huso</b>."] },
      { t: "2. Metafase", img: ["img/w_cebolla_metafase.webp"], cap: "Raíz de cebolla: cromosomas alineados en el centro.", txt: ["Los cromosomas se alinean en el centro: la <b>placa ecuatorial</b>."], tip: "Como estudiantes formados en el patio para el izamiento 🇵🇪." },
      { t: "3. Anafase", img: ["img/w_cebolla_mitosis.webp"], cap: "Raíz de cebolla: busca células en profase, metafase, anafase y telofase.", txt: ["Las <b>cromátidas hermanas</b> se separan y van a los <b>polos opuestos</b>."] },
      { t: "4. Telofase + citocinesis", img: ["img/w_cebolla_telofase.webp"], cap: "Raíz de cebolla: célula al final de la división, con dos grupos de cromosomas.", txt: ["Se forman <b>2 núcleos</b> nuevos.", "<b>Citocinesis</b>: se divide el citoplasma."] },
      { t: "Resumen de la mitosis", img: ["img/w_mitosis_esquema.webp"], txt: ["Interfase → Profase → (Prometafase) → Metafase → Anafase → Telofase."] },
      { t: "Animal vs. vegetal 🌱", img: ["img/s_astral_anastral.svg"], txt: ["Animal: <b>centriolos</b> → huso <b>astral</b>; se divide por un <b>surco</b>.", "Vegetal (papa, quinua): <b>sin centriolos</b>; el huso nace de los <b>casquetes polares</b> → huso <b>ANASTRAL</b>; se divide con el <b>fragmoplasto</b>."] },
      { t: "El huso de la célula animal", img: ["img/w_huso_astral.webp"], txt: ["Los <b>microtúbulos astrales</b> (ásteres) salen de los centriolos.", "Las plantas <b>no</b> tienen ásteres: por eso su huso es anastral."] }
    ],
    quiz: [
      { q: "¿Qué se obtiene al final de la mitosis?", o: ["4 células diferentes", "2 células hijas idénticas", "1 gameto", "2 células con la mitad de cromosomas"], a: 1, e: "La mitosis forma 2 células hijas idénticas a la madre, con el mismo número de cromosomas." },
      { q: "Según “Para Mañana Algo Tranquilo”, ¿qué fase va después de la metafase?", o: ["Profase", "Telofase", "Anafase", "Interfase"], a: 2, e: "P-M-A-T: después de la Metafase viene la Anafase, cuando las cromátidas hermanas viajan a los polos." },
      { q: "Los cromosomas forman la placa ecuatorial en la…", o: ["Metafase", "Profase", "Telofase", "Interfase"], a: 0, e: "En la metafase los cromosomas se alinean en el centro (placa ecuatorial), unidos al huso por sus cinetocoros." },
      { q: "En la célula de la papa, el huso mitótico se forma a partir de…", o: ["Centriolos", "Casquetes polares", "Ribosomas", "La pared celular"], a: 1, e: "Las plantas no tienen centriolos: el huso se forma desde los casquetes polares y es ANASTRAL (sin ásteres)." },
      { q: "En la citocinesis de una célula vegetal se forma…", o: ["Un surco de segmentación", "Ásteres", "El fragmoplasto (placa celular)", "Centriolos"], a: 2, e: "La pared rígida impide el estrangulamiento: en el centro se forma el fragmoplasto, que origina la placa celular." }
    ] },
  { id: 4, name: "La meiosis", level: "Intermedio–avanzado", min: 20, emoji: "👫", color: "#ffc6ff", audio: "audio/n4.mp3",
    slides: [
      { t: "Tu origen: los gametos", img: ["img/w_espermatozoide_ovulo.webp"], cap: "Un espermatozoide llegando al óvulo.", txt: ["Empezaste con la unión de un <b>óvulo</b> y un <b>espermatozoide</b>.", "Estas células se llaman <b>gametos</b> y se forman por <b>meiosis</b>."] },
      { t: "Diploide (2n) y haploide (n)", img: ["img/s_diploide_haploide.svg"], txt: ["<b>Diploide 2n</b>: 2 juegos de cromosomas → 46.", "<b>Haploide n</b>: 1 juego → 23 (gametos).", "n + n = 2n 👶"] },
      { t: "Meiosis: 2 divisiones", img: ["img/w_meiosis_esquema.webp"], txt: ["<b>Meiosis I</b>: se separan los cromosomas <b>homólogos</b> (2n → n). Es reduccional.", "<b>Meiosis II</b>: se separan las <b>cromátidas hermanas</b> (parecida a la mitosis)."] },
      { t: "Meiosis I en el microscopio", img: ["img/w_lilium_meiosisI.webp"], cap: "Células madre del polen de lirio en metafase I, anafase I y telofase I.", txt: ["Cada célula madre del polen hace meiosis."] },
      { t: "1 célula → 4 gametos", img: ["img/w_espermatogenesis.webp"], txt: ["En la formación de espermatozoides, <b>1 célula da 4</b> células haploides."] },
      { t: "Las plantas también 🌸🥔", img: ["img/w_flor_papa.webp"], cap: "Flor de papa (Junín, Perú).", txt: ["En la flor de la papa se forman el <b>polen</b> y los <b>óvulos</b> por meiosis."] },
      { t: "Variabilidad genética", big: "≠", txt: ["Cada gameto es <b>diferente</b>: por el <b>crossing over</b> y por la mezcla al azar de los cromosomas.", "Por eso tú y tus hermanos se parecen… ¡pero no son iguales!"] },
      { t: "Mitosis vs. meiosis", img: ["img/s_mitosis_vs_meiosis.svg"], txt: ["Mitosis: 2 células iguales (2n).", "Meiosis: 4 células diferentes (n)."] }
    ],
    quiz: [
      { q: "¿Cuáles son los gametos humanos?", o: ["Neuronas y glóbulos rojos", "Óvulo y espermatozoide", "Células de la piel", "Cigoto y embrión"], a: 1, e: "Los gametos son las células sexuales: óvulo y espermatozoide. Se forman por meiosis." },
      { q: "¿Cuántos cromosomas tiene un gameto humano?", o: ["46", "92", "23", "48"], a: 2, e: "Los gametos son haploides (n = 23). Al unirse dos gametos, el cigoto vuelve a tener 46 (2n)." },
      { q: "Al terminar la meiosis, una célula forma…", o: ["2 células idénticas", "4 células hijas diferentes", "1 célula más grande", "8 células diploides"], a: 1, e: "Con dos divisiones seguidas (meiosis I y II) se obtienen 4 células haploides, todas diferentes." },
      { q: "En la meiosis I se separan…", o: ["Los cromosomas homólogos", "Las cromátidas hermanas", "Los ribosomas", "Los centriolos"], a: 0, e: "En la meiosis I se separan los homólogos (por eso se reduce a n). Las cromátidas hermanas se separan en la meiosis II." },
      { q: "¿Por qué dos hermanos no son idénticos?", o: ["Por la mitosis", "Por la fotosíntesis", "Por la variabilidad genética de la meiosis", "Porque comen diferente"], a: 2, e: "La meiosis (crossing over y mezcla al azar de cromosomas) hace que cada gameto sea único." }
    ] },
  { id: 5, name: "Profase I en detalle", level: "Nivel admisión 🎓", min: 20, emoji: "🎓", color: "#ffd6a5", audio: "audio/n5.mp3",
    slides: [
      { t: "Nivel admisión: la profase I", img: ["img/s_profase1_etapas.svg"], txt: ["Es la etapa <b>más larga</b> de la meiosis.", "Tiene <b>5 subetapas</b>. ¡Muy preguntada en la UNA Puno / CEPREUNA!"] },
      { t: "Truco: los cuyes 🐹", lcpdd: true, txt: ["<b>L</b>os <b>C</b>uyes <b>P</b>equeños <b>D</b>uermen <b>D</b>iario", "Leptoteno · Cigoteno · Paquiteno · Diploteno · Diacinesis"] },
      { t: "1. Leptoteno", img: ["img/w_profase1_saltamontes.webp"], cap: "Las 5 subetapas en células de saltamontes (microscopio).", txt: ["Los cromosomas se condensan: se ven como <b>hilos largos y delgados</b>."] },
      { t: "2. Cigoteno", img: ["img/w_lilium_cigoteno.webp"], cap: "Lirio en cigoteno.", txt: ["Los cromosomas <b>homólogos se aparean</b>: <b>SINAPSIS</b>.", "Cada par forma un <b>bivalente</b> (tétrada = 4 cromátidas)."], tip: "Como parejas que se juntan en la danza de la Candelaria 💃🕺" },
      { t: "3. Paquiteno", img: ["img/w_lilium_paquiteno.webp", "img/w_sinapsis_crossing.webp"], cap: "Arriba: lirio en paquiteno. Abajo: esquema del crossing over.", txt: ["Cromosomas gruesos.", "Ocurre el <b>CROSSING OVER</b> (entrecruzamiento): los homólogos intercambian segmentos.", "→ <b>variabilidad</b> de los gametos."] },
      { t: "4. Diploteno", img: ["img/w_crossing_over.webp"], txt: ["Los homólogos empiezan a separarse…", "…pero quedan unidos en los <b>QUIASMAS</b>: sitios de intercambio de material genético. ¡Ahora se ven!"] },
      { t: "5. Diacinesis", img: ["img/w_lilium_diacinesis.webp"], cap: "Lirio en diacinesis: se cuentan 12 bivalentes (2n = 24).", txt: ["<b>Máxima condensación</b>; los quiasmas se van a los extremos.", "Desaparecen nucléolo y membrana nuclear: <b>FIN de la profase I</b>."] },
      { t: "Repaso express ⚡", table: [["Cigoteno", "Apareamiento (sinapsis)"], ["Paquiteno", "Crossing over"], ["Diploteno", "Quiasmas visibles"], ["Diacinesis", "Fin de la profase I"]], txt: [] }
    ],
    quiz: [
      { q: "¿Cuál es la primera subetapa de la profase I?", o: ["Diacinesis", "Paquiteno", "Leptoteno", "Cigoteno"], a: 2, e: "“Los Cuyes…”: L = Leptoteno, cuando los cromosomas parecen hilos delgados." },
      { q: "La sinapsis (apareamiento de homólogos) ocurre en el…", o: ["Cigoteno", "Leptoteno", "Diploteno", "Diacinesis"], a: 0, e: "En el cigoteno los homólogos se aparean y forman bivalentes (sinapsis)." },
      { q: "El crossing over ocurre en el…", o: ["Leptoteno", "Paquiteno", "Diacinesis", "Telofase"], a: 1, e: "En el paquiteno los homólogos intercambian segmentos de ADN: crossing over." },
      { q: "¿En qué subetapa se hacen visibles los quiasmas?", o: ["Cigoteno", "Leptoteno", "Diploteno", "Interfase"], a: 2, e: "En el diploteno los homólogos se separan un poco y quedan unidos por los quiasmas, que ya se pueden ver." },
      { q: "¿Qué subetapa marca el final de la profase I?", o: ["Paquiteno", "Diacinesis", "Cigoteno", "Diploteno"], a: 1, e: "La diacinesis es la última: máxima condensación y desaparición de la membrana nuclear." }
    ] }
  ],
  exam: { min: 15, source: "Banco de preguntas: «Biología 05 – Banco de preguntas – Reproducción celular» (Studocu), con correcciones.",
    questions: [
      { q: "¿Durante qué periodo se lleva a cabo el crecimiento, duplicación de los cromosomas y de casi todas las funciones celulares?", o: ["Interfase", "Telofase", "Anafase", "Metafase"], a: 0, st: 2, topic: "Interfase", e: "La interfase es el periodo más largo del ciclo: la célula crece (G1), duplica sus cromosomas (S) y se prepara (G2)." },
      { q: "¿En qué periodo de la interfase la célula duplica su tamaño y aumenta su cantidad de organelas, enzimas y otras moléculas?", o: ["G1", "G0", "Profase", "S"], a: 0, st: 2, topic: "Periodo G1", e: "En G1 la célula crece y fabrica organelas, enzimas y moléculas. G0 es reposo y la profase no es de la interfase." },
      { q: "¿Cómo se denomina el periodo posterior a la síntesis del ADN pero previo a la próxima división celular?", o: ["G2", "S", "G1", "Interfase"], a: 0, st: 2, topic: "Periodo G2", e: "Orden G1 → S → G2 → M: el G2 va después de la síntesis (S) y antes de la división." },
      { q: "¿Durante qué fase de la mitosis los cromosomas se alinean formando la placa ecuatorial?", o: ["Telofase", "Anafase", "Profase", "Metafase"], a: 3, st: 3, topic: "Metafase (placa ecuatorial)", e: "En la metafase los cromosomas se ubican en el ecuador de la célula: la placa ecuatorial." },
      { q: "¿En qué fase de la mitosis las cromátidas hermanas de cada cromosoma se separan y son llevadas a los polos opuestos de la célula?", o: ["Interfase", "Profase", "Telofase", "Anafase"], a: 3, st: 3, topic: "Anafase", e: "En la anafase el huso separa las cromátidas hermanas y las lleva a polos opuestos." },
      { q: "¿Qué dan origen al huso mitótico en las plantas durante la mitosis?", o: ["Centriolos", "Retículo endoplásmico", "Casquetes polares", "Ribosomas"], a: 2, st: 3, topic: "Huso anastral en plantas (casquetes polares)", e: "Las células vegetales no tienen centriolos: el huso se forma desde los casquetes polares y es ANASTRAL (sin ásteres)." },
      { q: "¿Durante qué fase de la meiosis se lleva a cabo el apareamiento de los cromosomas homólogos?", o: ["Paquiteno", "Diploteno", "Cigoteno", "Diacinesis"], a: 2, st: 5, topic: "Cigoteno (sinapsis)", e: "En el cigoteno (profase I) los homólogos se aparean: sinapsis, formando bivalentes." },
      { q: "¿Qué permite el crossing over en la meiosis?", o: ["Obtener nutrientes para la célula", "Variabilidad de los gametos", "Reparar los tejidos dañados", "El crecimiento de los organismos"], a: 1, st: 5, topic: "Crossing over y variabilidad", e: "El intercambio de segmentos entre homólogos crea combinaciones nuevas: variabilidad genética de los gametos." },
      { q: "¿Cómo se denominan los sitios de intercambio de material genético cromosómico entre cromosomas homólogos?", o: ["Cinetocoro", "Centrómero", "Fragmoplasto", "Quiasma"], a: 3, st: 5, topic: "Quiasmas", e: "Los quiasmas son los puntos donde ocurrió el entrecruzamiento; se ven en el diploteno." },
      { q: "¿Qué marca el final de la profase I en la meiosis?", o: ["Cigoteno", "Leptoteno", "Paquiteno", "Diacinesis"], a: 3, st: 5, topic: "Diacinesis (fin de la profase I)", e: "La diacinesis es la última subetapa de la profase I (L-C-P-D-D). ¡Ojo! Algunas fuentes dicen “cigoteno” por error." }
    ] }
};
