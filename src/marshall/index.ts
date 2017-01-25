class MarshallError extends Error {}


class ExtractError extends MarshallError {}


class PackError extends MarshallError {}


interface Marshaller<Cooked, Raw> {
    extract(raw: Raw): Cooked;
    pack(cooked: Cooked): Raw;
}


class IdMarshaller implements Marshaller<number, number> {
    static Schema = {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'title': 'Id',
	'description': 'An unique id for the entiry',
	'type': 'integer',
	'minimum': 1
    }
    
    extract(raw: number): number {
        if (raw <= 0) {
	    throw new ExtractError();
	}

	return raw;
    }

    pack(cooked: number): number {
	return cooked;
    }
}
