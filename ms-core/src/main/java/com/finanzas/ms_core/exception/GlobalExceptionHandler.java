package com.finanzas.ms_core.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.finanzas.ms_core.domain.dto.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import tools.jackson.databind.exc.InvalidFormatException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

        // 1. Errores de negocio: recurso no encontrado
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(
                        ResourceNotFoundException ex, HttpServletRequest request) {
                log.warn("Recurso no encontrado: {}", ex.getMessage());
                ErrorResponse error = ErrorResponse.builder()
                                .code("NOT_FOUND")
                                .message(ex.getMessage())
                                .status(HttpStatus.NOT_FOUND.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        // 2. IllegalArgumentException (errores de cliente, datos inválidos)
        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ErrorResponse> handleIllegalArgument(
                        IllegalArgumentException ex, HttpServletRequest request) {
                log.warn("Argumento inválido: {}", ex.getMessage());
                ErrorResponse error = ErrorResponse.builder()
                                .code("BAD_REQUEST")
                                .message(ex.getMessage())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.badRequest().body(error);
        }

        // 3. Errores de validación con @Valid (cuerpo de la petición)
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> handleValidationExceptions(
                        MethodArgumentNotValidException ex, HttpServletRequest request) {
                List<String> errors = ex.getBindingResult()
                                .getFieldErrors()
                                .stream()
                                .map(FieldError::getDefaultMessage)
                                .collect(Collectors.toList());

                log.warn("Error de validación en campos: {}", errors);
                ErrorResponse error = ErrorResponse.builder()
                                .code("VALIDATION_ERROR")
                                .message("Datos de entrada inválidos")
                                .details(errors) // añade un campo 'details' en ErrorResponse
                                .status(HttpStatus.BAD_REQUEST.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.badRequest().body(error);
        }

        // 4. Errores de validación en parámetros de ruta/query
        @ExceptionHandler({
                        MissingServletRequestParameterException.class,
                        MethodArgumentTypeMismatchException.class,
                        jakarta.validation.ConstraintViolationException.class
        })
        public ResponseEntity<ErrorResponse> handleRequestParameterErrors(
                        Exception ex, HttpServletRequest request) {
                log.warn("Error en parámetros de petición: {}", ex.getMessage());
                ErrorResponse error = ErrorResponse.builder()
                                .code("INVALID_REQUEST_PARAMETER")
                                .message("Parámetro de petición inválido: " + ex.getMessage())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.badRequest().body(error);
        }

        // 5. Tus excepciones existentes (AuthException, RegistrationException)
        @ExceptionHandler(AuthException.class)
        public ResponseEntity<ErrorResponse> handleAuthException(
                        AuthException ex, HttpServletRequest request) {
                log.warn("Error de autenticación: {}", ex.getMessage());
                ErrorResponse error = ErrorResponse.builder()
                                .code("AUTH_ERROR")
                                .message(ex.getMessage())
                                .status(HttpStatus.UNAUTHORIZED.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        @ExceptionHandler(RegistrationException.class)
        public ResponseEntity<ErrorResponse> handleRegistrationException(
                        RegistrationException ex, HttpServletRequest request) {
                log.warn("Error de registro: {}", ex.getMessage());
                ErrorResponse error = ErrorResponse.builder()
                                .code("REGISTRATION_ERROR")
                                .message(ex.getMessage())
                                .status(HttpStatus.BAD_REQUEST.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.badRequest().body(error);
        }

        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<Map<String, Object>> handleInvalidEnum(
                        HttpMessageNotReadableException ex) {

                Map<String, Object> response = new HashMap<>();

                response.put("error", "Valor inválido en el cuerpo de la solicitud");

                Throwable cause = ex.getCause();

                if (cause instanceof InvalidFormatException ife &&
                                ife.getTargetType().isEnum()) {

                        Class<?> enumClass = ife.getTargetType();

                        Object[] enumValues = enumClass.getEnumConstants();

                        response.put("Valores esperados", enumValues);
                }

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        // 6. Fallback para cualquier otro error no esperado (500)
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGenericException(
                        Exception ex, HttpServletRequest request) {
                log.error("Error interno no controlado en {}: {}", request.getRequestURI(), ex.getMessage(), ex);
                ErrorResponse error = ErrorResponse.builder()
                                .code("INTERNAL_SERVER_ERROR")
                                .message("Ha ocurrido un error interno. Por favor, intente más tarde.")
                                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
}