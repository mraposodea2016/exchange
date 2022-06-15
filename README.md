# Securities Exchange Mock

Status: WIP

**V0**
- [X] Microservices dockerized and running
- [X] Simple app pages for each service

**V1**
- [ ] Trade order placement
  - [X] Front page button 
  - [X] Trade inputs (asset, amount, buy/sell)
  - [X] Get user balances
  - [X] Get quotes
- [X] Move state logic to Redux
  - [X] Store 
  - [X] Balances
  - [X] Quotes
  - [X] Trade
- [X] Pair selection page
- [ ] Detailed portfolio view
- [ ] Execution
    - [ ] If funds available:
        - [X] Order added to pool
        - [ ] Portfolio update
    - [X] Else:
        - [X] Error message
- [ ] Table component UI improvement

**V2**
- [ ] Set up databases
- [ ] Fetch market quotes from external APIs
- [ ] Company trades buffered to minimize trading costs
- [ ] UI Improvements

**V3**
- [ ] Cross-service communication handled by event store and streaming platform, e.g. Kafka.

Built using Ruby and Go microservices and React Native front-end.
