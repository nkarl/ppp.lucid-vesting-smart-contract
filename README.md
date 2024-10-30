This is a rewrite of the vesting smart contract app in Week03 of the [Plutus Pioneer Program](https://iog-academy.gitbook.io/plutus-pioneers-program-fourth-cohort/) (PPP).

This app demonstrates how to connect the following components:

1. wallet integration between the [Lucid API](https://lucid.spacebudz.io/) with a chromimum-based Nami wallet extension.
2. a simple UI written in JavaScript + Webpack + Bootstrap


### Aim

This rewrite largely aims to help me develop a mental model for a smart contract use case

This rewrite also decouples many functions where possible. For example, actions for setting up wallet should exist independently of the actions for setting up the UI. The original code was tightly couple, all functions were chained together as a single contiguous unit, which is difficult to read and debug.

This also serves as an opportunity to learn a little more about Bootstrap and Webpack. I also updated packages to latest versions and corrected problems with dependencies and Webpack configuration.

### Run It

```sh
npm install && npm run start
```

MIT License
