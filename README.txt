PACTECH ONE PAGE

Dominio: https://pacojetech.com.es/
Teléfono solo caja de información del hero: +34 918 29 06 56
Teléfono de botones de llamada: +34 914 46 85 03
Diagnóstico: 20 € + IVA

Se mantiene la misma estructura de GigabyteTech y se adaptan únicamente textos, identidad visual y colores.

Variables SMTP compartidas en Vercel:
SMTP_HOST=cp7124.webempresa.eu
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=soporte@kelatos.com
SMTP_PASS=[configurada únicamente en Vercel]
CONTACT_EMAIL=soporte@kelatos.com

El correo no aparece visible en la web; solo se usa en backend.

Google Analytics:
G-BQC3ZMDG6G

REVISIÓN (fixes adicionales aplicados):
- Ya tenía menú móvil, colisión del chatbot corregida, schema.org y
  borde blanco del chat (de un commit anterior); no se ha tocado.
- Botón de teléfono del menú (.navcall): acortado a solo el número
  (mismo problema de línea partida visto en otros repos de la familia);
  añadido white-space:nowrap.
- Añadida sección de contenido SEO propio (#guia), enlazada en el menú.
- Banner de cookies: no existía. Añadido (Aceptar / Rechazar / Política
  de privacidad → https://kelatos.com/privacy-policy/), con diseño
  apilado a ancho completo en móvil.

REDIRECCIÓN DE URLS ANTIGUAS:
Este sitio era antes multipágina (tenía /servicios/... y /modelos/...,
eliminados en commits anteriores al pasar a one-page). Añadido
middleware.mjs: cualquier URL que no sea "/" redirige (301) a la home.
Añadida la dependencia "@vercel/functions" en package.json.

REVISIÓN ADICIONAL (esta pasada):
- H1 no seguía la regla final de la familia: era largo y contenía la
  palabra condicional "si merece la pena repararlo". Reescrito, corto
  y afirmativo: "Tu Pacojet no tritura bien. Aquí lo revisamos
  rápido." (9 palabras).
- Verificado: schema.org ya usaba correctamente el teléfono de la caja
  de información (+34 918 29 06 56); borde del chat, sección SEO,
  banner de cookies y dominio ya correctos. El color --cyan del
  proyecto es la paleta propia de PacoJet (no residual); no se ha
  tocado. No se ha cambiado nada más.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente):
- H1 ya era distinto ("no tritura bien" es específico de este repo,
  no repite ninguna plantilla usada en otros); verificado, sin
  cambios.
- BUG REAL — dos textos decorativos gigantes sin reducción de tamaño
  en móvil/tablet: ".problems:before" ("PACTECH", 170px) y
  ".data-art:before" ("DATA", 120px). Añadida reducción en tablet
  (100px/80px) y móvil (60px/50px).
- BUG REAL — el formulario no tenía ninguna casilla de consentimiento
  de política de privacidad. Añadida, con enlace a
  https://kelatos.com/privacy-policy/ en azul y subrayado.
- Añadida franja de aviso de servicio técnico independiente debajo
  del menú (no existía).
- Añadido "Sábados, domingos y días festivos estamos cerrados" debajo
  del horario.
- Botón "Atención Telefónica..." sin icono, a diferencia del de
  WhatsApp. Añadido (verificado con cuidado el cierre de </a>).
- Verificado: sin .hero-chip/.hero-tag/.hero-pill; schema.org ya
  usaba correctamente el teléfono de la caja de información;
  formulario correctamente conectado a /api/contacto.

REVISIÓN ADICIONAL (checklist unificado de la familia, a petición del cliente — repo 13/48):
- BUG REAL — enlace de Cal.com desactualizado. Actualizado a
  https://cal.com/kelatos/30min?embed=true&theme=light&attendeePhoneNumber=%2B34&overlayCalendar=true.
- Verificado: el correo soporte@kelatos.com no aparece visible.
- BUG REAL — el mensaje prellenado de WhatsApp decía "¡Hola Kelatos!".
  Corregido a "¡Hola PacTech!".
- Verificado: el menú móvil (#mainMenu) ya se cerraba correctamente al
  pulsar un enlace.
- Verificado: sin iconos ni imágenes con proporciones fijas
  incorrectas.
- BUG REAL — el H1 en móvil estaba en 40px. Corregido a 48px.
- BUG REAL — botones del hero (.cta) con border-radius de 15px y sin
  estado hover. Aumentado a border-radius:999px; añadido
  filter:brightness(.88) en whatsapp/pickup (colores sólidos/brillantes).
  El botón de teléfono (.phone) usa fondo casi negro (#0d1217, mismo
  patrón que GigabyteTech): oscurecerlo más no sería perceptible, así
  que se aclara el fondo/borde al pasar el ratón en su lugar (desviación
  deliberada y documentada de "más oscuro", ya que el objetivo real es
  que se note interactivo).
- Verificado: este repo no usa el patrón de franja de insignias bajo
  el H1 (familia Dyson); no aplica la reubicación.
