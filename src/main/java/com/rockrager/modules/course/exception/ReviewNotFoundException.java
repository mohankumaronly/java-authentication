package com.rockrager.modules.course.exception;

public class ReviewNotFoundException extends RuntimeException {

    // Constructor with message
    public ReviewNotFoundException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public ReviewNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}