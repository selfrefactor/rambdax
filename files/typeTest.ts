import {wait, delay} from '../rambdax'

async function rabbitHole(){
  const [result, err] = await wait(delay(1000))

  console.log({result, err})
}

rabbitHole()