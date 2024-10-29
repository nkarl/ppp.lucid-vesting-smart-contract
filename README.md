This is a rewrite of the vesting smart contract application which is Week03's use case demo in the [Plutus Pioneer Program](https://iog-academy.gitbook.io/plutus-pioneers-program-fourth-cohort/) (PPP).

This smart contract demonstrate how to connect the following components into a simple application:

1. a 3rd-party API that provides wallet integration ([Lucid](https://lucid.spacebudz.io/) via a chromimum-based extension).
2. a simple application UI based on JavaScript + Webpack + Bootstrap


### Aim

This rewrite's largest aim is for me to develop a mental model for a smart contract use case. This will be a good reference for future smart contracts and use cases.

This rewrite also aim to decouple many functions where possible. For example, actions for setting up wallet should exist dependently of the actions that setting up the app UI.

This rewrite also helps serve as a practical example for Bootstrap and Webpack.

Another rewrite is planned. This second rewrite aims to translate the application to TypeScript for better defined data types and interfaces.


### Run It

```sh
npm install && npm run start
```

MIT License
