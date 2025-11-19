# Use the multi-arch Eclipse Temurin JDK 17
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy the compiled JAR from Maven target
COPY target/*.jar app.jar

# Addedd 5005 port for debug
EXPOSE 8080 5005

# Enable remote debugging
ENV JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

ENTRYPOINT ["java", "-jar", "app.jar"]
