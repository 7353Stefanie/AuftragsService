package de.auftragsservice.dto;

import de.auftragsservice.model.AuftragsStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record AuftragBerichtDTO(
        Integer auftragId,
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt,
        UUID berichtId,
        String status,
        LocalDateTime erstelltAm
) {}
