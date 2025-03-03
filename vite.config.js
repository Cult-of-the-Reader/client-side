import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default {
  server: {
    port: process.env.PORT || 3000, // Usar el puerto definido por Render o el 3000 por defecto
    host: '0.0.0.0', // Asegura que escuche en todas las interfaces de red
  },
};
