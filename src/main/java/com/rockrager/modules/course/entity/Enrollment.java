package com.rockrager.modules.course.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "enrollments",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "course_id"}, name = "uk_user_course")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // 🔹 User (assuming User entity exists in your project)
    @Column(name = "user_id", nullable = false)
    private String userId;

    // Optional: denormalized user data for quick access
    private String userName;
    private String userEmail;

    // 🔹 Course
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // 🔹 Enrollment Info
    @Builder.Default
    private LocalDateTime enrolledAt = LocalDateTime.now();

    private LocalDateTime completedAt;

    // 🔹 Progress Tracking
    @Builder.Default
    private Double progressPercentage = 0.0;

    @Builder.Default
    private Boolean completed = false;

    // 🔹 Last watched lecture (for resume feature)
    private String lastLectureId;
    private String lastLectureTitle;

    private Integer lastPosition; // position in seconds

    // 🔹 Watch time tracking (analytics)
    @Builder.Default
    private Long totalWatchTime = 0L; // total seconds watched

    // 🔹 Last access (for "continue watching")
    private LocalDateTime lastAccessedAt;

    // 🔹 Certificate
    @Builder.Default
    private Boolean certificateIssued = false;

    private String certificateUrl;

    // 🔹 Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.enrolledAt = LocalDateTime.now();
        this.lastAccessedAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        this.lastAccessedAt = LocalDateTime.now();
    }
}