package com.rockrager.authentication.ai.dto;

/**
 * @deprecated Use BaseResponse<ChatData> instead for better scalability
 */
@Deprecated
public class ChatResponse {
    private boolean success;
    private String reply;
    private String error;

    private ChatResponse() {}

    public static ChatResponse success(String reply) {
        ChatResponse response = new ChatResponse();
        response.success = true;
        response.reply = reply;
        response.error = null;
        return response;
    }

    public static ChatResponse error(String error) {
        ChatResponse response = new ChatResponse();
        response.success = false;
        response.reply = null;
        response.error = error;
        return response;
    }

    // Getters and Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}