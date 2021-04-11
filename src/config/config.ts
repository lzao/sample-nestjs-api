export const config = () => ({
    port: process.env.PORT,
    jwtSecret: process.env.JWT_TOKEN,
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [__dirname + '../../**/*.entity{.ts,.js}'],
        synchronize: false,
    },
});
