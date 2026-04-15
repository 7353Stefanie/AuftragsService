package de.auftragsservice.dto;

import de.auftragsservice.model.AuftragsStatus;

import java.time.LocalDateTime;

public record AuftragUebersichtDTO(
        Integer auftragId,
        AuftragsStatus dokumentenTyp,
        LocalDateTime erstelltAm,
        String inhalt
) {}
