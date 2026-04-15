package org.example.DTO;

import org.example.Entity.Bericht;
import org.example.Enum.AuftragsStatus;

public record AuftragErstellenAnfrage(
        Integer kundenId,
        AuftragsStatus dokumentenTyp,
        String inhalt)
{
}
