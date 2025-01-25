module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true, // Center all content
      padding: '1rem', // Add padding for small screens
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px', // Max width for large screens
        xl: '1024px', // Restrict xl to 1024px
        '2xl': '1024px', // Restrict 2xl to 1024px
      },
    },
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
