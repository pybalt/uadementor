# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy wrapper and configuration files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Ensure line endings and permissions are correct
RUN sed -i 's/\r$//' gradlew
RUN chmod +x gradlew

# Download dependencies first (cacheable)
RUN ./gradlew dependencies --no-daemon || true

# Copy source and build JAR
COPY src src
RUN ./gradlew bootJar -x test --no-daemon

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
