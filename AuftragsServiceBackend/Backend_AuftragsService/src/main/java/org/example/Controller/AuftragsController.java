package org.example.Controller;


import org.example.DTO.AuftragErstellenAnfrage;
import org.example.DTO.AuftragErstellenResponse;
import org.example.DTO.AuftragUebersichtDTO;
import org.example.DTO.Auftrag_Bericht_DTO;
import org.example.Service.AuftragsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/auftraege")
public class AuftragsController {


    private final AuftragsService auftragsService;


    public AuftragsController(AuftragsService auftragsService) {
        this.auftragsService = auftragsService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AuftragErstellenResponse createAuftrag(@Valid @RequestBody AuftragErstellenAnfrage auftragErstellenAnfrage){
        return auftragsService.auftragsEingang(auftragErstellenAnfrage);
    }

    @GetMapping("/{id}")
    public Auftrag_Bericht_DTO ausgabeAuftragsdetails(@PathVariable Integer id)
    {
        return  auftragsService.ausgabeAuftragsdetails(id);
    }

    @GetMapping("/uebersicht")
    public List<AuftragUebersichtDTO> ausgabeAllerAuftraege()
    {
        return auftragsService.uebersichtAllerAuftraege();
    }

}
