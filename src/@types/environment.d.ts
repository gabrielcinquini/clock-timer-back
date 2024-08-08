declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    API_BASE_URL: string;
    PORT: number;
    JWT_SECRET: string;
  }
}