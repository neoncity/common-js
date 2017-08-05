import 'isomorphic-fetch'


export interface WebFetcher {
    fetch(uri: string, options: RequestInit): Promise<ResponseInterface>;
}
