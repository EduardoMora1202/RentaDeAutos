const nodemailer = require("nodemailer");
import { GenerarCodigoAleatorio } from "../Models/Validaciones";

// Función para enviar correo electrónico con nodemailer
export async function sendMail(correoDestino) {
    try {
        // Configurar el transporte SMTP para enviar correos electrónicos
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        const codigoVerificacion = await GenerarCodigoAleatorio();

        // Configurar el correo electrónico
        let info = await transporter.sendMail({
            from: process.env.USER, // Dirección de correo electrónico del remitente
            to: correoDestino, // Dirección de correo electrónico del destinatario
            subject: "Código de Verificaciónaaaa", // Asunto del correo electrónico
            text: `Tu código de verificación es: ${codigoVerificacion}`, // Cuerpo del correo electrónico
        });

        console.log("Correo enviado:", info.messageId);

        return { success: true, msg: "Correo enviado con éxito", codigoVerificacion: codigoVerificacion };
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        throw new Error("Hubo un error al enviar el correo electrónico");
    }
}
