package com.rockrager.modules.course.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lectures")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    // 🔹 Basic Info
    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    // 🔹 Order inside course (for sequencing)
    private Integer orderIndex;

    // 🔥 Cloudinary Video
    @Column(nullable = false)
    private String videoUrl;

    private String videoPublicId;

    // Optional: video metadata
    private Integer videoDuration; // in seconds
    private Long videoSize; // in bytes
    private String videoFormat; // mp4, mkv, etc.

    // 🔥 Thumbnail (video preview image)
    private String thumbnailUrl;
    private String thumbnailPublicId;

    // 🔹 Metadata
    private String duration; // formatted duration like "10:35"

    @Builder.Default
    private Boolean isPreview = false; // Free preview for non-enrolled users

    // 🔹 Relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // 🔹 Stats (optional for now)
    @Builder.Default
    private Long views = 0L;

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
    }
}