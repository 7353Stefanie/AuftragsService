package de.auftragsservice.dto;

import java.util.UUID;

public record AuftragErstellenResponseDTO(
        UUID berichtId,
        String status,
        AuftragDTO auftrag
) {}
