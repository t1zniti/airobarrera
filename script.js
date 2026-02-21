/* ═══════════════════════════════════════════════════════
   WINDSCREEN — Interaction Layer
   script.js
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  const header     = document.getElementById('siteHeader');
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('mainNav');
  const heroBg     = document.querySelector('.hero-bg');
  const navLinks   = document.querySelectorAll('.nav-link');

  /* ─── Mobile nav overlay (injected once) ─── */
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);


  /* ═══════════════════════════════════════════════════════
     1. STICKY HEADER — adds .scrolled class on scroll
     On inner pages (no hero), header stays in scrolled state.
  ═══════════════════════════════════════════════════════ */
  var isInnerPage = document.body.classList.contains('page-inner');

  function onScroll() {
    if (isInnerPage) return; // always scrolled on inner pages
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initialise on load


  /* ═══════════════════════════════════════════════════════
     2. MOBILE MENU TOGGLE
  ═══════════════════════════════════════════════════════ */
  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function () {
    if (mainNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  /* Close menu when a nav link is tapped */
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ═══════════════════════════════════════════════════════
     3. SCROLL REVEAL — Intersection Observer
  ═══════════════════════════════════════════════════════ */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: show everything if IO not supported */
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ═══════════════════════════════════════════════════════
     4. HERO BACKGROUND — Ken Burns entrance
  ═══════════════════════════════════════════════════════ */
  if (heroBg) {
    window.addEventListener('load', function () {
      heroBg.classList.add('loaded');
    });
  }


  /* ═══════════════════════════════════════════════════════
     5. ACTIVE NAV LINK — highlight based on scroll position
  ═══════════════════════════════════════════════════════ */
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();


  /* ═══════════════════════════════════════════════════════
     6. LANGUAGE SWITCHER — Flag widget with i18n
  ═══════════════════════════════════════════════════════ */
  var LANG_KEY = 'ab_lang';

  var translations = {
    es: {
      'nav.home': 'Inicio', 'nav.products': 'Productos', 'nav.blog': 'Blog',
      'nav.location': 'Ubicación', 'nav.contact': 'Contacto',
      'hero.eyebrow': 'Vidrio Premium para Patios',
      'hero.title': 'Elegancia que<br>se puede ver',
      'hero.subtitle': 'Mamparas de vidrio artesanales que protegen sin ocultar las vistas.',
      'hero.btn': 'Descubrir más',
      'about.eyebrow': 'El Escudo Invisible',
      'about.title': 'Invisible, pero<br>protector',
      'about.body1': 'Nuestras mamparas están diseñadas para desaparecer. Lo que queda es una visión pura e ininterrumpida — tu jardín, tu horizonte, tu cielo. Fabricadas en vidrio arquitectónico templado, cada panel resiste los elementos manteniendo una claridad cristalina durante años.',
      'about.body2': 'Sin marcos voluminosos. Sin ruido visual. Solo la tranquila confianza de una protección que sabe cuándo mantenerse en segundo plano.',
      'about.btn': 'Ver Productos',
      'products.eyebrow': 'Nuestra Colección', 'products.title': 'Creado para cada espacio',
      'products.subtitle': 'Desde terrazas con vistas al mar hasta íntimos balcones urbanos, nuestra gama se adapta a tu arquitectura.',
      'product1.title': 'Panel sin Marco', 'product1.desc': 'Vidrio puro de borde a borde. Sin marcos, sin distracciones — el pináculo del minimalismo.',
      'product2.title': 'Sistema Corredera', 'product2.desc': 'Paneles retráctiles sobre un riel silencioso. Abierto cuando el tiempo invita, cerrado cuando cambia.',
      'product3.title': 'Barandilla Fija', 'product3.desc': 'Elegancia estructural para terrazas elevadas. Seguridad y estilo fusionados en una sola línea perfecta.',
      'products.learn': 'Más Información →',
      'location.eyebrow': 'Visita Nuestro Taller',
      'location.title': 'Donde la artesanía<br>se encuentra con la precisión',
      'location.body': 'Cada panel Airobarrera se mide, corta y termina a mano en nuestro taller especializado. Aceptamos visitas con cita previa — ven a ver el proceso detrás del producto.',
      'cta.title': '¿Listo para transformar<br>tu espacio exterior?',
      'cta.body': 'Consigue una consulta personalizada. Diseñaremos la solución de mampara perfecta para tu patio.',
      'cta.btn': 'Contáctenos',
      'footer.tagline': 'Mamparas de vidrio premium<br>para espacios distinguidos.',
      'footer.nav': 'Navegación', 'footer.follow': 'Síguenos',
      'footer.copy': '© 2026 Airobarrera. Todos los derechos reservados.',
      'ppage.hero.eyebrow': 'Nuestros Productos',
      'ppage.hero.title': 'La Colección<br>Airobarrera',
      'ppage.hero.subtitle': 'Sistemas de vidrio arquitectónico diseñados para desaparecer en tu paisaje mientras resisten los elementos.',
      'ppage.intro.eyebrow': 'Elegancia y Funcionalidad',
      'ppage.intro.title': 'Diseñado para una<br>protección invisible',
      'ppage.intro.body1': 'Cada sistema Airobarrera está fabricado en vidrio arquitectónico templado con herrajes de aluminio mecanizados con precisión. El resultado es una barrera que protege tu patio del viento, la lluvia y el ruido — permaneciendo prácticamente invisible.',
      'ppage.intro.body2': 'Nuestros paneles pueden instalarse como pantallas independientes o en conjuntos interconectados, permitiéndote cubrir cualquier espacio con una estética limpia y sin marcos. Disponible en múltiples configuraciones con una selección curada de acabados.',
      'ppage.range.eyebrow': 'Gama de Productos', 'ppage.range.title': 'Tres sistemas, una filosofía',
      'ppage.range.subtitle': 'Cada sistema comparte el mismo compromiso con la claridad, la durabilidad y el diseño sin esfuerzo.',
      'ppage.fp.name': 'Panel sin Marco', 'ppage.fp.tagline': 'El pináculo del minimalismo',
      'ppage.fp.body': 'Vidrio templado puro de borde a borde sin marco visible. Cada panel está sostenido por abrazaderas de acero inoxidable de ingeniería de precisión que desaparecen a la altura de los ojos. El resultado: una vista ininterrumpida como si nada se interpusiera entre tú y el horizonte.',
      'ppage.fp.spec1': 'Espesor del Vidrio', 'ppage.fp.spec2': 'Altura Máx.', 'ppage.fp.spec3': 'Ancho del Panel', 'ppage.fp.spec4': 'Resist. al Viento',
      'ppage.fp.btn': 'Solicitar Presupuesto',
      'ppage.ss.name': 'Sistema Corredera', 'ppage.ss.tagline': 'Abierto cuando el tiempo invita, cerrado cuando cambia',
      'ppage.ss.body': 'Los paneles de vidrio retráctiles se deslizan sobre un riel de aluminio anodizado silencioso. Cada panel se apila ordenadamente contra el siguiente, dándote control total sobre la ventilación. Ideal para espacios de entretenimiento que se adaptan a las estaciones.',
      'ppage.ss.spec1': 'Espesor del Vidrio', 'ppage.ss.spec2': 'Altura Máx.', 'ppage.ss.spec3': 'Ancho del Panel', 'ppage.ss.spec4': 'Paneles Máx.',
      'ppage.ss.btn': 'Solicitar Presupuesto',
      'ppage.fb.name': 'Barandilla Fija', 'ppage.fb.tagline': 'Seguridad y estilo en una sola línea perfecta',
      'ppage.fb.body': 'Barandillas de vidrio estructural para terrazas y balcones elevados. Diseñadas para cumplir con los códigos de seguridad manteniendo la transparencia limpia por la que Airobarrera es conocida. Opciones de canal base o montaje lateral disponibles.',
      'ppage.fb.spec1': 'Vidrio Laminado', 'ppage.fb.spec2': 'Altura Estándar', 'ppage.fb.spec3': 'Ancho Máx. Panel', 'ppage.fb.spec4': 'Norma de Seguridad',
      'ppage.fb.btn': 'Solicitar Presupuesto',
      'ppage.configs.eyebrow': 'Opciones de Instalación', 'ppage.configs.title': 'Configuraciones de montaje',
      'ppage.configs.subtitle': 'Cada sistema puede adaptarse a tu arquitectura. Elige entre instalaciones exentas, fijadas a pared o híbridas.',
      'ppage.config1.title': 'Exento', 'ppage.config1.desc': 'Montado en placa base directamente en el suelo. No se necesitan paredes — perfecto para terrazas abiertas y zonas de piscina.',
      'ppage.config2.title': 'Fijado a Pared', 'ppage.config2.desc': 'Paneles fijados a una pared existente con soportes ocultos. Líneas limpias con soporte estructural del edificio.',
      'ppage.config3.title': 'Híbrido', 'ppage.config3.desc': 'Combinación de montaje en pared y postes exentos para cerramientos de terraza en forma de L o U.',
      'ppage.config4.title': 'Canal Empotrado', 'ppage.config4.desc': 'El vidrio se asienta dentro de un canal enrasado en el suelo. La opción más minimalista — sin herrajes visibles.',
      'ppage.options.eyebrow': 'Accesorios Opcionales', 'ppage.options.title': 'Mejora tu sistema',
      'ppage.options.subtitle': 'Añade funcionalidad y confort con nuestra gama de accesorios integrados.',
      'ppage.opt1.title': 'Iluminación LED Integrada', 'ppage.opt1.desc': 'Iluminación de tira ambiental integrada en el canal base para ambiente nocturno.',
      'ppage.opt2.title': 'Sensor de Lluvia', 'ppage.opt2.desc': 'Cierre automático del panel corredera cuando se detecta lluvia. Tranquilidad automatizada.',
      'ppage.opt3.title': 'Sensor de Viento', 'ppage.opt3.desc': 'Monitorea la velocidad del viento y activa la respuesta de protección para sistemas deslizantes.',
      'ppage.opt4.title': 'Control Domótico', 'ppage.opt4.desc': 'Maneja los paneles deslizantes desde tu smartphone. Compatible con los principales sistemas de automatización del hogar.',
      'ppage.opt5.title': 'Vidrio Solar Tintado', 'ppage.opt5.desc': 'Paneles tintados con filtro UV que reducen el deslumbramiento y el calor manteniendo la transparencia.',
      'ppage.opt6.title': 'Privacidad Esmerilada', 'ppage.opt6.desc': 'Película de esmerilado inteligente que vuelve el vidrio opaco a demanda para privacidad instantánea.',
      'ppage.opt7.title': 'Laminación Acústica', 'ppage.opt7.desc': 'Vidrio laminado multicapa para un aislamiento acústico superior en entornos ruidosos.',
      'ppage.opt8.title': 'Revestimiento Autolimpiante', 'ppage.opt8.desc': 'Nano-revestimiento hidrófilo que utiliza el agua de lluvia para eliminar la suciedad automáticamente.',
      'ppage.finishes.eyebrow': 'Selección de Acabados', 'ppage.finishes.title': 'Acabados para herrajes',
      'ppage.finishes.subtitle': 'Todas las abrazaderas, raíles y canales están disponibles en tu elección de acabado. Colores RAL personalizados bajo pedido.',
      'ppage.glass.title': 'Opciones de vidrio',
      'ppage.gallery.eyebrow': 'Instalaciones', 'ppage.gallery.title': 'Proyectos reales, espacios reales',
      'ppage.gallery.subtitle': 'Vea cómo nuestros sistemas se integran en proyectos residenciales y comerciales en todo el mundo.',
      'ppage.docs.eyebrow': 'Recursos', 'ppage.docs.title': 'Documentación y descargas',
      'ppage.doc1.title': 'Catálogo de Productos', 'ppage.doc1.format': 'Documento PDF',
      'ppage.doc2.title': 'Especificaciones Técnicas', 'ppage.doc2.format': 'Documento PDF',
      'ppage.doc3.title': 'Manual de Instalación', 'ppage.doc3.format': 'Documento PDF',
      'ppage.cta.title': 'Transforma tu<br>espacio exterior',
      'ppage.cta.body': 'Consigue una consulta personalizada. Diseñaremos la solución de mampara perfecta para tu patio.',
      'ppage.cta.btn1': 'Contáctenos', 'ppage.cta.btn2': 'Visitar Taller',
      'blog.eyebrow': 'Diario', 'blog.title': 'El Blog de Airobarrera',
      'blog.subtitle': 'Perspectivas sobre vida al aire libre, vidrio arquitectónico, tendencias de diseño y la creación de espacios que respiran.',
      'blog.post1.category': 'Tendencias de Diseño',
      'blog.post1.title': 'El Auge de la Vida Interior-Exterior: Por Qué los Límites de Vidrio Están Reemplazando las Paredes',
      'blog.post1.body1': 'El cambio global hacia el diseño biofílico ha acelerado un replanteamiento fundamental de cómo separamos los espacios interiores y exteriores. Arquitectos y propietarios descubren que el límite más elegante es aquel a través del cual puedes ver.',
      'blog.post1.body2': 'En este artículo, exploramos los principios de diseño detrás de las transiciones interiores-exteriores sin fisuras, el papel del vidrio templado en la arquitectura moderna y cómo los diseñadores líderes utilizan la transparencia como material de diseño.',
      'blog.post1.btn': 'Leer el Artículo Completo',
      'blog.post2.category': 'Materiales', 'blog.post2.title': 'Entendiendo el Vidrio Templado: Qué lo hace seguro y resistente',
      'blog.post2.body': 'El vidrio templado se somete a un proceso térmico controlado que aumenta su resistencia hasta cinco veces en comparación con el vidrio recocido estándar. Cuando se rompe, se fragmenta en piezas pequeñas y sin filo en lugar de esquirlas peligrosas.',
      'blog.post2.btn': 'Leer Más →',
      'blog.post3.category': 'Arquitectura', 'blog.post3.title': '5 Errores de Diseño en Patios que Arruinan tu Experiencia al Aire Libre',
      'blog.post3.body': 'Un patio hermoso puede verse arruinado por una planificación deficiente. Desde ignorar los patrones de viento hasta elegir materiales que no combinan con la arquitectura de la vivienda, estos cinco errores comunes son fáciles de evitar pero sorprendentemente frecuentes.',
      'blog.post3.btn': 'Leer Más →',
      'blog.post4.category': 'Estilo de Vida', 'blog.post4.title': 'Vida Costera: Protege tu Terraza sin Bloquear la Vista',
      'blog.post4.body': 'Las propiedades frente al mar enfrentan desafíos únicos — salpicadura salina, vientos persistentes y sol implacable. Las soluciones tradicionales resuelven un problema mientras crean otro: bloquean la vista que hace especial la vida costera.',
      'blog.post4.btn': 'Leer Más →',
      'blog.post5.category': 'Mantenimiento', 'blog.post5.title': 'Cómo Mantener tu Mampara de Vidrio Cristalina todo el Año',
      'blog.post5.body': 'Una de las preguntas más frecuentes que recibimos es sobre el mantenimiento. La buena noticia: el vidrio templado requiere un mantenimiento sorprendentemente bajo. Una rutina simple de agua tibia, un paño suave y la aplicación ocasional de un revestimiento hidrofóbico es todo lo que se necesita.',
      'blog.post5.btn': 'Leer Más →',
      'blog.post6.category': 'Sostenibilidad', 'blog.post6.title': 'Vidrio y Sostenibilidad: El Argumento Medioambiental para el Acristalamiento Arquitectónico',
      'blog.post6.body': 'El vidrio es infinitamente reciclable. A diferencia de los plásticos o materiales compuestos que se degradan con cada ciclo de reciclaje, el vidrio se puede fundir y reformar sin pérdida de calidad.',
      'blog.post6.btn': 'Leer Más →',
      'blog.post7.category': 'Tecnología', 'blog.post7.title': 'Vidrio Inteligente: Cómo la Tecnología está Transformando los Espacios Exteriores',
      'blog.post7.body': 'Desde el vidrio electrocrómico que se tiñe a demanda hasta los sensores integrados que responden a los cambios climáticos, el futuro del vidrio exterior es inteligente.',
      'blog.post7.btn': 'Leer Más →',
      'blog.newsletter.title': 'Mantente Inspirado',
      'blog.newsletter.body': 'Únete a nuestro boletín para recibir inspiración de diseño, novedades de productos y exclusivos proyectos destacados cada mes.',
      'blog.newsletter.placeholder': 'Tu dirección de correo electrónico',
      'blog.newsletter.btn': 'Suscribirse'
    },
    en: {
      'nav.home': 'Home', 'nav.products': 'Products', 'nav.blog': 'Blog',
      'nav.location': 'Location', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Premium Patio Glass',
      'hero.title': 'Elegance You<br>Can See Through',
      'hero.subtitle': 'Handcrafted glass windscreens that shield without hiding the view.',
      'hero.btn': 'Discover More',
      'about.eyebrow': 'The Unseen Shield',
      'about.title': 'Invisible Yet<br>Protective',
      'about.body1': 'Our windscreens are engineered to disappear. What remains is pure, uninterrupted vision — your garden, your horizon, your sky. Crafted from tempered architectural glass, each panel withstands the elements while maintaining crystal clarity for years.',
      'about.body2': 'No bulky frames. No visual noise. Just the quiet confidence of protection that knows when to stay out of sight.',
      'about.btn': 'View Products',
      'products.eyebrow': 'Our Collection', 'products.title': 'Crafted for Every Space',
      'products.subtitle': 'From terraces overlooking the coast to intimate urban balconies, our range adapts to your architecture.',
      'product1.title': 'Frameless Panel', 'product1.desc': 'Pure edge-to-edge glass. No frames, no distractions — the pinnacle of minimalism.',
      'product2.title': 'Sliding System', 'product2.desc': 'Retractable panels on a whisper-quiet rail. Open when the weather invites, close when it turns.',
      'product3.title': 'Fixed Balustrade', 'product3.desc': 'Structural elegance for elevated terraces. Safety and style fused into a single seamless line.',
      'products.learn': 'Learn More →',
      'location.eyebrow': 'Visit Our Workshop',
      'location.title': 'Where Craft<br>Meets Precision',
      'location.body': 'Every Airobarrera panel is measured, cut, and finished by hand in our dedicated workshop. We welcome visits by appointment — come see the process behind the product.',
      'cta.title': 'Ready to Transform<br>Your Outdoor Space?',
      'cta.body': "Get a bespoke consultation. We'll design the perfect windscreen solution for your patio.",
      'cta.btn': 'Get in Touch',
      'footer.tagline': 'Premium glass windscreens<br>for discerning spaces.',
      'footer.nav': 'Navigation', 'footer.follow': 'Follow Us',
      'footer.copy': '© 2026 Airobarrera. All rights reserved.',
      'ppage.hero.eyebrow': 'Our Products',
      'ppage.hero.title': 'The Airobarrera<br>Collection',
      'ppage.hero.subtitle': 'Architectural glass systems designed to vanish into your landscape while standing firm against the elements.',
      'ppage.intro.eyebrow': 'Elegance & Functionality',
      'ppage.intro.title': 'Engineered for<br>Invisible Protection',
      'ppage.intro.body1': 'Every Airobarrera system is crafted from tempered architectural glass with precision-machined aluminium hardware. The result is a barrier that shields your patio from wind, rain, and noise — while remaining virtually invisible.',
      'ppage.intro.body2': 'Our panels can be installed as standalone screens or interconnected arrays, allowing you to cover any space with a clean, frameless aesthetic. Available in multiple configurations with a curated selection of finishes.',
      'ppage.range.eyebrow': 'Product Range', 'ppage.range.title': 'Three Systems, One Philosophy',
      'ppage.range.subtitle': 'Each system shares the same commitment to clarity, durability, and effortless design.',
      'ppage.fp.name': 'Frameless Panel', 'ppage.fp.tagline': 'The pinnacle of minimalism',
      'ppage.fp.body': 'Pure edge-to-edge tempered glass with no visible frame. Each panel is held by precision-engineered stainless steel clamps that disappear at eye level. The result: an unbroken view as if nothing stands between you and the horizon.',
      'ppage.fp.spec1': 'Glass Thickness', 'ppage.fp.spec2': 'Max Height', 'ppage.fp.spec3': 'Panel Width', 'ppage.fp.spec4': 'Wind Resistance',
      'ppage.fp.btn': 'Request Quote',
      'ppage.ss.name': 'Sliding System', 'ppage.ss.tagline': 'Open when the weather invites, close when it turns',
      'ppage.ss.body': 'Retractable glass panels glide on a whisper-quiet anodised aluminium rail. Each panel stacks neatly against the next, giving you full control over ventilation and exposure. Ideal for entertaining spaces that adapt to the seasons.',
      'ppage.ss.spec1': 'Glass Thickness', 'ppage.ss.spec2': 'Max Height', 'ppage.ss.spec3': 'Panel Width', 'ppage.ss.spec4': 'Max Panels',
      'ppage.ss.btn': 'Request Quote',
      'ppage.fb.name': 'Fixed Balustrade', 'ppage.fb.tagline': 'Safety and style in a single seamless line',
      'ppage.fb.body': 'Structural glass balustrades for elevated terraces and balconies. Engineered to meet building safety codes while maintaining the clean transparency Airobarrera is known for. Base-channel or side-mount options available.',
      'ppage.fb.spec1': 'Laminated Glass', 'ppage.fb.spec2': 'Standard Height', 'ppage.fb.spec3': 'Max Panel Width', 'ppage.fb.spec4': 'Safety Standard',
      'ppage.fb.btn': 'Request Quote',
      'ppage.configs.eyebrow': 'Installation Options', 'ppage.configs.title': 'Mounting Configurations',
      'ppage.configs.subtitle': 'Each system can be adapted to your architecture. Choose from freestanding, wall-mounted, or hybrid setups.',
      'ppage.config1.title': 'Freestanding', 'ppage.config1.desc': 'Base-plate mounted directly to the floor. No walls needed — perfect for open terraces and pool areas.',
      'ppage.config2.title': 'Wall-Mounted', 'ppage.config2.desc': 'Panels fixed to an existing wall with concealed brackets. Clean lines with structural support from the building.',
      'ppage.config3.title': 'Hybrid', 'ppage.config3.desc': 'Combination of wall-mount and freestanding posts for L-shaped or U-shaped terrace enclosures.',
      'ppage.config4.title': 'Recessed Channel', 'ppage.config4.desc': 'Glass sits inside a flush-mounted channel in the floor. The most minimal option — no visible hardware at all.',
      'ppage.options.eyebrow': 'Optional Accessories', 'ppage.options.title': 'Enhance Your System',
      'ppage.options.subtitle': 'Add functionality and comfort with our range of integrated accessories.',
      'ppage.opt1.title': 'Integrated LED Lighting', 'ppage.opt1.desc': 'Ambient strip lighting embedded in the base channel for evening atmosphere.',
      'ppage.opt2.title': 'Rain Sensor', 'ppage.opt2.desc': 'Automatic sliding panel closure when rain is detected. Peace of mind, automated.',
      'ppage.opt3.title': 'Wind Sensor', 'ppage.opt3.desc': 'Monitors wind speed and triggers protective response for sliding systems.',
      'ppage.opt4.title': 'Smart Home Control', 'ppage.opt4.desc': 'Operate sliding panels from your smartphone. Compatible with major home automation systems.',
      'ppage.opt5.title': 'Solar-Tinted Glass', 'ppage.opt5.desc': 'UV-filtering tinted panels that reduce glare and heat while maintaining transparency.',
      'ppage.opt6.title': 'Privacy Frosting', 'ppage.opt6.desc': 'Switchable smart-frost film that turns glass opaque on demand for instant privacy.',
      'ppage.opt7.title': 'Acoustic Lamination', 'ppage.opt7.desc': 'Multi-layer laminated glass for superior sound insulation in noisy environments.',
      'ppage.opt8.title': 'Self-Cleaning Coating', 'ppage.opt8.desc': 'Hydrophilic nano-coating that uses rainwater to wash away dirt automatically.',
      'ppage.finishes.eyebrow': 'Finish Selection', 'ppage.finishes.title': 'Hardware Finishes',
      'ppage.finishes.subtitle': 'All clamps, rails, and channels are available in your choice of finish. Custom RAL colours upon request.',
      'ppage.glass.title': 'Glass Options',
      'ppage.gallery.eyebrow': 'Installations', 'ppage.gallery.title': 'Real Projects, Real Spaces',
      'ppage.gallery.subtitle': 'See how our systems integrate into residential and commercial projects worldwide.',
      'ppage.docs.eyebrow': 'Resources', 'ppage.docs.title': 'Documentation & Downloads',
      'ppage.doc1.title': 'Product Catalogue', 'ppage.doc1.format': 'PDF Document',
      'ppage.doc2.title': 'Technical Specifications', 'ppage.doc2.format': 'PDF Document',
      'ppage.doc3.title': 'Installation Manual', 'ppage.doc3.format': 'PDF Document',
      'ppage.cta.title': 'Transform Your<br>Outdoor Space',
      'ppage.cta.body': "Get a bespoke consultation. We'll design the perfect windscreen solution for your patio.",
      'ppage.cta.btn1': 'Get in Touch', 'ppage.cta.btn2': 'Visit Workshop',
      'blog.eyebrow': 'Journal', 'blog.title': 'The Airobarrera Blog',
      'blog.subtitle': 'Insights on outdoor living, architectural glass, design trends, and creating spaces that breathe.',
      'blog.post1.category': 'Design Trends',
      'blog.post1.title': 'The Rise of Indoor-Outdoor Living: Why Glass Boundaries Are Replacing Walls',
      'blog.post1.body1': 'The global shift toward biophilic design has accelerated a fundamental rethinking of how we separate interior and exterior spaces. Architects and homeowners alike are discovering that the most elegant boundary is one you can see through.',
      'blog.post1.body2': 'In this article, we explore the design principles behind seamless indoor-outdoor transitions, the role of tempered glass in modern architecture, and how leading designers are using transparency as a design material in its own right.',
      'blog.post1.btn': 'Read Full Article',
      'blog.post2.category': 'Materials', 'blog.post2.title': 'Understanding Tempered Glass: What Makes It Safe and Strong',
      'blog.post2.body': 'Tempered glass undergoes a controlled thermal process that increases its strength by up to five times compared to standard annealed glass. When it does break, it shatters into small, blunt fragments rather than dangerous shards — making it the gold standard for architectural safety glazing.',
      'blog.post2.btn': 'Read More →',
      'blog.post3.category': 'Architecture', 'blog.post3.title': '5 Patio Design Mistakes That Ruin Your Outdoor Experience',
      'blog.post3.body': "A beautiful patio can be undone by poor planning. From ignoring wind patterns to choosing materials that clash with the home's architecture, these five common errors are easy to avoid but surprisingly prevalent.",
      'blog.post3.btn': 'Read More →',
      'blog.post4.category': 'Lifestyle', 'blog.post4.title': 'Coastal Living: Protecting Your Terrace Without Blocking the View',
      'blog.post4.body': 'Oceanfront properties face unique challenges — salt spray, persistent winds, and the relentless sun. Traditional solutions like solid walls or timber screens solve one problem while creating another: they block the very view that makes coastal living special.',
      'blog.post4.btn': 'Read More →',
      'blog.post5.category': 'Maintenance', 'blog.post5.title': 'How to Keep Your Glass Windscreen Crystal Clear Year-Round',
      'blog.post5.body': "One of the most common questions we receive is about maintenance. The good news: tempered glass is remarkably low-maintenance. A simple routine of warm water, a soft cloth, and the occasional application of a hydrophobic coating is all it takes.",
      'blog.post5.btn': 'Read More →',
      'blog.post6.category': 'Sustainability', 'blog.post6.title': 'Glass and Sustainability: The Environmental Case for Architectural Glazing',
      'blog.post6.body': 'Glass is infinitely recyclable. Unlike plastics or composite materials that degrade with each recycling cycle, glass can be melted and reformed without any loss in quality.',
      'blog.post6.btn': 'Read More →',
      'blog.post7.category': 'Technology', 'blog.post7.title': 'Smart Glass: How Technology Is Transforming Outdoor Spaces',
      'blog.post7.body': 'From electrochromic glass that tints on demand to integrated sensors that respond to weather changes, the future of outdoor glass is intelligent.',
      'blog.post7.btn': 'Read More →',
      'blog.newsletter.title': 'Stay Inspired',
      'blog.newsletter.body': 'Join our newsletter for design insights, product updates, and exclusive project showcases delivered monthly.',
      'blog.newsletter.placeholder': 'Your email address',
      'blog.newsletter.btn': 'Subscribe'
    },
    fr: {
      'nav.home': 'Accueil', 'nav.products': 'Produits', 'nav.blog': 'Blog',
      'nav.location': 'Localisation', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Verre Premium pour Terrasses',
      'hero.title': "L'élégance que<br>l'on voit à travers",
      'hero.subtitle': 'Pare-vents en verre artisanaux qui protègent sans masquer la vue.',
      'hero.btn': 'Découvrir',
      'about.eyebrow': 'Le Bouclier Invisible',
      'about.title': 'Invisible, mais<br>protecteur',
      'about.body1': "Nos pare-vents sont conçus pour disparaître. Ce qui reste est une vision pure et ininterrompue — votre jardin, votre horizon, votre ciel. Fabriqué en verre architectural trempé, chaque panneau résiste aux intempéries tout en conservant une clarté cristalline pendant des années.",
      'about.body2': "Pas de cadres encombrants. Pas de bruit visuel. Juste la confiance tranquille d'une protection qui sait rester discrète.",
      'about.btn': 'Voir les Produits',
      'products.eyebrow': 'Notre Collection', 'products.title': 'Conçu pour chaque espace',
      'products.subtitle': "Des terrasses surplombant la côte aux balcons urbains intimes, notre gamme s'adapte à votre architecture.",
      'product1.title': 'Panneau sans Cadre', 'product1.desc': 'Verre pur de bord à bord. Sans cadres, sans distractions — le summum du minimalisme.',
      'product2.title': 'Système Coulissant', 'product2.desc': "Panneaux rétractables sur un rail silencieux. Ouvert quand le temps invite, fermé quand il tourne.",
      'product3.title': 'Garde-corps Fixe', 'product3.desc': "Élégance structurelle pour les terrasses surélevées. Sécurité et style fusionnés en une seule ligne parfaite.",
      'products.learn': 'En Savoir Plus →',
      'location.eyebrow': 'Visitez Notre Atelier',
      'location.title': "Où l'artisanat<br>rencontre la précision",
      'location.body': "Chaque panneau Airobarrera est mesuré, coupé et fini à la main dans notre atelier dédié. Nous accueillons les visites sur rendez-vous — venez voir le processus derrière le produit.",
      'cta.title': 'Prêt à transformer<br>votre espace extérieur\u00a0?',
      'cta.body': "Obtenez une consultation sur mesure. Nous concevrons la solution de pare-vent parfaite pour votre terrasse.",
      'cta.btn': 'Nous Contacter',
      'footer.tagline': 'Pare-vents en verre premium<br>pour des espaces raffinés.',
      'footer.nav': 'Navigation', 'footer.follow': 'Suivez-nous',
      'footer.copy': '© 2026 Airobarrera. Tous droits réservés.',
      'ppage.hero.eyebrow': 'Nos Produits',
      'ppage.hero.title': 'La Collection<br>Airobarrera',
      'ppage.hero.subtitle': "Systèmes de verre architectural conçus pour se fondre dans votre paysage tout en résistant aux éléments.",
      'ppage.intro.eyebrow': 'Élégance et Fonctionnalité',
      'ppage.intro.title': 'Conçu pour une<br>protection invisible',
      'ppage.intro.body1': "Chaque système Airobarrera est fabriqué en verre architectural trempé avec des quincailleries en aluminium usinées avec précision. Le résultat est une barrière qui protège votre terrasse du vent, de la pluie et du bruit — tout en restant pratiquement invisible.",
      'ppage.intro.body2': "Nos panneaux peuvent être installés comme écrans indépendants ou en réseaux interconnectés, vous permettant de couvrir n'importe quel espace avec une esthétique propre et sans cadre.",
      'ppage.range.eyebrow': 'Gamme de Produits', 'ppage.range.title': 'Trois systèmes, une philosophie',
      'ppage.range.subtitle': "Chaque système partage le même engagement envers la clarté, la durabilité et le design sans effort.",
      'ppage.fp.name': 'Panneau sans Cadre', 'ppage.fp.tagline': 'Le summum du minimalisme',
      'ppage.fp.body': "Verre trempé pur de bord à bord sans cadre visible. Chaque panneau est maintenu par des pinces en acier inoxydable de précision qui disparaissent à hauteur des yeux. Le résultat : une vue ininterrompue comme si rien ne se trouvait entre vous et l'horizon.",
      'ppage.fp.spec1': 'Épaisseur du Verre', 'ppage.fp.spec2': 'Hauteur Max.', 'ppage.fp.spec3': 'Largeur du Panneau', 'ppage.fp.spec4': 'Résist. au Vent',
      'ppage.fp.btn': 'Demander un Devis',
      'ppage.ss.name': 'Système Coulissant', 'ppage.ss.tagline': 'Ouvert quand le temps invite, fermé quand il tourne',
      'ppage.ss.body': "Les panneaux de verre rétractables glissent sur un rail en aluminium anodisé silencieux. Chaque panneau s'empile soigneusement contre le suivant, vous donnant un contrôle total sur la ventilation. Idéal pour les espaces de divertissement qui s'adaptent aux saisons.",
      'ppage.ss.spec1': 'Épaisseur du Verre', 'ppage.ss.spec2': 'Hauteur Max.', 'ppage.ss.spec3': 'Largeur du Panneau', 'ppage.ss.spec4': 'Panneaux Max.',
      'ppage.ss.btn': 'Demander un Devis',
      'ppage.fb.name': 'Garde-corps Fixe', 'ppage.fb.tagline': 'Sécurité et style en une seule ligne parfaite',
      'ppage.fb.body': "Garde-corps en verre structurel pour terrasses et balcons surélevés. Conçu pour respecter les codes de sécurité des bâtiments tout en maintenant la transparence propre pour laquelle Airobarrera est reconnu.",
      'ppage.fb.spec1': 'Verre Feuilleté', 'ppage.fb.spec2': 'Hauteur Standard', 'ppage.fb.spec3': 'Largeur Max. Panneau', 'ppage.fb.spec4': 'Norme de Sécurité',
      'ppage.fb.btn': 'Demander un Devis',
      'ppage.configs.eyebrow': "Options d'Installation", 'ppage.configs.title': 'Configurations de montage',
      'ppage.configs.subtitle': "Chaque système peut être adapté à votre architecture. Choisissez entre des configurations autoportantes, fixées au mur ou hybrides.",
      'ppage.config1.title': 'Autoportant', 'ppage.config1.desc': "Monté sur platine directement au sol. Pas de murs nécessaires — parfait pour les terrasses ouvertes et les zones de piscine.",
      'ppage.config2.title': 'Fixé au Mur', 'ppage.config2.desc': "Panneaux fixés à un mur existant avec des supports dissimulés. Lignes épurées avec support structurel du bâtiment.",
      'ppage.config3.title': 'Hybride', 'ppage.config3.desc': "Combinaison de montage mural et de poteaux autoportants pour les enclos de terrasse en L ou en U.",
      'ppage.config4.title': 'Canal Encastré', 'ppage.config4.desc': "Le verre repose dans un canal encastré à ras du sol. L'option la plus minimaliste — aucune quincaillerie visible.",
      'ppage.options.eyebrow': 'Accessoires Optionnels', 'ppage.options.title': 'Améliorez votre système',
      'ppage.options.subtitle': "Ajoutez fonctionnalité et confort avec notre gamme d'accessoires intégrés.",
      'ppage.opt1.title': 'Éclairage LED Intégré', 'ppage.opt1.desc': "Éclairage de bande ambiant intégré dans le canal de base pour une atmosphère nocturne.",
      'ppage.opt2.title': 'Capteur de Pluie', 'ppage.opt2.desc': "Fermeture automatique du panneau coulissant lorsque la pluie est détectée.",
      'ppage.opt3.title': 'Capteur de Vent', 'ppage.opt3.desc': "Surveille la vitesse du vent et déclenche une réponse de protection pour les systèmes coulissants.",
      'ppage.opt4.title': 'Contrôle Domotique', 'ppage.opt4.desc': "Faites fonctionner les panneaux coulissants depuis votre smartphone. Compatible avec les principaux systèmes de domotique.",
      'ppage.opt5.title': 'Verre Teinté Solaire', 'ppage.opt5.desc': "Panneaux teintés filtrant les UV qui réduisent l'éblouissement et la chaleur.",
      'ppage.opt6.title': 'Dépoli Intimité', 'ppage.opt6.desc': "Film dépoli intelligent commutable qui rend le verre opaque à la demande pour une intimité instantanée.",
      'ppage.opt7.title': 'Laminage Acoustique', 'ppage.opt7.desc': "Verre feuilleté multicouche pour une isolation phonique supérieure dans les environnements bruyants.",
      'ppage.opt8.title': 'Revêtement Autonettoyant', 'ppage.opt8.desc': "Nano-revêtement hydrophile qui utilise l'eau de pluie pour éliminer automatiquement la saleté.",
      'ppage.finishes.eyebrow': 'Sélection de Finitions', 'ppage.finishes.title': 'Finitions des quincailleries',
      'ppage.finishes.subtitle': "Toutes les pinces, rails et canaux sont disponibles dans la finition de votre choix. Couleurs RAL personnalisées sur demande.",
      'ppage.glass.title': 'Options de verre',
      'ppage.gallery.eyebrow': 'Installations', 'ppage.gallery.title': 'Vrais projets, vrais espaces',
      'ppage.gallery.subtitle': "Découvrez comment nos systèmes s'intègrent dans des projets résidentiels et commerciaux à travers le monde.",
      'ppage.docs.eyebrow': 'Ressources', 'ppage.docs.title': 'Documentation et téléchargements',
      'ppage.doc1.title': 'Catalogue de Produits', 'ppage.doc1.format': 'Document PDF',
      'ppage.doc2.title': 'Spécifications Techniques', 'ppage.doc2.format': 'Document PDF',
      'ppage.doc3.title': "Manuel d'Installation", 'ppage.doc3.format': 'Document PDF',
      'ppage.cta.title': 'Transformez votre<br>espace extérieur',
      'ppage.cta.body': "Obtenez une consultation sur mesure. Nous concevrons la solution de pare-vent parfaite pour votre terrasse.",
      'ppage.cta.btn1': 'Nous Contacter', 'ppage.cta.btn2': "Visiter l'atelier",
      'blog.eyebrow': 'Journal', 'blog.title': "Le Blog d'Airobarrera",
      'blog.subtitle': "Perspectives sur la vie en plein air, le verre architectural, les tendances de conception et la création d'espaces qui respirent.",
      'blog.post1.category': 'Tendances Design',
      'blog.post1.title': "L'essor de la vie intérieure-extérieure : pourquoi les limites en verre remplacent les murs",
      'blog.post1.body1': "Le changement mondial vers la conception biophilique a accéléré une refonte fondamentale de la façon dont nous séparons les espaces intérieurs et extérieurs. Architectes et propriétaires découvrent que la limite la plus élégante est celle à travers laquelle on peut voir.",
      'blog.post1.body2': "Dans cet article, nous explorons les principes de conception derrière les transitions intérieur-extérieur sans couture et le rôle du verre trempé dans l'architecture moderne.",
      'blog.post1.btn': "Lire l'article complet",
      'blog.post2.category': 'Matériaux', 'blog.post2.title': 'Comprendre le verre trempé : ce qui le rend sûr et résistant',
      'blog.post2.body': "Le verre trempé subit un processus thermique contrôlé qui augmente sa résistance jusqu'à cinq fois par rapport au verre recuit standard. Quand il se casse, il se brise en petits fragments émoussés plutôt qu'en éclats dangereux.",
      'blog.post2.btn': 'Lire la Suite →',
      'blog.post3.category': 'Architecture', 'blog.post3.title': '5 erreurs de design de terrasse qui ruinent votre expérience extérieure',
      'blog.post3.body': "Une belle terrasse peut être gâchée par une mauvaise planification. De l'ignorance des patterns de vent au choix de matériaux inadaptés, ces cinq erreurs communes sont faciles à éviter.",
      'blog.post3.btn': 'Lire la Suite →',
      'blog.post4.category': 'Style de Vie', 'blog.post4.title': 'Vie côtière : protégez votre terrasse sans bloquer la vue',
      'blog.post4.body': "Les propriétés en bord de mer font face à des défis uniques — embruns, vents persistants et soleil implacable. Les solutions traditionnelles résolvent un problème tout en en créant un autre : elles bloquent la vue.",
      'blog.post4.btn': 'Lire la Suite →',
      'blog.post5.category': 'Entretien', 'blog.post5.title': "Comment garder votre pare-vent en verre cristallin toute l'année",
      'blog.post5.body': "L'une des questions les plus courantes concerne l'entretien. La bonne nouvelle : le verre trempé nécessite un entretien remarquablement faible.",
      'blog.post5.btn': 'Lire la Suite →',
      'blog.post6.category': 'Durabilité', 'blog.post6.title': "Verre et durabilité : l'argument environnemental pour le vitrage architectural",
      'blog.post6.body': "Le verre est infiniment recyclable. Contrairement aux plastiques qui se dégradent à chaque cycle de recyclage, le verre peut être fondu et reformé sans perte de qualité.",
      'blog.post6.btn': 'Lire la Suite →',
      'blog.post7.category': 'Technologie', 'blog.post7.title': "Verre intelligent : comment la technologie transforme les espaces extérieurs",
      'blog.post7.body': "Du verre électrochromique qui se teinte à la demande aux capteurs intégrés qui répondent aux changements météorologiques, l'avenir du verre extérieur est intelligent.",
      'blog.post7.btn': 'Lire la Suite →',
      'blog.newsletter.title': 'Restez Inspiré',
      'blog.newsletter.body': "Rejoignez notre newsletter pour des inspirations design, des mises à jour produits et des présentations exclusives livrées mensuellement.",
      'blog.newsletter.placeholder': 'Votre adresse e-mail',
      'blog.newsletter.btn': "S'abonner"
    }
  };

  var flagMap = { es: '🇪🇸', en: '🇬🇧', fr: '🇫🇷' };

  function applyTranslation(lang) {
    var t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    document.documentElement.lang = lang;

    var currentFlag = document.getElementById('currentFlag');
    if (currentFlag) currentFlag.textContent = flagMap[lang];

    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch(e) {}
  }

  var langToggle = document.getElementById('langToggle');
  var langOptions = document.getElementById('langOptions');

  if (langToggle && langOptions) {
    langToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = langOptions.classList.contains('open');
      langOptions.classList.toggle('open', !isOpen);
      langToggle.setAttribute('aria-expanded', String(!isOpen));
      langOptions.setAttribute('aria-hidden', String(isOpen));
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('#langSwitcher')) {
        langOptions.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        langOptions.setAttribute('aria-hidden', 'true');
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        applyTranslation(btn.getAttribute('data-lang'));
        langOptions.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        langOptions.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* Init: load saved preference or default to Spanish */
  (function() {
    var saved;
    try { saved = localStorage.getItem(LANG_KEY); } catch(e) {}
    applyTranslation(saved && translations[saved] ? saved : 'es');
  })();

})();
