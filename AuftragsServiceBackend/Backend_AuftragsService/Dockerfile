FROM mysql:8.0
LABEL authors="Test"
# Offizielles MySQL Image verwenden

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=meinedb
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=userpassword

# Optional: eigenes SQL-Init-Skript kopieren
# (wird beim ersten Start automatisch ausgeführt)
COPY init.sql /docker-entrypoint-initdb.d/

# Port freigeben
EXPOSE 3306
