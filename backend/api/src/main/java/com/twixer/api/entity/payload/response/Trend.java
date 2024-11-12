package com.twixer.api.entity.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trend {
	
	private String word;
	
	private Long postCount;

}
