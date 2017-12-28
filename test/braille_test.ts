import test from 'ava';

import { join as path_join } from 'path';

import { Braille, braille2string, image2braille } from '../lib/braille/index';


test("Valid Braille code", t => {
    const matches: [Braille, string][] = [
        [
            [
                [1, 0],
                [1, 1],
                [0, 0],
                [0, 0]
            ],
            "⠓"
        ],
        [
            [
                [1, 0],
                [1, 1],
                [1, 1],
                [1, 0]
            ],
            "⡷"
        ],
        [
            [
                [0, 1],
                [0, 1],
                [0, 1],
                [0, 1]
            ],
            "⢸"
        ],
        [
            [
                [1, 0],
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            "⣇"
        ]
    ];

    for (let [b, s] of matches) {
        t.is(braille2string(b), s);
    }
});

test("Generate a Braille string from an image", async t => {
    const matches: [string, string[]][] = [
        [
            path_join(__dirname, 'shapes.png'),
            [
                '⢀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⢀⢀',
                '⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣶⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⣀⣤⣤⣤⣤⣄⣀⢀⢀⢀⠙⢿⣿⣧⡀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⣤⣾⣿⣿⡿⠿⠿⠿⣿⣿⣿⣶⣄⢀⠈⠻⣿⣿⣦⡀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⣰⣿⣿⠟⠉⢀⢀⢀⢀⢀⢀⠈⠙⢿⣿⣷⡄⢀⠈⠻⣿⣿⣦⡀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⣼⣿⡿⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠹⣿⣿⡄⢀⢀⠈⠻⣿⣿⣦⡀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢰⣿⣿⠃⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢻⣿⣷⢀⢀⢀⢀⠈⠻⣿⣿⣦⡀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢿⣿⣿⣅⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀⢀⢀⢀⢀⣨⣿⣿⡿⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⠘⣿⣿⡆⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⣿⡟⢀⢀⢀⢀⣠⣾⣿⡿⠋⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⠹⣿⣿⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣼⣿⡿⠁⢀⢀⣠⣾⣿⡿⠋⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⠙⢿⣿⣷⣤⣀⡀⢀⢀⢀⣀⣠⣴⣿⣿⠟⠁⢀⣠⣾⣿⡿⠋⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⢀⢀⣴⣿⡿⠋⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⠉⠉⠉⠉⠁⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⢀⢀⢀⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣷⣄⢀⣴⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⢿⣿⣿⣿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⣇⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣙⣛⣁⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣸⣿⣿⢀⢀',
                '⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀',
                '⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀'
            ]
        ]
    ];

    const settings = {
        white_cutoff: 0.5,
        whitespace: [[0, 0], [0, 0], [0, 0], [0, 1]] as Braille
    };

    for (let [path, expected_lines] of matches) {
        const generated_lines = await image2braille(path, settings);
        t.is(expected_lines.length, generated_lines.length);

        for (let i = 0; i < generated_lines.length; i++) {
            t.is(expected_lines[i], generated_lines[i].join(''));
        }
    }
});
