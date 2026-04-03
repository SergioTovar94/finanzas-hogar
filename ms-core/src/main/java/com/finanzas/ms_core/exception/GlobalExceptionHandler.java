package com.finanzas.ms_core.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.finanzas.ms_core.domain.dto.response.ErrorResponse;

/**
 * Manejador global de excepciones para la aplicación.
 *
 * Esta clase intercepta las excepciones lanzadas desde los controladores
 * y servicios, y construye una respuesta estándar para el cliente.
 *
 * Permite centralizar el manejo de errores y evitar duplicación de código
 * en los controladores.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja las excepciones relacionadas con autenticación y autorización.
     *
     * Este método se ejecuta cuando se lanza una AuthException en cualquier
     * parte de la aplicación.
     *
     * Responsabilidad:
     * - Construir una respuesta de error estándar para problemas de autenticación
     * - Retornar el código HTTP 401 (UNAUTHORIZED)
     *
     * Alcance:
     * - Solo aplica a errores de autenticación o autorización
     * - No maneja errores de validación, registro o lógica de negocio
     *
     * @param ex Excepción de autenticación lanzada
     * @return Respuesta HTTP con información del error
     */

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorResponse> handleAuthException(AuthException ex) {
        ErrorResponse error = new ErrorResponse(
                "AUTH_ERROR",
                ex.getMessage(),
                HttpStatus.UNAUTHORIZED.value(),
                LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Maneja errores relacionados con el registro de usuarios.
     *
     * Retorna el código HTTP 400 (BAD REQUEST).
     */
    @ExceptionHandler(RegistrationException.class)
    public ResponseEntity<ErrorResponse> handleRegistrationException(
            RegistrationException ex) {

        ErrorResponse error = new ErrorResponse(
                "REGISTRATION_ERROR",
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja excepciones de validación de datos.
     *
     * Este método actúa cuando ocurre un error de validación en los datos de
     * entrada,
     * como cuando un campo obligatorio no se proporciona
     * o no cumple con las restricciones definidas.
     * 
     * Responsabilidad:
     * - Evitar que el front envíe datos inválidos al backend
     *
     * Alcance:
     * - Solo maneja errores de validación de datos
     * (MethodArgumentNotValidException)
     *
     * @param ex Excepción de validación lanzada
     * @return Respuesta HTTP 400 (El cliente envió una solicitud inválida)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .get(0)
                .getDefaultMessage();

        ErrorResponse error = new ErrorResponse(
                "VALIDATION_ERROR",
                message,
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja cualquier excepción no controlada en la aplicación.
     *
     * Este método actúa como último recurso cuando ocurre un error
     * inesperado que no tiene un manejador específico.
     *
     * Responsabilidad:
     * - Evitar que errores internos expongan información sensible
     * - Retornar una respuesta genérica al cliente
     *
     * Alcance:
     * - Maneja errores generales del sistema
     * - No debe utilizarse para errores de negocio específicos
     *
     * @param ex Excepción genérica lanzada
     * @return Respuesta HTTP 500 (INTERNAL SERVER ERROR)
     */

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                "INTERNAL_ERROR",
                "Error interno del servidor",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
