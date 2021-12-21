export const config = {
  PORT: Number(process.env.PORT) || 3000,
  SECRET_KEY: process.env.SECRET_KEY || 'YOUR_SECRET_KEY',
  JWT_EXPIRY_TIME: '2h',
  DATABASE: {
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost/expense-tracker",
    useUnifiedTopology: process.env.USE_UNIFIED_TOPOLOGY || true,
    useNewUrlParser: process.env.USE_NEW_URL_PARSER || true,
    logging: process.env.LOGGING || true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
}