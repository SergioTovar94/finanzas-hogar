package com.finanzas.ms_core.exception;

/**
 * Excepción para errores de registro de usuarios.
 *
 * Se utiliza cuando ocurre un problema durante la creación
 * de una cuenta en el sistema.
 *
 * Ejemplos:
 * - Correo ya registrado
 * - Usuario ya existe
 * - Datos inválidos
 */

public class RegistrationException extends RuntimeException {

    public RegistrationException(String message) {
        super(message);
    }

}
