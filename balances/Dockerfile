# syntax=docker/dockerfile:1

FROM golang:1.16-buster AS build

WORKDIR /balances

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o /balances-server

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /balances-server /balances-server

ENTRYPOINT [ "/balances-server" ]