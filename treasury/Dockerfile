# syntax=docker/dockerfile:1

FROM golang:1.16-buster AS build

WORKDIR /treasury

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /treasury-server

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /treasury-server /treasury-server

ENTRYPOINT [ "/treasury-server" ]