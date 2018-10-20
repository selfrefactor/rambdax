# Create random PNG file name

```javascript
const R = require("rambdax")

const fileName = R.compose(
     R.join(""),
     R.prepend(`${__dirname}/`),
     R.append(".png"),
     R.flatten,
     R.map(
       () => R.take(2)(
            R.shuffle(
              R.split("", "qwertyuiopasdfghjk")
            )
          )
      )
   )(R.range(0,5))
```