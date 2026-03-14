package com.rockrager.authentication.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    public void sendVerificationEmail(String to, String token) {
        String subject = "Verify Your Email - RockRager Authentication";
        String verificationLink = baseUrl + "/api/auth/verify-email?token=" + token;

        String body = String.format("""
            Hello,
            
            Thank you for registering with RockRager Authentication!
            
            Please verify your email address by clicking the link below:
            %s
            
            This link will expire in 24 hours.
            
            If you didn't create an account, please ignore this email.
            
            Best regards,
            RockRager Team
            """, verificationLink);

        sendEmail(to, subject, body);
        log.info("Verification email sent to: {}", to);
    }

    public void sendPasswordResetEmail(String to, String token) {
        String subject = "Reset Your Password - RockRager Authentication";
        String resetLink = baseUrl + "/api/auth/reset-password?token=" + token;

        String body = String.format("""
            Hello,
            
            We received a request to reset your password.
            
            Click the link below to reset your password:
            %s
            
            This link will expire in 1 hour.
            
            If you didn't request a password reset, please ignore this email or contact support.
            
            Best regards,
            RockRager Team
            """, resetLink);

        sendEmail(to, subject, body);
        log.info("Password reset email sent to: {}", to);
    }

    private void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom("RockRanger Auth <mohankumaronly81@gmail.com>");

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}