import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  define: {
    "process.env": {
      VITE_KEY: JSON.stringify(process.env.VITE_KEY),
      VITE_URL: JSON.stringify(process.env.VITE_URL),
      VITE_IMAGE: JSON.stringify(process.env.VITE_IMAGE),
      VITE_IMAGE_LARGE: JSON.stringify(process.env.VITE_IMAGE_LARGE),
    },
    
  },
});

