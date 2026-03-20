package com.rockrager.authentication.ai.dto;

public class BaseResponse<T> {
    private boolean success;
    private T data;
    private String error;

    public BaseResponse() {}

    private BaseResponse(boolean success, T data, String error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    // Factory method for success response
    public static <T> BaseResponse<T> success(T data) {
        return new BaseResponse<>(true, data, null);
    }

    // Factory method for error response
    public static <T> BaseResponse<T> error(String error) {
        return new BaseResponse<>(false, null, error);
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}