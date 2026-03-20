package com.rockrager.authentication.ai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AiConfig {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent}")
    private String apiUrl;

    @Value("${gemini.model:gemini-2.5-flash}")
    private String model;

    @Value("${gemini.max-tokens:500}")
    private int maxTokens;

    @Value("${gemini.temperature:0.7}")
    private double temperature;

    @Value("${gemini.system-prompt:You are a helpful AI assistant for a learning platform. Provide clear, concise, and accurate responses.}")
    private String systemPrompt;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public String getApiKey() {
        return apiKey;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public String getModel() {
        return model;
    }

    public int getMaxTokens() {
        return maxTokens;
    }

    public double getTemperature() {
        return temperature;
    }

    public String getSystemPrompt() {
        return systemPrompt;
    }
}