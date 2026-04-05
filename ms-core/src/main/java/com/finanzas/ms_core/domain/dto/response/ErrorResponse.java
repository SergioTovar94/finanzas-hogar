package com.finanzas.ms_core.domain.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ErrorResponse {

    private String code;
    private String message;
    private List<String> details;
    private int status;
    private LocalDateTime timestamp;
    private String path;

}
