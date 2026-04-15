package org.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class Teste_Controller {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    public ObjectMapper objectMapper;

    private static Integer auftragId;

    @Test
    @Order(1)
    void createAuftrag_shouldCreateRealAuftrag() throws Exception {
        String requestJson = """
               {
                  "kundenId": "39",
                  "dokumentenTyp": "ERHALTEN",
                   "inhalt": "Testbeschreibung"
                }
                """;

        mockMvc.perform(post("/api/auftraege")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.auftrag.id", notNullValue()))
                .andExpect(jsonPath("$.status").exists());
    }


    @Test
    @Order(2)
    void getAuftrag_shouldReturnRealData() throws Exception {

        auftragId = 7;
        mockMvc.perform(get("/api/auftraege/{id}", auftragId))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));

        mockMvc.perform(get("/api/auftraege/{id}", auftragId))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
