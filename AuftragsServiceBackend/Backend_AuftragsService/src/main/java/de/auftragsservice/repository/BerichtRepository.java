package de.auftragsservice.repository;

import de.auftragsservice.entity.Bericht;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BerichtRepository extends JpaRepository<Bericht, UUID> {
}
