package com.example.backend.dto.request;

import com.example.backend.models.FractionEnum;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * This is the data transfer object for the update fraction request
 */

public class UpdateFractionRequestDto {
        @Enumerated(EnumType.STRING)
        public FractionEnum fraction;
}
