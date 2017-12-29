`braille-art` is a small nifty package allowing for encoding images to all-braille unicode representations.
It makes use of [`jimp`](https://github.com/oliver-moran/jimp) and thus supports all image types that `jimp` does.

## Installation ##
```
npm install braille-art -S
```

## Members ##
`Braille` is a 4x2 array of zeros and ones representing a Braille glyph, e.g.,
```ts
[
    [0, 1],
    [0, 1],
    [1, 0],
    [0, 1]
]
```

`image2braille` is a function accepting `2` parameters:
- path to an image
- settings object:
    - `white_cutoff: number` above this value a shade of gray will be represented as a dot,
    - `whitespace?: string | Braille`, specifies what symbol is used for whitespaces. This setting is important for non-monospace fonts. The default value is an empty Braille glyph, which is (most likely) as wide as a regular whitespace and narrower than other Braille glyphs. Therefore I recommend using some Braille character which will not spoil the overall picture
    - `scale?: number`, image rescaling,
    - `width?: number`, resize image,
    - `height?: number`, resize image

    Scaling takes precendence over resizing. If only width or height is specified, the other side will be resized proportionally.

`image2braille` returns a `Promise` of an array of arrays of Braille unicode chars.

## Usage ##
```ts
import { image2braille, Braille } from 'image2braille';
import { createWriteStream } from 'fs';

const settings = {
    white_cutoff: 0.5,
    whitespace: [[0, 0], [0, 0], [0, 0], [0, 1]] as Braille
};

image2braille('./shapes.png', settings).then(strimage => {
    const out = createWriteStream('text.txt');
    for (const line of strimage) {
        out.write(`${line.join('').trimRight()}\n`);
    }
    out.end();
}).catch(err => {
    console.log(`Cannot handle the request due to:\n${err}`);
});
```

