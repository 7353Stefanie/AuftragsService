package org.example.DTO;

import org.example.Entity.Bericht;
import org.example.Enum.AuftragsStatus;

public record AuftragDTO(Integer id,
                         Integer kundenId,
                         AuftragsStatus dokumentenTyp,
                         String inhalt) {
}
