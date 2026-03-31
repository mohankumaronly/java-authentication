package com.rockrager.modules.course.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponse {

    private String id;
    private Integer rating;
    private String comment;

    private String userId;
    private String userName;
    private String userAvatar;

    private Boolean isVerifiedPurchase;
    private Integer helpfulCount;

    private String createdAt;
}