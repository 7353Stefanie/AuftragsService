-- Foreign Keys deaktivieren
SET FOREIGN_KEY_CHECKS = 0;

-- Tabellen leeren
TRUNCATE TABLE review;
TRUNCATE TABLE pruefauftrag;

-- (Optional) Falls du sicher gehen willst:
-- ALTER TABLE pruefauftrag AUTO_INCREMENT = 1;

-- Foreign Keys wieder aktivieren
SET FOREIGN_KEY_CHECKS = 1;