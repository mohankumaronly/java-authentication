package com.rockrager.authentication.ai.controller;

import com.rockrager.authentication.ai.dto.*;
import com.rockrager.authentication.ai.exception.AiException;
import com.rockrager.authentication.ai.service.AiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private static final Logger logger = LoggerFactory.getLogger(AiController.class);

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<BaseResponse<ChatData>> chat(@RequestBody ChatRequest request) {
        try {
            logger.info("📨 Received chat request: {}",
                    request.getMessage().length() > 50 ?
                            request.getMessage().substring(0, 50) + "..." :
                            request.getMessage());

            // Validate request
            if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
                logger.warn("⚠️ Empty message received");
                return ResponseEntity
                        .badRequest()
                        .body(BaseResponse.error("Message cannot be empty"));
            }

            // Generate a unique chat ID for this conversation
            String chatId = UUID.randomUUID().toString();

            // Process the chat
            long startTime = System.currentTimeMillis();
            String reply = aiService.chat(request.getMessage());
            long duration = System.currentTimeMillis() - startTime;

            // Calculate approximate tokens (rough estimate: 4 chars ≈ 1 token)
            int estimatedTokens = reply.length() / 4;

            // Create chat data with metadata
            ChatData chatData = new ChatData(reply, chatId, estimatedTokens);

            logger.info("✅ Chat successful - ID: {}, Tokens: {}, Duration: {}ms",
                    chatId, estimatedTokens, duration);

            // Return success response with data wrapper
            return ResponseEntity.ok(BaseResponse.success(chatData));

        } catch (AiException e) {
            logger.error("❌ AI Exception: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponse.error(e.getMessage()));
        } catch (Exception e) {
            logger.error("❌ Unexpected error: {}", e.getMessage(), e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponse.error("An unexpected error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<BaseResponse<String>> health() {
        return ResponseEntity.ok(BaseResponse.success("AI Service is running"));
    }
}