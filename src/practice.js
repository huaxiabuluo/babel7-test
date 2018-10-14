// import a from 'a';
// export const b = 1;

// const aaa = { a: 1, b: 2 };
// const bbb = { a: 1, ...aaa };

// try {
//     throw 0;
// } catch {
//     console.log(1);
// } finally {
//     console.log(2);
// }

// 2 ** 3 ** 2

function decorator(target, property, derector) {
    // console.log('#####: ', derector.initializer);
    console.log('#####: ', derector.value());
}

class Aaa {
    constructor() {
        this.name = 'xiaohua';
        this.getName = this.getName.bind(this);
    }
    @decorator
    getName() { console.log('###: ', this.name); }
}

const { getName } = new Aaa();
getName();

const aaa = async () => {
	const num = await new Promise(resolve => setTimeout(() => resolve(123), 1000));
	return num;
}

const bbb = Object.assign({}, { tt: 123 });

function *ccc() {
	yield 123;
}
