### Running the app

Development:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Production:

```bash
yarn start
```

## The idea behind the example

This is an amalgamation of the 2 existing examples:

* [with-typescript](https://github.com/zeit/next.js/tree/canary/examples/with-typescript)
* [with-styled-components](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)

## Improvements to emplemented
1. component ModuleVideoPlayer should possess React Smart Player for now we have Iframe from screencast for block chain course
2. Screencast.com urls should be fetched from database course::4::module::n::chapter::n for now we have hardcoded in ModuleVideoPlayer.ts
3. Landing pages /signin /home etc should have cookies based authentication for now we had checked authorisation token in componentDidMount() method.
4. Privacy of screencast videos is public it should be changed to protected.