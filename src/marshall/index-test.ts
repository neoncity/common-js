import { Marshaller, ArrayMarshaller, ObjectMarshaller, OptionalMarshaller, MarshalSchema, StringMarshaller } from './index';

import { IdMarshaller } from './id';
import { UriMarshaller } from './uri';

function MarshalWith<T>(marshallerCtor: new () => Marshaller<T>) {
    return function(target: any, propertyKey: string) {
	if (!target.hasOwnProperty('__schema')) {
	    target.__schema = {};
	}
	
	target.__schema[propertyKey] = marshallerCtor;
    }
}

class ProfileInfo {
    @MarshalWith(StringMarshaller)
    name: string;
}

//@Marshaled
class BasicUser {
    @MarshalWith(IdMarshaller)
    userId: number;

    @MarshalWith(UriMarshaller)
    pictureUri: string;

    @MarshalWith(IdMarshaller)
    score?: number;

    @MarshalWith(ProfileInfo)
    profileInfo: ProfileInfo;
}

class BasicUserMarshaller extends AnnotatedMarshaller<BasicUser> {}

const schema: MarshalSchema<BasicUser> = {
    userId: new IdMarshaller(),
    pictureUri: new UriMarshaller(),
    score: new OptionalMarshaller(new IdMarshaller())
};

const om = new ObjectMarshaller(schema);

const lom = new ArrayMarshaller(om);

console.log((BasicUser.prototype as any).__schema);


console.log(JSON.stringify(om.extract({'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10})));
console.log(JSON.stringify(lom.extract([{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10},{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar'}])));
