import { DeliveryAppointmentEntity } from "../domain/entities/delivery-appointment";
import { IDeliveryQueueRepository } from "../domain/repositories/delivery-appointment-repository.type";

export class PublishDeliveryAppointment {
    constructor(private repository: IDeliveryQueueRepository) {}

    async execute(input: Omit<DeliveryAppointmentEntity, "createdAt" | "updatedAt">) {
        const now = new Date();
        const entity: DeliveryAppointmentEntity = {
            ...input,
            createdAt: now,
            updatedAt: now,
        };

        await this.repository.publish(entity);
    }
}
