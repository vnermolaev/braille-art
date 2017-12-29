export declare type zero_one = 0 | 1;
export declare type Braille = [[zero_one, zero_one], [zero_one, zero_one], [zero_one, zero_one], [zero_one, zero_one]];
export declare function braille2string(b: Braille): string;
export interface BrailleArtSettings {
    white_cutoff: number;
    whitespace?: string | Braille;
    scale?: number;
    width?: number;
    height?: number;
}
export declare function image2braille(path: string, settings: BrailleArtSettings): Promise<string[][]>;
