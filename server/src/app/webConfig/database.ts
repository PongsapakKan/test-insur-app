import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI: string = process.env.MONGO_URI || config.get("MongoURI");
        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoCreate: true
        };
        await connect(mongoURI, options);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;