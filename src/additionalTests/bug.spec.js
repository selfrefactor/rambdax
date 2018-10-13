const R = require('../../dist/rambdax.js')

const x = {
  doc : {
    _id            : '7b445956-2fb4-44a6-b25c-22ca15291539',
    _rev           : '4-0713f79a1ea34e538e9a1063f3f60046',
    dePart         : 'Solange die Kinder klein sind, gib ihnen Wurzeln.',
    deWord         : 'die Wurzeln',
    enPart         : 'As long as the children are small, give them roots.',
    enWord         : 'roots',
    imageSrcOrigin : 'https://quotefancy.com/media/wallpaper/3840x2160/3441-Dalai-Lama-XIV-Quote-Give-the-ones-you-love-wings-to-fly-roots-to.jpg',
    imageSrc       : 'https://i.imgur.com/azVvgq2.jpg',
    altTag         : 'small long children give',
  },
  key : '7b445956-2fb4-44a6-b25c-22ca15291539',
  _id : '7b445956-2fb4-44a6-b25c-22ca15291539',
}

const y = {
  doc : {
    _id            : '2c0ee0f8-e281-40af-a0b2-5e6ab163fbdc',
    _rev           : '3-fa828694ecc24816b10937d109ec7050',
    dePart         : 'Abschied nehmen bedeutet immer ein wenig sterben.',
    deWord         : 'der Abschied',
    enPart         : 'Saying goodbye always means a little death.',
    enWord         : 'farewell, goodbye',
    imageSrcOrigin : 'http://img.picturequotes.com/2/605/604991/saying-goodbye-quote-7-picture-quote-1.jpg',
    imageSrc       : 'https://i.imgur.com/6sVkwTf.jpg',
    altTag         : 'always means saying little',
  },
  key : '2c0ee0f8-e281-40af-a0b2-5e6ab163fbdc',
  _id : '2c0ee0f8-e281-40af-a0b2-5e6ab163fbdc',
}

const z = {
  _id      : '_design/imagefull',
  _rev     : '2-ed64e8e3db82ac7cc2340518276a1926',
  views    : { imagefull : { map : 'function(doc) {\n    if(doc.imageSrc !== false &&\n    doc.imageSrc !== null &&\n    doc.imageSrc !== undefined){\n        emit(doc._id, doc);\n    }\n  \n}   ' } },
  language : 'javascript',
}

const rawData = [ x, y, z ]

const expected = {
  data : [ {
    altTag         : 'small long children give',
    dePart         : 'Solange die Kinder klein sind, gib ihnen Wurzeln.',
    deWord         : 'die Wurzeln',
    enPart         : 'As long as the children are small, give them roots.',
    enWord         : 'roots',
    imageSrc       : 'https://i.imgur.com/azVvgq2.jpg',
    imageSrcOrigin : 'https://quotefancy.com/media/wallpaper/3840x2160/3441-Dalai-Lama-XIV-Quote-Give-the-ones-you-love-wings-to-fly-roots-to.jpg',
  }, {
    altTag         : 'always means saying little',
    dePart         : 'Abschied nehmen bedeutet immer ein wenig sterben.',
    deWord         : 'der Abschied',
    enPart         : 'Saying goodbye always means a little death.',
    enWord         : 'farewell, goodbye',
    imageSrc       : 'https://i.imgur.com/6sVkwTf.jpg',
    imageSrcOrigin : 'http://img.picturequotes.com/2/605/604991/saying-goodbye-quote-7-picture-quote-1.jpg',
  } ],
  idCollection : [ {
    _id  : '7b445956-2fb4-44a6-b25c-22ca15291539',
    _rev : '4-0713f79a1ea34e538e9a1063f3f60046',
  }, {
    _id  : '2c0ee0f8-e281-40af-a0b2-5e6ab163fbdc',
    _rev : '3-fa828694ecc24816b10937d109ec7050',
  } ],
}

test('composeAsync does not replace properly `compose` in the code above', () => {
  const result = R.compose(
    R.produce({
      data         : R.pluck('data'),
      idCollection : R.pluck('idCollection'),
    }),
    R.map(x => ({
      data         : R.omit('created,updated,_id,_rev')(x.doc),
      idCollection : {
        _id  : x.doc._id,
        _rev : x.doc._rev,
      },
    })),
    R.take(11),
    R.filter(x => !x._id.startsWith('_design'))
  )(rawData)

  expect(
    result
  ).toEqual(expected)
})
