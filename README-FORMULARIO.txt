CORRECCIÓN FORMULARIO PACTECH

El código anterior esperaba variables GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / GMAIL_REFRESH_TOKEN.
En Vercel tienes configuradas:
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
GOOGLE_EMAIL
CONTACT_EMAIL

api/contact.js ha sido corregido para usar exactamente esas variables (y mantiene compatibilidad con los nombres GMAIL_* antiguos).

Después de subir y desplegar:
1. Abre https://pacojetech.com.es/api/contact
2. Debe mostrar environment con todos los valores true.
3. Prueba el formulario.
4. Si aún falla, revisa Vercel Logs. El código devolverá GOOGLE_OAUTH_INVALID_GRANT, GOOGLE_OAUTH_INVALID_CLIENT o EMAIL_SEND_FAILED según el caso.
