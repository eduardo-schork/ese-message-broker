import axios from "axios";

const processIdArg = process.argv.find((arg) => arg.startsWith("--process="));
const deliveryProcessId = processIdArg ? parseInt(processIdArg.split("=")[1], 10) : 1;

const API_URL = "http://localhost:8080/publish-appointment";
const TOTAL_MESSAGES = 20;

function getRandomFutureDate() {
    const now = new Date();
    now.setDate(now.getDate() + Math.floor(Math.random() * 30));
    return now.toISOString();
}

function getRandomAddressId() {
    return Math.floor(Math.random() * 20) + 1;
}

function getStatusIdByIndex(index: number): number {
    if (index === 0) return 4;
    if (index === TOTAL_MESSAGES - 1) return 6;
    return 5;
}

function generateMockData(index: number) {
    return {
        scheduledTo: getRandomFutureDate(),
        deliveryProcessId: deliveryProcessId,
        addressId: getRandomAddressId(),
        statusId: getStatusIdByIndex(index),
    };
}

async function sendMessages() {
    console.log(
        `🔄 Enviando ${TOTAL_MESSAGES} mensagens para a fila (processId=${deliveryProcessId})...`
    );
    for (let i = 0; i < TOTAL_MESSAGES; i++) {
        const data = generateMockData(i);
        try {
            await axios.post(API_URL, data);
            console.log(`✅ Mensagem ${i + 1} enviada - StatusId: ${data.statusId}`);
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error: any) {
            console.error(`❌ Erro ao enviar mensagem ${i + 1}`, error.message);
        }
    }
}

sendMessages();
