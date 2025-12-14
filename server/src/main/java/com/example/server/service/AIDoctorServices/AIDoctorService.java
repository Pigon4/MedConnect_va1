package com.example.server.service.AIDoctorServices;


import com.example.server.dto.GeminiDTO.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AIDoctorService {

    private final String aiDoctorURL = "https://aiplatform.googleapis.com/v1/projects/gen-lang-client-0975020993/locations/us-central1/publishers/google/models/gemini-2.0-flash-001:generateContent";
    private final String googleCloudToken = "ya29.a0Aa7pCA8bQv6EhqI7brEscHhX2O8Fi6gonaNgrYRXhMKfV5XGUcRjpeSkhghgAcuswVN0Oj2gTgj0ONYF1GiAE6lNzSgSoS2WyFe1tTFyvgpnImx5oLId2iMubyDIrRS4Mezu-ZC4F2M7vSNNem64bqq-Tlvpx1izfvq5-iacR1CgBTnFDeIe_Y0TOWq_tv7jbctZLA4RPO6mhAaCgYKAbkSARASFQHGX2MiN1HRuj8e9PdRElWM0y2OTw0213";
    private final String geminiUrl = "https://aiplatform.googleapis.com/v1/projects/gen-lang-client-0975020993/locations/us-central1/publishers/google/models/gemini-2.0-flash-001:generateContent";


    public ResponseEntity<AIDoctorResponseDTO> callGeminiDoctor(String userInputText) {

        GeminiRequestDTO requestBody = buildRequestBody(userInputText);
        HttpEntity<GeminiRequestDTO> entity = buildHttpEntity(requestBody);

        ResponseEntity<GeminiResponseDTO> response =
                callGeminiApi(entity);

        AIDoctorResponseDTO result =
                mapToAIDoctorResponse(response);

        return ResponseEntity.ok(result);
    }

    // ---------------- HELPERS ---------------- //

    private GeminiRequestDTO buildRequestBody(String userInputText) {

        PartDTO systemPart = new PartDTO();
        systemPart.setText(
                "You are a medical assistant chatbot. Your purpose is to provide information related to health, symptoms, conditions, and general medical advice. You must not answer any questions that are non-medical. If a user asks a question that is not health-related, provide a response like \"I can only provide medical advice. Please ask a health-related question."
        );

        SystemInstructionsDTO systemInstruction = new SystemInstructionsDTO();
        systemInstruction.setParts(List.of(systemPart));

        PartDTO userPart = new PartDTO();
        userPart.setText(userInputText);

        ContentDTO userContent = new ContentDTO();
        userContent.setRole("user");
        userContent.setParts(List.of(userPart));

        GeminiRequestDTO request = new GeminiRequestDTO();
        request.setSystemInstruction(systemInstruction);
        request.setContents(List.of(userContent));

        return request;
    }

    private HttpEntity<GeminiRequestDTO> buildHttpEntity(GeminiRequestDTO body) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(googleCloudToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        return new HttpEntity<>(body, headers);
    }

    private ResponseEntity<GeminiResponseDTO> callGeminiApi(
            HttpEntity<GeminiRequestDTO> entity
    ) {

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(
                geminiUrl,
                HttpMethod.POST,
                entity,
                GeminiResponseDTO.class
        );
    }

    private AIDoctorResponseDTO mapToAIDoctorResponse(
            ResponseEntity<GeminiResponseDTO> response
    ) {

        String answer =
                response.getBody()
                        .getCandidates()
                        .get(0)
                        .getContent()
                        .getParts()
                        .get(0)
                        .getText();

        String date = response.getHeaders().getFirst(HttpHeaders.DATE);

        AIDoctorResponseDTO dto = new AIDoctorResponseDTO();
        dto.setAnswer(answer);
        dto.setDate(date);

        return dto;
    }

}
