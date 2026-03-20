package com.rockrager.authentication.ai.provider;

import com.rockrager.authentication.ai.config.AiConfig;
import com.rockrager.authentication.ai.exception.AiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Component
public class GeminiProvider {

    private static final Logger logger = LoggerFactory.getLogger(GeminiProvider.class);

    private final RestTemplate restTemplate;
    private final AiConfig aiConfig;

    public GeminiProvider(RestTemplate restTemplate, AiConfig aiConfig) {
        this.restTemplate = restTemplate;
        this.aiConfig = aiConfig;
    }

    public String generate(String prompt) {
        long startTime = System.currentTimeMillis();

        try {
            logger.info("🤖 AI Request - Prompt: {}", prompt.length() > 100 ? prompt.substring(0, 100) + "..." : prompt);

            // Build the request body for Gemini API
            Map<String, Object> requestBody = buildRequestBody(prompt);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build the full URL with API key
            String url = aiConfig.getApiUrl() + "?key=" + aiConfig.getApiKey();

            // Create HTTP entity
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // Make the API call
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );

            // Parse the response
            if (response.getBody() != null && response.getStatusCode().is2xxSuccessful()) {
                String generatedText = extractTextFromResponse(response.getBody());
                long duration = System.currentTimeMillis() - startTime;
                logger.info("✅ AI Response - Tokens: ~{} chars, Duration: {}ms", generatedText.length(), duration);
                return generatedText;
            } else {
                logger.error("❌ API response error: Status={}", response.getStatusCode());
                throw new AiException("Failed to get response from Gemini API");
            }

        } catch (RestClientException e) {
            logger.error("❌ Error calling Gemini API: {}", e.getMessage());
            throw new AiException("Error communicating with Gemini API: " + e.getMessage(), e);
        }
    }

    private Map<String, Object> buildRequestBody(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();

        // Create contents array with system prompt and user message
        List<Map<String, Object>> contents = new ArrayList<>();

        // Add system instruction (if supported by model)
        Map<String, Object> systemInstruction = new HashMap<>();
        Map<String, Object> systemPart = new HashMap<>();
        systemPart.put("text", aiConfig.getSystemPrompt());
        systemInstruction.put("parts", List.of(systemPart));
        requestBody.put("systemInstruction", systemInstruction);

        // Add user message
        Map<String, Object> userContent = new HashMap<>();
        Map<String, Object> userPart = new HashMap<>();
        userPart.put("text", prompt);
        userContent.put("parts", List.of(userPart));
        userContent.put("role", "user");
        contents.add(userContent);

        requestBody.put("contents", contents);

        // Generation config with configurable tokens
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", aiConfig.getTemperature());
        generationConfig.put("maxOutputTokens", aiConfig.getMaxTokens());
        generationConfig.put("topP", 0.95);
        generationConfig.put("topK", 40);
        requestBody.put("generationConfig", generationConfig);

        // Safety settings
        List<Map<String, String>> safetySettings = List.of(
                Map.of("category", "HARM_CATEGORY_HARASSMENT", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
                Map.of("category", "HARM_CATEGORY_HATE_SPEECH", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
                Map.of("category", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
                Map.of("category", "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold", "BLOCK_MEDIUM_AND_ABOVE")
        );
        requestBody.put("safetySettings", safetySettings);

        return requestBody;
    }

    private String extractTextFromResponse(Map<String, Object> response) {
        try {
            // Navigate through the response structure
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> firstCandidate = candidates.get(0);

                // Check if content exists
                Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                if (content == null) {
                    logger.error("No content in response: {}", firstCandidate);
                    throw new AiException("No content in Gemini response");
                }

                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    String text = (String) parts.get(0).get("text");
                    if (text != null && !text.isEmpty()) {
                        return text;
                    }
                }
            }

            // Check if there's a finish reason
            if (candidates != null && !candidates.isEmpty()) {
                String finishReason = (String) candidates.get(0).get("finishReason");
                if (finishReason != null && !"STOP".equals(finishReason)) {
                    logger.warn("Response finished with reason: {}", finishReason);
                    throw new AiException("Response blocked or incomplete: " + finishReason);
                }
            }

            throw new AiException("Unable to extract text from Gemini response");
        } catch (Exception e) {
            logger.error("Error parsing Gemini response: {}", e.getMessage());
            throw new AiException("Failed to parse Gemini API response", e);
        }
    }
}