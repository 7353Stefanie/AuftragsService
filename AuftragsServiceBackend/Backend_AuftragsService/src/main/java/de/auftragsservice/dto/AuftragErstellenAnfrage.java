package de.auftragsservice.dto;

import de.auftragsservice.model.AuftragsStatus;

public record AuftragErstellenAnfrage(
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt
) {}
