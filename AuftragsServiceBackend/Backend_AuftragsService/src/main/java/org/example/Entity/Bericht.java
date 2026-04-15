package org.example.Entity;

import jakarta.persistence.*;
import org.example.Enum.AuftragsStatus;

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

    public LocalDateTime getErstelltAm() {
        return erstelltAm;
    }

    @PrePersist // sorgt dafür dass es erst erstellt wird und dann in die DB gesetzt wird
    public void createdAt_prePersist() {
        erstelltAm = LocalDateTime.now();
    }

    public void setErstelltAm(LocalDateTime erstelltAm) {
        this.erstelltAm = erstelltAm;
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



    public UUID getBerichtId() {
        return berichtId;
    }


    public void setBerichtId(UUID uuid) {
        this.berichtId = uuid;
    }
}
