package de.auftragsservice.dto;

import java.util.UUID;

public record AuftragErstellenResponse(
        UUID berichtId,
        String status,
        AuftragDTO auftrag
) {}
