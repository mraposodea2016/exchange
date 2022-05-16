# syntax=docker/dockerfile:1

##
## Build
##
FROM golang:1.16-buster AS build

WORKDIR /exchange/balances

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /balances

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /exchange

COPY --from=build /balances /balances

EXPOSE 8080

USER nonroot=:nonroot

ENTRYPOINT [ "/balances" ]