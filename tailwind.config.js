module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '128': '32rem', // Add a larger size (512px)
        '144': '36rem', // Add an even larger size (576px)
      },
      colors: {
        gmailLightBlack: '#2e2f32',
        gmailSilverText: '#e9eaf0',
        gmailGreyText: '#76777d',
        silver: '#f7f7f7',
        mediumSilver: '#c7c7c7',
        darkSilver: '#7d7b7c',
        lightBlack: '#1c1c1c',
        snakeGr1: '#16303b',
        snakeGr2: '#2C5364',
      },
    },
  },
  plugins: [],
}
