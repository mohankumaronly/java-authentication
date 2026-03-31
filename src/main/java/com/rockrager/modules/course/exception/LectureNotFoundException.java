package com.rockrager.modules.course.exception;

public class LectureNotFoundException extends RuntimeException {

    // Constructor with message
    public LectureNotFoundException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public LectureNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}