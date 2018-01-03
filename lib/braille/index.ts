import * as jimp from 'jimp';
import resolve from '../resolve';

export type zero_one = 0 | 1;
export type Braille = [
    [zero_one, zero_one],
    [zero_one, zero_one],
    [zero_one, zero_one],
    [zero_one, zero_one]
];

export function braille2string(b: Braille): string {
    const lowEndian = [b[0][0], b[1][0], b[2][0], b[0][1], b[1][1], b[2][1], b[3][0], b[3][1]];
    let value: number = 0;
    for (let i = 0; i < lowEndian.length; i++) {
        value += (lowEndian[i] << i);
    }

    return String.fromCharCode(0x2800 + value);
}

export interface BrailleArtSettings {
    white_cutoff: number;
    whitespace?: string | Braille;
    scale?: number;
    width?: number;
    height?: number;
}

export async function image2braille(path: string, settings: BrailleArtSettings): Promise<string[][]> {
    let _settings = Object.assign({}, settings);

    const raised = function (value: number): zero_one {
        // 0xFFFFFF = (4294967295)_10
        return value / 4294967295 > _settings.white_cutoff ? 0 : 1;
    };
    const non_empty = function (b: Braille): boolean {
        return (
            b[0][0] !== 0 || b[0][1] !== 0 ||
            b[1][0] !== 0 || b[1][1] !== 0 ||
            b[2][0] !== 0 || b[2][1] !== 0 ||
            b[3][0] !== 0 || b[3][1] !== 0
        );
    };

    if (!_settings.whitespace) {
        // Define dafault space symbol
        _settings.whitespace = braille2string([[0, 0], [0, 0], [0, 0], [0, 0]]);
    } else if (typeof _settings.whitespace !== "string") {
        _settings.whitespace = braille2string(_settings.whitespace! as Braille);
    }

    let [img, err] = await resolve(jimp.read(path));
    if (err !== null) {
        return Promise.reject(err);
    }

    // img !== null, we have handled this case
    img = img!.grayscale();

    if (_settings.scale && _settings.scale !== 1 && _settings.scale !== 1.0) {
        img = img.scale(_settings.scale);
    } else if (_settings.width && _settings.height) {
        img = img.resize(_settings.width, _settings.height);
    } else if (_settings.width) {
        img = img.resize(_settings.width, jimp.AUTO);
    } else if (_settings.height) {
        img = img.resize(jimp.AUTO, _settings.height);
    }

    let strimage: string[][] = [];

    for (let y = 0; y < img.bitmap.height; y += 4) {
        let line: string[] = [];
        for (let x = 0; x < img.bitmap.width; x += 2) {
            const b: Braille = [
                [raised(img.getPixelColor(x, y/**/)), raised(img.getPixelColor(x + 1, y/**/))],
                [raised(img.getPixelColor(x, y + 1)), raised(img.getPixelColor(x + 1, y + 1))],
                [raised(img.getPixelColor(x, y + 2)), raised(img.getPixelColor(x + 1, y + 2))],
                [raised(img.getPixelColor(x, y + 3)), raised(img.getPixelColor(x + 1, y + 3))]
            ];

            const s: string = non_empty(b) ? braille2string(b) : _settings.whitespace!;
            line.push(s);
        }
        strimage.push(line);
    }

    return strimage;
}
