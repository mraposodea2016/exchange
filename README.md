# Securities Exchange Mock

Status: WIP

**V0**
- [X] Microservices dockerized and running
- [X] Simple app pages for each service

**V1**
- [ ] Trade order placement
  - [ ] Front page button 
  - [ ] Trade inputs (asset, amount, buy/sell)
  - [ ] Execution
    - [ ] Order added to pool
    - [ ] Portfolio update
- [ ] Detailed portfolio view

**V2**
- [ ] Fetch market quotes from external APIs
- [ ] Company trades buffered to minimize trading costs

**V3**
- [ ] Cross-service communication handled by event store and streaming platform, e.g. Kafka.

Built using Ruby and Go microservices and React Native front-end.
