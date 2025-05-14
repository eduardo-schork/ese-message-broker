import dotenv from "dotenv";
dotenv.config();

export const config = {
    rabbitUrl: process.env.RABBITMQ_URL || "amqp://localhost",
    queueName: process.env.QUEUE_NAME || "delivery_appointments",
};
