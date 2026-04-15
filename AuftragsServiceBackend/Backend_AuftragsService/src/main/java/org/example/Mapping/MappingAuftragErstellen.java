package org.example.Mapping;

import org.example.DTO.*;
import org.example.Entity.Pruefauftrag;
import org.example.Entity.Bericht;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MappingAuftragErstellen {


    public AuftragErstellenAnfrage toEntity(Pruefauftrag auftrag) {
        return new AuftragErstellenAnfrage(auftrag.getKundenId(), auftrag.getDokumentenTyp(), auftrag.getInhalt());
    }

    public AuftragErstellenResponse toResponse(Bericht review) {
        Pruefauftrag auftrag = review.getAuftrag(); // holt vorhandenen Prüfauftrag

        return new AuftragErstellenResponse(review.getBerichtId(),review.getStatus().toString(), new AuftragDTO(
                auftrag.getAuftrag_id(),
                auftrag.getKundenId(),
                auftrag.getDokumentenTyp(),
                auftrag.getInhalt()

        ));
    }

    public List<AuftragUebersichtDTO> mappingAuftragsUebersicht(List<Bericht> berichte)
    {

        return  berichte.stream()
                        .map(b -> new AuftragUebersichtDTO(
                                b.getAuftrag().getAuftrag_id(),
                                b.getAuftrag().getDokumentenTyp(),
                                b.getErstelltAm(),
                                b.getAuftrag().getInhalt()

                        ))
                        .toList();

    }



    public Auftrag_Bericht_DTO toDetailsResponse(Pruefauftrag auftrag, Bericht review) {
        return new Auftrag_Bericht_DTO(   auftrag.getAuftrag_id(),
                auftrag.getKundenId(),
                auftrag.getDokumentenTyp(),
                auftrag.getInhalt(),
                review.getBerichtId(),
                review.getStatus().toString(),
                review.getErstelltAm());
    }




}
