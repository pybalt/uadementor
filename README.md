# UADE Mentor

Plataforma educativa orientada a conectar alumnos universitarios con tutores o mentores académicos en la universidad.

## Objetivo del Sistema
El sistema permite gestionar:
* Alumnos y Tutores
* Reservas de sesiones de mentoría
* Calificaciones y reseñas
* Historial académico
* Gamificación mediante logros

## Running with H2 (local development)

The project includes an H2 configuration for local development at [src/main/resources/application-h2.properties](src/main/resources/application-h2.properties).

- Start the application using the `h2` Spring profile so the app uses the in-memory H2 database and enables the H2 console:

```powershell
.\gradlew.bat bootRun --args="--spring.profiles.active=h2"
```

```bash
./gradlew bootRun --args='--spring.profiles.active=h2'
```

- After the app starts open the H2 console in your browser: `http://localhost:8080/h2-console`.
	- JDBC URL (in-memory): `jdbc:h2:mem:uadeMentor`
	- User: `sa`
	- Password: (leave blank)

- If you want persistent local data instead of in-memory, edit the H2 file in `src/main/resources/application-h2.properties` and switch the URL to:

```
spring.datasource.url=jdbc:h2:file:./data/uadementor;AUTO_SERVER=TRUE
spring.jpa.hibernate.ddl-auto=update
```

Security note: the H2 console is enabled for development convenience. Do NOT enable the console or the in-memory profile in production.

## Development scripts

Helper scripts are provided to start backend and frontend in separate terminals.

Windows (PowerShell):

```powershell
.\scripts\run-dev.ps1
```

Unix / macOS:

```bash
./scripts/run-dev.sh
```

### Run with MySQL
If you want to run using MySQL instead of H2, activate the `mysql` profile:

```powershell
.\gradlew.bat bootRun -Dspring-boot.run.profiles=mysql
```

Or set the environment variable:

```powershell
$env:SPRING_PROFILES_ACTIVE='mysql'
.\gradlew.bat bootRun
```

The `application-mysql.properties` file contains the MySQL connection settings.

