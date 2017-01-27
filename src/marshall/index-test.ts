import { ArrayMarshaller, ObjectMarshaller, OptionalMarshaller, MarshalSchema} from './index';

import { IdMarshaller } from './id';
import { UriMarshaller } from './uri';

interface BasicUser {
    userId: number;
    pictureUri: string;
    score?: number;
}

const schema: MarshalSchema<BasicUser> = {
    userId: new IdMarshaller(),
    pictureUri: new UriMarshaller(),
    score: new OptionalMarshaller(new IdMarshaller())
};

const om = new ObjectMarshaller(schema);

const lom = new ArrayMarshaller(om);


console.log(JSON.stringify(om.extract({'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10})));
console.log(JSON.stringify(lom.extract([{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10},{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar'}])));
