package org.example.Repository;

import org.example.Entity.Pruefauftrag;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AuftragsRepository extends JpaRepository<Pruefauftrag, Integer> {
}
