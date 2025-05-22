import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    const { 
      nombre, 
      apellidos, 
      email, 
      telefono, 
      instagram, 
      comoNosConociste, 
      experienciaViaje,
      importanciaCompartir,
      ritualPersonal,
      filosofiaViaje
    } = formData;

    // Validar datos mínimos requeridos
    if (!nombre || !apellidos || !email || !telefono) {
      return NextResponse.json(
        { message: 'Los campos nombre, apellidos, email y teléfono son obligatorios' },
        { status: 400 }
      );
    }

    // LOG para depuración de variables de entorno
    console.log('CONFIG SMTP:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD ? '***' : undefined,
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
    });

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Aseguramos que sea número
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Configurar el mensaje de correo electrónico
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `Nuevo formulario de contacto - ${nombre} ${apellidos}`,
      html: `
        <h1>Nuevo formulario de contacto</h1>
        
        <h2>Datos personales</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Instagram:</strong> ${instagram || 'No proporcionado'}</p>
        <p><strong>¿Cómo nos conociste?:</strong> ${comoNosConociste || 'No proporcionado'}</p>
        
        <h2>Información adicional</h2>
        <p><strong>Experiencia de viaje transformadora:</strong> ${experienciaViaje || 'No proporcionado'}</p>
        <p><strong>Importancia de compartir experiencias:</strong> ${importanciaCompartir || 'No proporcionado'}</p>
        <p><strong>Ritual personal en viajes:</strong> ${ritualPersonal || 'No proporcionado'}</p>
        <p><strong>Filosofía de viaje en tres palabras:</strong> ${filosofiaViaje || 'No proporcionado'}</p>
      `,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    // Retornar respuesta exitosa
    return NextResponse.json(
      { message: 'Formulario enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    return NextResponse.json(
      { message: 'Error al enviar formulario: ' + error.message },
      { status: 500 }
    );
  }
} 