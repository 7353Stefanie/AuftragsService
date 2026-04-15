package org.example.Entity;

import jakarta.persistence.*;
import org.example.Enum.AuftragsStatus;

@Entity
public class Pruefauftrag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer auftrag_id;

    private Integer kundenId; // fk

    @Enumerated(EnumType.STRING)
    private AuftragsStatus dokumentenTyp;

    private String inhalt;

    @OneToOne(mappedBy = "auftrag", cascade = CascadeType.ALL)
    private Bericht bericht;

    public void setAuftrag_id(Integer id) {
        this.auftrag_id = id;
    }

    public Bericht getBericht() {
        return bericht;
    }

    public void setBericht(Bericht bericht) {
        this.bericht = bericht;
    }

    public Integer getKundenId() {
        return kundenId;
    }

    public void setKundenId(Integer customerId) {
        this.kundenId = customerId;
    }

    public String getInhalt() {
        return inhalt;
    }

    public void setInhalt(String content) {
        this.inhalt = content;
    }

    public AuftragsStatus getDokumentenTyp() {
        return dokumentenTyp;
    }

    public void setDokumentenTyp(AuftragsStatus documentType) {
        this.dokumentenTyp = documentType;
    }


    public Integer getAuftrag_id() {
        return auftrag_id;
    }


}
