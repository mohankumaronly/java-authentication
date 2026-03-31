package com.rockrager.modules.course.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LectureResponse {

    private String id;
    private String title;
    private String description;

    private Integer orderIndex;

    private String videoUrl;
    private String thumbnailUrl;

    private String duration;
    private Integer durationSeconds;

    private Boolean isPreview;
}