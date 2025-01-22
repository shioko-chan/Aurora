import { text } from 'stream/consumers'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurora: {
          DEFAULT: '#77FFCC', // 主色
          background: '#1B263B', // 背景色
          highlight: '#F3FF88', // 高亮色
          text: '#E0FBFC', // 文本色
          textdark: '#050102', // 深色文本
          supplement: '#9F7EFF', // 辅助色
        },
        desert: {
          DEFAULT: '#D4A373', // 主色：沙漠金色，突出沙漠的主调
          background: '#F8E8D4', // 背景：柔和的浅米色，提供温暖的背景
          highlight: '#FFB400', // 高亮色：明亮的橙黄色，模仿阳光
          text: '#4E342E', // 文本色：深棕色，适合阅读
          textlight: '#8D6E63', // 浅文本色：浅棕色，用于次要文字
          supplement: '#A1887F', // 辅助色：柔和的灰褐色，适合边框、分割线等
        },
      },
    },
  },
  plugins: [],
}
