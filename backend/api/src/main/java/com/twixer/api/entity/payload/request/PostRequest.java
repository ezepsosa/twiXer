package com.twixer.api.entity.payload.request;

import java.util.List;
import jakarta.persistence.ElementCollection;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostRequest {
    
	@NotBlank
    private String text;
    
    @ElementCollection
    private List<String> media;

}
