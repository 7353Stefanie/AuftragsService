package de.auftragsservice.mapper;

import de.auftragsservice.dto.*;
import de.auftragsservice.entity.Bericht;
import de.auftragsservice.entity.Pruefauftrag;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuftragMapper {

    public AuftragErstellenResponseDTO toErstellenResponse(Bericht bericht) {
        Pruefauftrag auftrag = bericht.getAuftrag();
        return new AuftragErstellenResponseDTO(
                bericht.getBerichtId(),
                bericht.getStatus().toString(),
                new AuftragDTO(
                        auftrag.getAuftragId(),
                        auftrag.getKundenId(),
                        auftrag.getDokumentenTyp(),
                        auftrag.getInhalt()
                )
        );
    }

    public AuftragBerichtDTO toBerichtDTO(Pruefauftrag auftrag) {
        Bericht bericht = auftrag.getBericht();
        return new AuftragBerichtDTO(
                auftrag.getAuftragId(),
                auftrag.getKundenId(),
                auftrag.getDokumentenTyp(),
                auftrag.getInhalt(),
                bericht.getBerichtId(),
                bericht.getStatus().toString(),
                bericht.getErstelltAm()
        );
    }

    public List<AuftragUebersichtDTO> toUebersichtList(List<Bericht> berichte) {
        return berichte.stream()
                .map(b -> new AuftragUebersichtDTO(
                        b.getAuftrag().getAuftragId(),
                        b.getAuftrag().getDokumentenTyp(),
                        b.getErstelltAm(),
                        b.getAuftrag().getInhalt()
                ))
                .toList();
    }
}
