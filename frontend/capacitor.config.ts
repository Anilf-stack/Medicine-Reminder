import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Medicine Reminder',
  webDir: 'dist', // This must match the build output directory
  bundledWebRuntime: false,
};

export default config;
