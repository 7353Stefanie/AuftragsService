package de.auftragsservice.dto;

import de.auftragsservice.model.AuftragsStatus;

public record AuftragDTO(
        Integer id,
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt
) {}
