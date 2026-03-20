package com.rockrager.authentication.ai.service;

import com.rockrager.authentication.ai.exception.AiException;
import com.rockrager.authentication.ai.provider.GeminiProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private static final Logger logger = LoggerFactory.getLogger(AiService.class);

    private final GeminiProvider geminiProvider;

    public AiService(GeminiProvider geminiProvider) {
        this.geminiProvider = geminiProvider;
    }

    public String chat(String message) {
        try {
            logger.info("💬 Processing chat message: {}",
                    message.length() > 100 ? message.substring(0, 100) + "..." : message);

            // Validate input
            if (message == null || message.trim().isEmpty()) {
                throw new AiException("Message cannot be empty");
            }

            // Call Gemini provider
            long startTime = System.currentTimeMillis();
            String response = geminiProvider.generate(message);
            long duration = System.currentTimeMillis() - startTime;

            logger.info("✨ Chat response generated in {}ms", duration);
            return response;

        } catch (AiException e) {
            logger.error("❌ AI Service error: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("❌ Unexpected error in chat service: {}", e.getMessage(), e);
            throw new AiException("Failed to process chat request: " + e.getMessage(), e);
        }
    }
}