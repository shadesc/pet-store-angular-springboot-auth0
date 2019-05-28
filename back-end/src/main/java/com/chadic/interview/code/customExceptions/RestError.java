/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
package com.chadic.interview.code.customExceptions;

import org.springframework.http.HttpStatus;

public class RestError {
	private HttpStatus status;
	private String message;

	private RestError() {}

	RestError(HttpStatus status) {
		this();
		this.status = status;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}
}

