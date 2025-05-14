import amqplib from "amqplib";
import { config } from "../config/env";

export class RabbitMQClient {
    private static connection: amqplib.Connection;
    private static channel: amqplib.Channel;

    static async connect(retries = 5): Promise<void> {
        while (retries > 0) {
            try {
                // @ts-ignore
                this.connection = await amqplib.connect(config.rabbitUrl);
                // @ts-ignore
                this.channel = await this.connection.createChannel();
                await this.channel.assertQueue(config.queueName, { durable: true });
                console.log("RabbitMQ conectado com sucesso");
                return;
            } catch (err: any) {
                console.error("Erro ao conectar no RabbitMQ, tentando novamente...", err.message);
                retries--;
                await new Promise((res) => setTimeout(res, 5000)); // espera 5s
            }
        }
        throw new Error("Não foi possível conectar ao RabbitMQ após múltiplas tentativas");
    }

    static async publishToQueue(message: object) {
        if (!this.channel) throw new Error("RabbitMQ não conectado");
        this.channel.sendToQueue(config.queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
    }
}
