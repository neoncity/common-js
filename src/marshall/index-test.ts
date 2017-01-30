// import { ExtractError, Marshaller, ArrayMarshaller, ObjectMarshaller, OptionalMarshaller, MarshalSchema, StringMarshaller } from './index';

// import { IdMarshaller } from './id';
// import { UriMarshaller } from './uri';

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


class A {
    foo() {
        let proto = Object.getPrototypeOf(this);

        while (proto != null && proto.hasOwnProperty('bar')) {
            proto.bar();
            proto = Object.getPrototypeOf(proto);
        }
    }

    bar() {
        console.log('A');
    }
}

class B extends A {
    bar() {
        console.log('B');
    }
}

const b = new B();
b.foo();
