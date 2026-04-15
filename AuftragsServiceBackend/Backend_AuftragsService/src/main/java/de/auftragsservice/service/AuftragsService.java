package de.auftragsservice.service;

import de.auftragsservice.dto.AuftragBerichtDTO;
import de.auftragsservice.dto.AuftragErstellenAnfrageDTO;
import de.auftragsservice.dto.AuftragErstellenResponseDTO;
import de.auftragsservice.dto.AuftragUebersichtDTO;
import de.auftragsservice.entity.Bericht;
import de.auftragsservice.entity.Pruefauftrag;
import de.auftragsservice.exception.AuftragNotFoundException;
import de.auftragsservice.mapper.AuftragMapper;
import de.auftragsservice.model.AuftragsStatus;
import de.auftragsservice.repository.AuftragsRepository;
import de.auftragsservice.repository.BerichtRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuftragsService {

    private final AuftragsRepository auftragsRepository;
    private final BerichtRepository berichtRepository;
    private final AuftragMapper mapper;

    public AuftragsService(AuftragsRepository auftragsRepository,
                           BerichtRepository berichtRepository,
                           AuftragMapper mapper) {
        this.auftragsRepository = auftragsRepository;
        this.berichtRepository  = berichtRepository;
        this.mapper             = mapper;
    }

    public AuftragErstellenResponseDTO auftragsEingang(AuftragErstellenAnfrageDTO anfrage) {
        Pruefauftrag auftrag = new Pruefauftrag();
        auftrag.setKundenId(anfrage.kundenId());
        auftrag.setDokumentenTyp(anfrage.dokumentenTyp());
        auftrag.setInhalt(anfrage.inhalt());

        Bericht bericht = new Bericht();
        bericht.setStatus(AuftragsStatus.ERHALTEN);
        bericht.setAuftrag(auftrag);
        auftrag.setBericht(bericht);

        Pruefauftrag gespeichert = auftragsRepository.save(auftrag);
        return mapper.toErstellenResponse(gespeichert.getBericht());
    }

    public AuftragBerichtDTO ausgabeAuftragsdetails(int id) {
        Pruefauftrag auftrag = auftragsRepository.findById(id)
                .orElseThrow(() -> new AuftragNotFoundException(id));
        return mapper.toBerichtDTO(auftrag);
    }

    public List<AuftragUebersichtDTO> uebersichtAllerAuftraege() {
        return mapper.toUebersichtList(berichtRepository.findAll());
    }
}
