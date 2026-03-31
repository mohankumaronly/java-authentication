package com.rockrager.modules.course.dto.request;

import lombok.Data;

@Data
public class EnrollRequest {

    private String paymentId;
    private String couponCode;
}