export enum Context {
    Client,
    Server
}


export function parseContext(context: string|undefined): Context {
    if (context === undefined)
        throw new Error('Context is not defined');

    switch(context.toUpperCase()) {
    case "CLIENT":
        return Context.Client;
    case "SERVER":
        return Context.Server;
    default:
        throw new Error(`Invalid context ${context}`);
    }
}


export function isServer(context: Context): boolean {
    return context == Context.Server;
}
