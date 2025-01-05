/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const graphqlProxy = onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
        // Send response to OPTIONS requests
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
        return;
    }

    // Ensure this function only responds to POST requests
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return;
    }

    const { endpoint, query, variables } = req.body;

    // Validate the incoming request body
    if (!endpoint || !query) {
        res.status(400).send({ error: "Missing 'endpoint' or 'query' in request body" });
        return;
    }

    try {
        const authHeader = req.headers.authorization || "";

        // Forward the GraphQL query to the specified endpoint
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },
            body: JSON.stringify({ query, variables }),
        });

        // Parse the response from the GraphQL server
        const data = await response.json();

        // Forward the response back to the client
        res.status(response.status).send(data);
    } catch (error) {
        console.error("Error proxying GraphQL query:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});