/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/**/*.js'],
  safelist: ['reveal', 'is-visible'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#fff5ec',100:'#ffe6d1',200:'#ffc89f',300:'#ffa563',400:'#ff8533',500:'#fb6a11',600:'#ec5205',700:'#c43c08',800:'#9b300f',900:'#7d2a10',950:'#441106' },
        accent:{ 50:'#ecfdfa',100:'#cef9f1',200:'#a1f0e6',300:'#64e0d6',400:'#2ec7c2',500:'#15a8a7',600:'#0d8688',700:'#106b6d',800:'#125557',900:'#134749',950:'#042b2d' },
        ink:   { 50:'#f7f7f5',100:'#ecebe7',200:'#d8d6cf',300:'#b4b0a6',400:'#8a857a',500:'#67625a',600:'#4f4a43',700:'#3c3833',800:'#272420',900:'#1a1815',950:'#0f0e0c' },
        success:{ 50:'#ecfbf1',300:'#62d394',400:'#33b972',500:'#1c9c5b',600:'#127d49' },
        warning:{ 50:'#fffaeb',400:'#ffab20',500:'#f98a07',600:'#dc6502' },
        danger: { 50:'#fef2f2',400:'#f07272',500:'#e54545',600:'#d22828' },
        info:   { 50:'#eef6ff',400:'#59a6ff',500:'#3384fb',600:'#1c66f0' },
      },
      fontFamily: {
        sans: ['"Noto Sans Georgian"','system-ui','sans-serif'],
        display: ['"Noto Sans Georgian"','system-ui','sans-serif'],
        mono: ['"JetBrains Mono"','ui-monospace','monospace'],
      },
      borderRadius: { field:'10px', btn:'12px', card:'18px', pill:'9999px' },
      boxShadow: {
        card:'0 1px 0 0 rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.6)',
        float:'0 24px 60px -20px rgba(0,0,0,0.7)',
        pop:'0 10px 30px -12px rgba(0,0,0,0.65)',
      },
      fontWeight: { 500:'500',600:'600',700:'700',800:'800',900:'900' },
    },
  },
  plugins: [],
}
