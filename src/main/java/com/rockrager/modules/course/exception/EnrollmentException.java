package com.rockrager.modules.course.exception;

public class EnrollmentException extends RuntimeException {

    // Constructor with message
    public EnrollmentException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public EnrollmentException(String message, Throwable cause) {
        super(message, cause);
    }
}