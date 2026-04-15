package org.example.Service;

import org.example.DTO.AuftragErstellenAnfrage;
import org.example.DTO.AuftragErstellenResponse;
import org.example.DTO.AuftragUebersichtDTO;
import org.example.DTO.Auftrag_Bericht_DTO;
import org.example.Entity.Pruefauftrag;
import org.example.Entity.Bericht;
import org.example.Mapping.MappingAuftragErstellen;
import org.example.Repository.AuftragsRepository;
import org.example.Repository.ReviewRepository;
import org.example.Enum.AuftragsStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class AuftragsService {

     private final AuftragsRepository auftragsRepository;
     private final ReviewRepository reviewRepository;
     private final MappingAuftragErstellen mapping;

    public AuftragsService(AuftragsRepository auftragsRepository, ReviewRepository reviewRepository, MappingAuftragErstellen mapping) {
        this.auftragsRepository = auftragsRepository;
        this.reviewRepository = reviewRepository;
        this.mapping = mapping;
    }


    public AuftragErstellenResponse auftragsEingang(AuftragErstellenAnfrage DTOauftrag )
     {
         Pruefauftrag a = new Pruefauftrag();

                 a.setKundenId(DTOauftrag.kundenId());
                 a.setDokumentenTyp(DTOauftrag.dokumentenTyp());
                 a.setInhalt(DTOauftrag.inhalt());

                 Bericht bericht = new Bericht();

                 bericht.setStatus(AuftragsStatus.ERHALTEN);
                 bericht.setErstelltAm(LocalDateTime.now());

                    a.setBericht(bericht);
                    bericht.setAuftrag(a);

                 Pruefauftrag savedAuftrag = auftragsRepository.save(a);


                 return mapping.toResponse(bericht);

     }

     public Auftrag_Bericht_DTO ausgabeAuftragsdetails(int id)
     {
         Pruefauftrag auftrag = auftragsRepository.findById(id)
                 .orElseThrow(()->new RuntimeException("Auftrag nicht gefunden werden"));

         Bericht review = reviewRepository.findById(auftrag.getBericht().getBerichtId())
                 .orElseThrow(()->new RuntimeException("Review konnte nicht gefunden werden"));

        return mapping.toDetailsResponse(auftrag, review);
     }

    public List<AuftragUebersichtDTO> uebersichtAllerAuftraege() {
        List<Bericht> berichte = reviewRepository.findAll();
        return mapping.mappingAuftragsUebersicht(berichte);
    }
}
