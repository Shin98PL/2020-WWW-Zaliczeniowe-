/** Test w notacji JSON */
const test = {
    "intro": "Sprawdź się!",
    "exercises": [
        {
            "question": "26 + 7 * 12",
            "answer": "110",
            "hint": {
                "text": "a)45 b)100 c)110 d)396",
                "penalty": 6
            },
            "penalty": 20
        },
        {
            "question": " 1 * (-2) + (-3) * 4 - 5 * (-6)",
            "answer": "16",
            "hint": {
                "text": "a)1 b)16 c)21 d)-21",
                "penalty": 10
            },
            "penalty": 25
        },
        {
            "question": "12 + 33 - 9 - 45:5 + 18 + 27 - 48:4",
            "answer": "60",
            "hint": null,
            "penalty": 30
        },
        {
            "question": "169 + 14 * (-13) + 49",
            "answer": "36",
            "hint": {
                "text": "Wzór skróconego mnożenia.",
                "penalty": 15
            },
            "penalty": 35
        },
        {
            "question": "1 + 2 + 3 + 4 + ... + 98 + 99 + 100",
            "answer": "5050",
            "hint": {
                "text": "Można połączyć liczby w pary, bedzie wtedy 50 razy 101",
                "penalty": 20
            },
            "penalty": 40
        }
    ]
}