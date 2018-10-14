const add  = (a, b) => a + b;
const mult = (a, b) => a * b;

const aaa = 1
    |> (_ => add(2, _))
    |> (_ => mult(3, _));

// Smart Pipelines(Coming Soon)
// const aaa = 1 |> add(2, #) |> mult(3, #);

// F#-Style Pipeline (Coming Soon)
// promise
//   |> await
//   |> (x => doubleSay(x, ', '))
//   |> capitalize
//   |> (x => x + '!')
//   |> (x => new User.Message(x))
//   |> (x => stream.write(x))
//   |> await
//   |> console.log;