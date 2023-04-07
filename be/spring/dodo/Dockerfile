FROM openjdk:11-jdk-slim

ARG JAR_FILE=./spring-jenkins/build/libs/*.jar

COPY ./build/libs/dodo-0.0.1-SNAPSHOT.jar ./app.jar
COPY ./resources ./resources

EXPOSE 8080

CMD cd resources & ls -al
ENTRYPOINT ["java", "-jar", "-Dspring.config.location=./resources/application.yml,./resources/application-product.yml", "-Dspring.activate.on-profile=product", "app.jar"]