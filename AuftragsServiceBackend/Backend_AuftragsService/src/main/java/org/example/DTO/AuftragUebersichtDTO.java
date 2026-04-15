package org.example.DTO;

import org.example.Enum.AuftragsStatus;

import java.time.LocalDateTime;

public record AuftragUebersichtDTO(Integer auftrag_id, AuftragsStatus dokumentenTyp, LocalDateTime erstelltAm, String inhalt) {
}
