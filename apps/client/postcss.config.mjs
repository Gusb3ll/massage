const isEnable = process.env.NODE_ENV === 'obfuscate'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-obfuscator': {
      enable: isEnable,
      length: 4,
      extensions: [".tsx", ".ts"],
      srcPath: './src',
      formatJson: true,
      classIgnore: [
        'toast',
        'label',
        'drawer',
        'drawer-toggle',
        'drawer-content',
        'drawer-side',
        'drawer-overlay',
        'drawer-button',
        'checkbox',
        'btn-primary',
        'btn-secondary',
        'btn-ghost',
        'username',
        'email',
        'phone',
        'stats',
      ]
    }
  },
}

export default config