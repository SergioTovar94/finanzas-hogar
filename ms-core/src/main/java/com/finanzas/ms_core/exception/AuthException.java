package com.finanzas.ms_core.exception;

/**
 * Excepción personalizada para errores relacionados con autenticación
 * y autorización en el sistema.
 *
 * Se utiliza cuando:
 * - Las credenciales son inválidas
 * - El usuario no está autenticado
 * - El token es inválido o expiró
 * - El usuario no tiene permisos
 *
 * Alcance:
 * - Solo debe utilizarse para seguridad (login, token, permisos)
 * - No debe utilizarse para errores de registro o validación
 *
 * Ejemplo de uso:
 *
 * throw new AuthException("Credenciales inválidas");
 */
public class AuthException extends RuntimeException {

    /**
     * Crea una nueva excepción de autenticación.
     *
     * @param message Mensaje descriptivo del error
     */
    public AuthException(String message) {
        super(message);
    }

}
