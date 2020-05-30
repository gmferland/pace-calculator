# Pace Calculator

## Development

After cloning this repository, run `npm install` to load package dependencies.

### Web App

1. Run `npm run dev` to build and serve the application on http://localhost:8080/.

### Extension

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Using the switch in the top right corner, turn on Development Mode.
3.  Click `Load Unpacked` from the menu in the center of the header, below the search bar.
4.  Select the directory containing this repository. Chrome should upload the extension, and you should see the icon in the browser nav bar as well as a tile on the extensions page.
5.  As you make changes to the code, click the refresh icon on the extension tile to reload the latest version.
6.  PRs and comments welcome!


## CLI Commands
*   `npm install`: Installs dependencies

*   `npm run dev`: Run a development, HMR server

*   `npm run serve`: Run a production-like server

*   `npm run build`: Production-ready build

*   `npm run lint`: Pass TypeScript files using TSLint

*   `npm run test`: Run Jest and [`preact-render-spy`](https://github.com/mzgoddard/preact-render-spy) for your tests


Project bootstrapped with [Preact CLI](https://github.com/developit/preact-cli/blob/master/README.md).
