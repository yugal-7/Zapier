import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
    while(1){
        const pendingRows = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        })
        pendingRows.forEach(r => {
            
        })
    }
}

main();