import { google } from 'googleapis';

export default async function handler(req,res){
  if(req.method==='GET') return res.status(200).json({ok:true,service:'PacTech API',node:process.version});
  if(req.method!=='POST') return res.status(405).json({error:'Método no permitido'});
  try{
    const {name,email,phone,model,message}=req.body||{};
    if(!name||!email||!phone||!message) return res.status(400).json({error:'Faltan campos obligatorios'});
    const oauth2Client=new google.auth.OAuth2(process.env.GMAIL_CLIENT_ID,process.env.GMAIL_CLIENT_SECRET,process.env.GMAIL_REDIRECT_URI||'https://developers.google.com/oauthplayground');
    oauth2Client.setCredentials({refresh_token:process.env.GMAIL_REFRESH_TOKEN});
    const gmail=google.gmail({version:'v1',auth:oauth2Client});
    const subject=`Consulta web PacTech - ${name}`;
    const text=`Nueva consulta desde pacojetech.com.es\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nModelo: ${model||'No indicado'}\n\nMensaje:\n${message}`;
    const raw=Buffer.from(`From: ${process.env.GMAIL_FROM||'soporte@kelatos.com'}\r\nTo: soporte@kelatos.com\r\nReply-To: ${email}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset="UTF-8"\r\n\r\n${text}`).toString('base64url');
    await gmail.users.messages.send({userId:'me',requestBody:{raw}});
    return res.status(200).json({ok:true});
  }catch(e){console.error(e);return res.status(500).json({error:'Error al enviar el formulario'});}
}