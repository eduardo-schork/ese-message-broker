import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3000/publish";
const TOTAL_MESSAGES = 50;

function getRandomFutureDate() {
    const now = new Date();
    now.setDate(now.getDate() + Math.floor(Math.random() * 30)); // até 30 dias no futuro
    return now.toISOString();
}

function generateMockData() {
    return {
        scheduledTo: getRandomFutureDate(),
        deliveryProcessId: uuidv4(),
        addressId: uuidv4(),
    };
}

async function sendMessages() {
    console.log(`🔄 Enviando ${TOTAL_MESSAGES} mensagens para a fila...`);
    for (let i = 0; i < TOTAL_MESSAGES; i++) {
        const data = generateMockData();
        try {
            await axios.post(API_URL, data);
            console.log(`✅ Mensagem ${i + 1} enviada`);
        } catch (error: any) {
            console.error(`❌ Erro ao enviar mensagem ${i + 1}`, error.message);
        }
    }
}

sendMessages();
