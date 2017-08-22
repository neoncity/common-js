export interface WebFetcher {
    fetch(uri: string, options: RequestInit): Promise<Response>;
}
