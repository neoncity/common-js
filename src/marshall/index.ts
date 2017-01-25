export class MarshallError extends Error {}


export class ExtractError extends MarshallError {}


export class PackError extends MarshallError {}


export interface Marshaller<Cooked, Raw> {
    extract(raw: Raw): Cooked;
    pack(cooked: Cooked): Raw;
}
