package org.example.DTO;

public record AuftragErstellenResponse (
        java.util.UUID berichtId,
        String status,
        AuftragDTO auftrag){
}
