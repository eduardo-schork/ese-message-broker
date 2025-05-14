import { DeliveryAppointmentEntity } from "../../domain/entities/delivery-appointment";
import { IDeliveryQueueRepository } from "../../domain/repositories/delivery-appointment-repository.type";
import { RabbitMQClient } from "./rabbitmq-client";

export class DeliveryQueueRepository implements IDeliveryQueueRepository {
    async publish(entity: DeliveryAppointmentEntity): Promise<void> {
        await RabbitMQClient.publishToQueue(entity);
    }
}
