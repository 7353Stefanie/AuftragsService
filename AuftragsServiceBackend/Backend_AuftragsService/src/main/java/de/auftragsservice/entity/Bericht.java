package de.auftragsservice.entity;

import de.auftragsservice.model.AuftragsStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Bericht {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID berichtId;

    @OneToOne
    @JoinColumn(name = "auftrag_id")
    private Pruefauftrag auftrag;

    @Enumerated(EnumType.STRING)
    private AuftragsStatus status;

    private LocalDateTime erstelltAm;

    @PrePersist
    public void setErstelltAmOnCreate() {
        erstelltAm = LocalDateTime.now();
    }

    public UUID getBerichtId() {
        return berichtId;
    }

    public Pruefauftrag getAuftrag() {
        return auftrag;
    }

    public void setAuftrag(Pruefauftrag auftrag) {
        this.auftrag = auftrag;
    }

    public AuftragsStatus getStatus() {
        return status;
    }

    public void setStatus(AuftragsStatus status) {
        this.status = status;
    }

    public LocalDateTime getErstelltAm() {
        return erstelltAm;
    }
}
