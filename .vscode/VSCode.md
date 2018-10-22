# VSCode

## Ctrl+`

Toggle zen mode

## Alt+S

Open editor view

## Alt+X

Toggle terminal panel

## Ctrl+Shft+A

Open new terminal

## Ctrl+Shft+Z

Show `git` state

## Ctrl+W

Close current tab

## Ctrl+Q

Close other tabs

---
> Ctrl/Alt section
---

## Alt+2

Change active theme

## Ctrl+2

Open folder

## Alt+3

Switch between terminal windows

## Ctrl+3

Start `Wallaby`

## Alt+4

Toggle sidebar visibility

## Ctrl+4

See `Wallaby` snapshot diff

## Ctrl+7

Stage all chages

---
> Others
---

## Ctrl+Shift+X

View extensions

## F5

Start debug session

## Ctrl+R

Restart debug session

## Ctrl+D

Go to type definition

## Ctrl+G

Go to declaration

## Ctrl+M

Toggle menu bar

```json
{
"rer": {
  "prefix": "rer",
  "body": [
    "const { ${1:method} } = require('${2:library}')"
  ],
  "description": "REquire Root"
},
"red": {
  "prefix": "red",
  "body": [
    "const ${1:method} = require('${2:library}')"
  ],
  "description": "REquire Default"
},
"bind": {
  "prefix": "bin",
  "body": [
    "this.${1:method} = this.${1:method}.bind(this)${0}"
  ],
  "description": "bind"
},
"comment": {
  "prefix": "com",
  "body": [
    "/**",
    " * $0",
    " */"
  ],
  "description": "comment"
},
"Dispatch": {
  "prefix": "dis",
  "body": [
    "this.props.dispatch($0)"
  ],
  "description": "Dispatch"
},
"TslintDisable": {
  "prefix": "di",
  "body": [
    "// tslint:disable-next-line"
  ],
  "description": "TslintDisable"
},
"StringTemplate": {
  "prefix": "st",
  "body": [
    "`${}`"
  ],
  "description": "st"
},
"Expect": {
  "prefix": "exp",
  "body": [
    "expect(",
    "\t$0",
    ").toEqual()"
  ],
  "description": "exp"
},
"ExpectTruthy": {
  "prefix": "ext",
  "body": [
    "expect(",
    "\t$0",
    ").toBeTruthy()"
  ],
  "description": "ext"
},
"ExpectFalsy": {
  "prefix": "exf",
  "body": [
    "expect(",
    "\t$0",
    ").toBeFalsy()"
  ],
  "description": "x"
},
"Rambda": {
  "prefix": "ram",
  "body": [
    "import { $0 } from 'rambda'"
  ],
  "description": "ram"
},
"Rambdax": {
  "prefix": "ramx",
  "body": [
    "import { $0 } from 'rambdax'"
  ],
  "description": "ramx"
},
"Log": {
  "prefix": "lg",
  "body": [
    "console.log($0)"
  ],
  "description": "lg"
},
"Async": {
  "prefix": "asy",
  "body": [
    "export async function $0(input: any): Promise<any> {",
    "\ttry{",
    "\t\t",
    "\t}catch(err){",
    "\t\tthrow err",
    "\t}",
    "}"
  ],
  "description": "asy"
},
"Promise": {
  "prefix": "promise",
  "body": [
    "const $0 = () => new Promise(resolve => {",
    "\t",
    "})"
  ],
  "description": "promise"
},
"Test": {
  "prefix": "test",
  "body": [
    "test('', () => {",
    "\t$0",	
    "})"	
  ],
  "description": "test"
},
"Saga": {
  "prefix": "saga",
  "body": [
      "function *$0Saga(){",
      "\twhile(true){",
      "\t\ttry{",	
      "\t\t\tyield take()",
      "\t\t}catch(err){",
      "\t\t\tconsole.error(err)",
      "\t\t}",
      "\t}",
      "}"
    ],
    "description": "saga"
  },
  "ReactComponent": {
    "prefix": "react",
    "body": [
      "export class $0 extends React.Component<{}, {}> {",
      "\tconstructor(props) {",
      "\t\tsuper(props)",
      "\t}",
      "",
      "\tpublic render() {",
      "\t\treturn <div>",
      "",
      "\t\t</div>",
      "\t}",
      "}"
    ],
    "description": "react"
  },
  "trx": {
    "prefix": "trx",
    "body": [
      "export default translate('admin')(${0})"
    ],
    "description": "TRanslate eXport"
  },
  "trp": {
    "prefix": "trp",
    "body": [
      "t: PropTypes.func.isRequired,"
    ],
    "description": "TRanslate Props"
  },
  "tri": {
    "prefix": "tri",
    "body": [
      "import { translate } from 'react-i18next'"
    ],
    "description": "TRanslate Import"
  },
  "trr": {
    "prefix": "trr",
    "body": [
      "{t('${1:tag}:${2:key}')}"
    ],
    "description": "TRanslate Root"
  },
  "trs": {
    "prefix": "trs",
    "body": [
      "t('${1:tag}:${2:key}')"
    ],
    "description": "TRanslate Simple"
  }
}
```