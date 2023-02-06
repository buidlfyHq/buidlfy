import { DB_HOST, DB_PORT, DB_DATABASE, MONGO_ATLAS } from '@config';

export const dbConnection = {
  url: MONGO_ATLAS ? MONGO_ATLAS : `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
