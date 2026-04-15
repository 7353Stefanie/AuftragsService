package org.example.Repository;

import org.example.Entity.Bericht;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface ReviewRepository extends JpaRepository<Bericht, UUID> {
}
