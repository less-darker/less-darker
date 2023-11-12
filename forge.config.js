module.exports = {
  packagerConfig: {
    asar: true,
    icon: './app/favicon.ico'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './less-darker.pfx',
        loadingGif: './app/assets/images/installer-logo-gif.gif',
        setupIcon: './app/favicon.ico',
        iconUrl: 'https://github.com/less-darker/less-darker/blob/ee2a274742785079a6300e0d61e9fe1cf47b7651/app/assets/images/logo.png',
        name: 'LessDarker'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
