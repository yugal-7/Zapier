import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const client = new PrismaClient();

// password logic

// hooks endpoint
app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    
    // push it on to a queue (kafka/redis)
    await client.$transaction(async tx => {
        // store in db a new trigger
   const run = await tx.zapRun.create({
        data: {
            zapId,
            metadata: body
        }
    })

    await tx.zapRunOutbox.create({
        data: {
            zapRunId: run.id
        }
    })

    })
    res.json({
        message: "Request fulfilled"
    })
})

app.listen(3000, () => {
    console.log('Server started ...');
})