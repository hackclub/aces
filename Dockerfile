FROM ubuntu:latest
LABEL authors="freaky"

ENTRYPOINT ["top", "-b"]