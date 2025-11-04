package com.vitorpaulinog.youlyrics.backend.handler;

import com.vitorpaulinog.youlyrics.backend.dto.response.DefaultErrorResponseDto;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ApiResponse(responseCode = "400", ref = "#/components/responses/ValidationViolation")
    public DefaultErrorResponseDto handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return DefaultErrorResponseDto.builder()
                .code("VALIDATION_ERROR")
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ApiResponse(responseCode = "400", ref = "#/components/responses/ValidationViolation")
    public DefaultErrorResponseDto handleConstraintViolationException(ConstraintViolationException ex) {
        return DefaultErrorResponseDto.builder()
                .code("VALIDATION_ERROR")
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public DefaultErrorResponseDto handleConstraintViolationException(AuthorizationDeniedException ex) {
        return DefaultErrorResponseDto.builder()
                .code("AUTHORIZATION_ERROR")
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public DefaultErrorResponseDto handleException(Exception ex) {
        return DefaultErrorResponseDto.builder()
                .code("UNKNOWN_ERROR")
                .message(ex.getMessage())
                .build();
    }

}
