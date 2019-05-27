package com.chadic.interview.code.customExceptions;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
	private ResponseEntity<Object> buildResponseEntity(RestError restError) {
		return new ResponseEntity<>(restError, restError.getStatus());
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	protected ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
		RestError restError = new RestError(HttpStatus.NOT_FOUND);// return 404 instead of 200
		restError.setMessage(ex.getMessage());
		
		return buildResponseEntity(restError);
	}
}

