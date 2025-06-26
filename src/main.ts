import express from "express";
import { PublishDeliveryAppointment } from "./application/publish-delivery-appointment.usecase";
import { DeliveryQueueRepository } from "./infra/message-broker/delivery-queue.repo";
import { RabbitMQClient } from "./infra/message-broker/rabbitmq-client";
import { PublishController } from "./interfaces/publish-controller";

async function bootstrap() {
    await RabbitMQClient.connect();

    const app = express();
    app.use(express.json());

    const deliveryQueueRepository = new DeliveryQueueRepository();

    const publishDeliveryAppointmentUsecase = new PublishDeliveryAppointment(
        deliveryQueueRepository
    );

    const publishController = new PublishController(publishDeliveryAppointmentUsecase);

    app.post("/publish", (req, res) => publishController.handle(req, res));

    app.listen(3000, () => console.log("Queue service listening on port 3000"));
}

bootstrap();
