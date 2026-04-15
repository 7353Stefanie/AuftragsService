package de.auftragsservice.entity;

import de.auftragsservice.model.AuftragsStatus;
import jakarta.persistence.*;

@Entity
public class Pruefauftrag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer auftragId;

    private Integer kundenId;

    @Enumerated(EnumType.STRING)
    private AuftragsStatus dokumentenTyp;

    private String inhalt;

    @OneToOne(mappedBy = "auftrag", cascade = CascadeType.ALL)
    private Bericht bericht;

    public Integer getAuftragId() {
        return auftragId;
    }

    public Integer getKundenId() {
        return kundenId;
    }

    public void setKundenId(Integer kundenId) {
        this.kundenId = kundenId;
    }

    public AuftragsStatus getDokumentenTyp() {
        return dokumentenTyp;
    }

    public void setDokumentenTyp(AuftragsStatus dokumentenTyp) {
        this.dokumentenTyp = dokumentenTyp;
    }

    public String getInhalt() {
        return inhalt;
    }

    public void setInhalt(String inhalt) {
        this.inhalt = inhalt;
    }

    public Bericht getBericht() {
        return bericht;
    }

    public void setBericht(Bericht bericht) {
        this.bericht = bericht;
    }
}
