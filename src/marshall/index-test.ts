import { ObjectMarshaller, MarshalSchema} from './index';

import { IdMarshaller } from './id';
import { UriMarshaller } from './uri';

interface BasicUser {
    userId: number;
    pictureUri: string;
}

const schema: MarshalSchema<BasicUser> = {
    userId: new IdMarshaller(),
    pictureUri: new UriMarshaller()
};

const om = new ObjectMarshaller(schema);


console.log(JSON.stringify(om.extract({'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar'})));