import { DeliveryAppointmentEntity } from "../entities/delivery-appointment";

export interface IDeliveryQueueRepository {
    publish(entity: DeliveryAppointmentEntity): Promise<void>;
}
