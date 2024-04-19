import config from 'dotenv';
config.config();

export default {
    port: process.env.PORT || 3000
}