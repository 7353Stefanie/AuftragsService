package de.auftragsservice.dto;

import de.auftragsservice.model.AuftragsStatus;

public record AuftragErstellenAnfrageDTO(
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt
) {}
