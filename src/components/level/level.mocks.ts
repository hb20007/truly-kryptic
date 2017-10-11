export const levelsBasic = (): Level[][] => [
    [
        {
            "title": "Change numbers to...",
            "hints": [
                {
                    "image": "letters.jpg"
                },
                {
                    "text": "1 14 19 23 5 18, 9 19, 8 1 12 12 23 1 25"
                },
                {
                    "text": "Check out Getting started in the menu above for instructions."
                },
                {
                    "text": "If you are still stuck, try typing 'help' in the answer box."
                },
                {
                    "text": "A = 1, B = 2 ...",
                    "triggers": ["help"]
                }
            ],
            "answers": ["hallway"]
        }
    ],
    [
        {
            "title": "Anna Graham",
            "hints": [
                {
                    "image": "anagram.png"
                },
                {
                    "text": "low end keg"
                }
            ],
            "answers": ["knowledge"]
        },
        {
            "title": "Brighten her up",
            "hints": [
                {
                    "image": "brighten-me-up.jpg"
                },
                {
                    "text": "You may need to save the image to your device."
                }
            ],
            "answers": ["elephant"]
        }
    ]
];

export const levelGuessesDatabaseMock = () => [
    { value: "chicken", isAnswer: false, unlocksHint: false },
    { value: "entry", isAnswer: false, unlocksHint: { text: 'nice try' } },
    { value: "entryy", isAnswer: false, unlocksHint: { text: 'nice try' } },
    { value: "$entryy", isAnswer: false, unlocksHint: { text: 'nice try' } },
    { value: "door", isAnswer: true, unlocksHint: false },
];

export const levelGuesses = () => [
    { value: 'chicken', isAnswer: false, unlocksHint: false },
    { value: 'entry', isAnswer: false, unlocksHint: { text: 'nice try' } },
    { value: 'entryy', isAnswer: false, unlocksHint: { text: 'nice try' } },
    { value: 'door', isAnswer: true, unlocksHint: false },
];