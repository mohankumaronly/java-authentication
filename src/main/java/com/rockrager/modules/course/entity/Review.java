package com.rockrager.modules.course.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "reviews",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "course_id"}, name = "uk_user_course_review")
        },
        indexes = {
                @Index(name = "idx_course_rating", columnList = "course_id, rating"),
                @Index(name = "idx_created_at", columnList = "createdAt")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // 🔹 User (who gave review)
    @Column(name = "user_id", nullable = false)
    private String userId;

    // Denormalized user data for performance (avoids extra joins)
    private String userName;
    private String userAvatar;

    // 🔹 Course (which course is being reviewed)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // 🔹 Rating (1-5 stars)
    @Column(nullable = false)
    private Integer rating;

    // 🔹 Review Comment
    @Column(length = 1000)
    private String comment;

    // 🔹 Pro Features (Optional - add later)
    @Builder.Default
    private Integer helpfulCount = 0; // How many found this review helpful

    @Builder.Default
    private Boolean isVerifiedPurchase = false; // User actually bought the course

    @Builder.Default
    private Boolean isEdited = false; // Track if review was edited

    // 🔹 Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        this.isEdited = true;
    }
}