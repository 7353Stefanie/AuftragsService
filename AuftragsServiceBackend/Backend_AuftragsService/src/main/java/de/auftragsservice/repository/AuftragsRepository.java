package de.auftragsservice.repository;

import de.auftragsservice.entity.Pruefauftrag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuftragsRepository extends JpaRepository<Pruefauftrag, Integer> {
}
