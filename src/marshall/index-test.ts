import { ArrayOf, OptionalOf, MarshalWith, MarshalFrom, StringMarshaller } from './index';

import { IdMarshaller } from './id';
import { UriMarshaller } from './uri';


class ProfileData {
    @MarshalWith(StringMarshaller)
    name: string;

    @MarshalWith(UriMarshaller)
    bestFriend: string;
}

class User {
    @MarshalWith(IdMarshaller)
    id: number;

    @MarshalWith(UriMarshaller)
    pictureUrl: string;

    @MarshalWith(MarshalFrom(ProfileData))
    profileData: ProfileData;

    @MarshalWith(OptionalOf(UriMarshaller))
    bigProfileUrl?: string

    @MarshalWith(OptionalOf(ArrayOf(IdMarshaller)))
    friendIds: number[]

    toString(): string {
	return this.profileData.name;
    }

    getId(): number {
	return this.id;
    }
}

const userMarshaller = new (MarshalFrom<User>(User));
const user:User = userMarshaller.extract({'id': 10, 'pictureUrl': 'http://hello.com', 'foo': 'bar', 'profileData': {'name': 'Horatio', 'bestFriend': 'http://hello.com/1'}, 'bigProfileUrl': null, 'friendIds': [1, 2]})

console.log(user);
console.log(user.toString());

// function MarshalWith<T>(marshallerCtor: new () => Marshaller<T>) {
//     return function(target: any, propertyKey: string) {
// 	if (!target.hasOwnProperty('__schema')) {
// 	    target.__schema = {};
// 	}
	
// 	target.__schema[propertyKey] = marshallerCtor;
//     }
// }





// interface Entity {
//     __schema?: any;
// }

// class AnnotatedMarshaller<T extends Entity> implements Marshaller<T> {
//     extract(_: any): T {
//         throw new ExtractError('Unexpected');
//     }

//     pack(cooked: T): any {
//         return cooked;
//     }
// }

// class ProfileInfo implements Entity {
//     @MarshalWith(StringMarshaller)
//     name: string;
// }

// class ProfileInfoMarshaller extends AnnotatedMarshaller<ProfileInfo> {}

// //@Marshaled
// class BasicUser implements Entity {
//     @MarshalWith(IdMarshaller)
//     userId: number;

//     @MarshalWith(UriMarshaller)
//     pictureUri: string;

//     @MarshalWith(IdMarshaller)
//     score?: number;

//     @MarshalWith(ProfileInfoMarshaller)
//     profileInfo: ProfileInfo;
// }

// class BasicUserMarshaller extends AnnotatedMarshaller<BasicUser> {}

// const schema: MarshalSchema<BasicUser> = {
//     userId: new IdMarshaller(),
//     pictureUri: new UriMarshaller(),
//     score: new OptionalMarshaller(new IdMarshaller())
// };

// const om = new ObjectMarshaller(schema);

// const lom = new ArrayMarshaller(om);

// console.log((BasicUser.prototype as any).__schema);


// console.log(JSON.stringify(om.extract({'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10})));
// console.log(JSON.stringify(lom.extract([{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar', 'score': 10},{'userId': 10, 'pictureUri': 'http://example.com', 'foo': 'bar'}])));

