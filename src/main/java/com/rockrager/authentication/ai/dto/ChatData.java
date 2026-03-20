package com.rockrager.authentication.ai.dto;

public class ChatData {
    private String reply;
    private String chatId;      // For future chat history
    private Integer tokens;      // For token usage tracking

    public ChatData() {}

    public ChatData(String reply) {
        this.reply = reply;
    }

    public ChatData(String reply, String chatId, Integer tokens) {
        this.reply = reply;
        this.chatId = chatId;
        this.tokens = tokens;
    }

    // Getters and Setters
    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public Integer getTokens() {
        return tokens;
    }

    public void setTokens(Integer tokens) {
        this.tokens = tokens;
    }
}