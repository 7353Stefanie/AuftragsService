package org.example.DTO;
import org.example.Enum.AuftragsStatus;

import java.util.UUID;

import java.time.LocalDateTime;

public record Auftrag_Bericht_DTO(


        Integer auftragId,
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt,
        UUID berichtId,
        String status,
        LocalDateTime erstelltAm

) {
}
