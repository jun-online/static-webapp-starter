import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { parseClientPrincipal } from "../utils/auth";

export async function welcome(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const principal = parseClientPrincipal(request, context);

    if (!principal.isAuthenticated) {
        return {
            status: 401,
            jsonBody: {
                message: "Authentifizierung erforderlich."
            }
        };
    }

    return {
        jsonBody: {
            message: `Willkommen, ${principal.name ?? "there"}!!`
        }
    };
};

app.http("welcome", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: welcome
});
