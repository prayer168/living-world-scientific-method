import { defineConfig } from 'vite'
import { resolve } from 'path'

// GitHub Pages 子路徑;本機 dev 用 '/'
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/living-world-scientific-method/' : '/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        inquiry: resolve(__dirname, 'inquiry.html'),
        microscope: resolve(__dirname, 'microscope.html'),
        experiment: resolve(__dirname, 'experiment.html'),
        apply: resolve(__dirname, 'apply.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        resources: resolve(__dirname, 'resources.html'),
        fbpost: resolve(__dirname, 'share/facebook-post.html')
      }
    }
  }
})
