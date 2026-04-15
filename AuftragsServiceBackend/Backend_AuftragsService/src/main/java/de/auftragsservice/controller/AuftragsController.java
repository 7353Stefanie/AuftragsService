package de.auftragsservice.controller;

import de.auftragsservice.dto.AuftragBerichtDTO;
import de.auftragsservice.dto.AuftragErstellenAnfrage;
import de.auftragsservice.dto.AuftragErstellenResponse;
import de.auftragsservice.dto.AuftragUebersichtDTO;
import de.auftragsservice.service.AuftragsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auftraege")
public class AuftragsController {

    private final AuftragsService auftragsService;

    public AuftragsController(AuftragsService auftragsService) {
        this.auftragsService = auftragsService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AuftragErstellenResponse erstelleAuftrag(@Valid @RequestBody AuftragErstellenAnfrage anfrage) {
        return auftragsService.auftragsEingang(anfrage);
    }

    @GetMapping("/{id}")
    public AuftragBerichtDTO getAuftragsdetails(@PathVariable int id) {
        return auftragsService.ausgabeAuftragsdetails(id);
    }

    @GetMapping("/uebersicht")
    public List<AuftragUebersichtDTO> getAlleAuftraege() {
        return auftragsService.uebersichtAllerAuftraege();
    }
}
