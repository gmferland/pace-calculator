import { resolve } from 'path';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default {
  /**
   * Function that mutates the original webpack config.
   * Supports asynchronous changes when a promise is returned (or it's an async function).
   *
   * @param {object} config - original webpack config.
   * @param {object} env - options passed to the CLI.
   * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
   * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
   **/
  webpack(config, env, helpers, options) {
    // Add typings-for-css-modules-loader, which is a wrapper
    // that automatically generates .d.ts files for loaded CSS
    config.module.rules[4].use.splice(1, 0, {
      loader: '@teamsupercell/typings-for-css-modules-loader',
      options: {
        banner:
          '// This file is automatically generated from your CSS. Any edits will be overwritten.',
        formatter: 'prettier',
        disableLocalsExport: true,
      },
    });

    // Inlcude runtime path aliases from tsconfig file
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    // Enable css modules in the folloing folders
    config.module.rules[4].include = [
      resolve(__dirname, 'src', 'app', 'routes'),
      resolve(__dirname, 'src', 'app', 'components')
    ];
    
    config.module.rules[5].exclude = [
      resolve(__dirname, 'src', 'app', 'routes'),
      resolve(__dirname, 'src', 'app', 'components')
    ];

    const typeCheckerConfig = helpers.getPluginsByName(config, 'ForkTsCheckerWebpackPlugin');
    typeCheckerConfig[0].plugin.async = false;

    config.resolve.plugins.push(
      new TsConfigPathsPlugin({
        configFile: 'tsconfig.json',
        extensions: ['.ts', '.tsx', '.js'],
      })
    );

    // Use any `index` file, not just index.js
    config.resolve.alias['preact-cli-entrypoint'] = resolve(
      process.cwd(),
      'src',
      'app',
      'index'
    );
  },
};
