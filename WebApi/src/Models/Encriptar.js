const crypto = require('crypto');

export async function encriptar(mensaje, valorRamdon) {
    const hash = "coding con c";
    const hashCombinado = hash + valorRamdon;
    const data = Buffer.from(mensaje, 'utf-8');

    // Generar hash MD5 de longitud fija (16 bytes)
    const md5 = crypto.createHash('md5');
    const key = md5.update(hashCombinado, 'utf-8').digest().slice(0, 16); // Seleccionar los primeros 16 bytes del hash

    // Utilizar AES en lugar de TripleDES
    const cipher = crypto.createCipheriv('aes-128-cbc', key, Buffer.alloc(16)); // IV debe tener la misma longitud que el bloque de cifrado (16 bytes)

    let resultado = cipher.update(data, 'utf-8', 'base64');
    resultado += cipher.final('base64');

    return resultado;
}


export async function desencriptar(mensajeEncriptado, valorAleatorio) {
    try {
        const hash = "coding con c";
        const hashCombinado = hash + valorAleatorio;
        
        // Obtener la clave a partir del hash combinado
        const md5 = crypto.createHash('md5');
        const key = md5.update(hashCombinado, 'utf-8').digest().slice(0, 16); // Seleccionar los primeros 16 bytes del hash

        // Decifrar el mensaje utilizando AES
        const decipher = crypto.createDecipheriv('aes-128-cbc', key, Buffer.alloc(16)); // IV debe tener la misma longitud que el bloque de cifrado (16 bytes)

        let resultado = decipher.update(mensajeEncriptado, 'base64', 'utf-8');
        resultado += decipher.final('utf-8');

        return resultado;
    } catch (error) {
        console.error("Error al desencriptar:", error);
        throw error; // Relanzar el error para manejarlo en el lugar donde se llama a esta función
    }
}


export async function generarCodigoAleatorio() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const longitud = 10;
    let codigo = "";

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indice);
    }

    return codigo;
}



