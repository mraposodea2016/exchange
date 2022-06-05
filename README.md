# Securities Exchange Mock

Status: WIP

**V0**
- [X] Microservices dockerized and running
- [X] Simple app pages for each service

**V1**
- [ ] Trade order placement
  - [X] Front page button 
  - [X] Trade inputs (asset, amount, buy/sell)
  - [ ] Get user balances
  - [ ] Execution
    - [ ] If funds available:
      - [ ] Order added to pool
      - [ ] Portfolio update
    - [ ] Else:
      - [ ] Error message
- [ ] Detailed portfolio view
- [ ] Use Expo for emulation

**V2**
- [ ] Fetch market quotes from external APIs
- [ ] Company trades buffered to minimize trading costs

**V3**
- [ ] Cross-service communication handled by event store and streaming platform, e.g. Kafka.

Built using Ruby and Go microservices and React Native front-end.
