package com.rockrager.modules.course.exception;

public class CourseNotFoundException extends RuntimeException {

    // Constructor with message
    public CourseNotFoundException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public CourseNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}