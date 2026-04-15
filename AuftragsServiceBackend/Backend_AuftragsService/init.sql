CREATE TABLE pruefauftrag (
                              auftrag_id INT AUTO_INCREMENT PRIMARY KEY,
                              kunden_id INT,
                              dokumenten_typ VARCHAR(50),
                              inhalt TEXT
);

CREATE TABLE bericht (
                        bericht_id CHAR(36) PRIMARY KEY,
                        auftrag_id INT UNIQUE,
                        status VARCHAR(50),
                        erstellt_am DATETIME,

                        CONSTRAINT fk_bericht_auftrag
                            FOREIGN KEY (auftrag_id)
                                REFERENCES pruefauftrag(auftrag_id)
                                ON DELETE CASCADE
);