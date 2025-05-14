import { Request, Response } from "express";
import { PublishDeliveryAppointment } from "../application/publish-delivery-appointment.usecase";

export class PublishController {
    constructor(private useCase: PublishDeliveryAppointment) {}

    async handle(req: Request, res: Response) {
        try {
            await this.useCase.execute(req.body);
            res.status(202).json({ message: "Message published to queue." });
        } catch (error) {
            console.error("Publish Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
