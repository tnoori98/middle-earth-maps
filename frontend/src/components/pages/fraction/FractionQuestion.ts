import { FractionQuestionModel } from "./FractionQuestionModel";
import { FractionEnum } from "./FractionEnum";

export const FractionQuestions: FractionQuestionModel[] = [
    {
        id: 1,
        question: "Which weapon would you rather use?",
        answers: [
            {
                id: 1,
                answer: "A sword",
                points: [
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 1
                    }
                ]
            },
            {
                id: 2,
                answer: "A bow",
                points: [
                    {
                        fraction: FractionEnum.ELF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 1
                    }
                ]
            },
            {
                id: 3,
                answer: "A staff",
                points: [
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            },
            {
                id: 4,
                answer: "An axe",
                points: [
                    {
                        fraction: FractionEnum.DWARF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ORC,
                        point: 1
                    }
                ]
            },
            {
                id: 5,
                answer: "A club",
                points: [
                    {
                        fraction: FractionEnum.ORC,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.DWARF,
                        point: 1
                    }
                ]
            },
            {
                id: 6,
                answer: "A dagger",
                points: [
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 1
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        question: "What is your favorite color?",
        answers: [
            {
                id: 1,
                answer: "Brown/Red",
                points: [
                    {
                        fraction: FractionEnum.DWARF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ORC,
                        point: 1
                    }
                ]
            },
            {
                id: 2,
                answer: "Silver",
                points: [
                    {
                        fraction: FractionEnum.ELF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 1
                    }
                ]
            },
            {
                id: 3,
                answer: "Blue",
                points: [
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 1
                    }
                ]
            },
            {
                id: 4,
                answer: "None of the above",
                points: [
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 1
                    }
                ]
            },
            {
                id: 5,
                answer: "Red/Black",
                points: [
                    {
                        fraction: FractionEnum.ORC,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.DWARF,
                        point: 1
                    }
                ]
            },
            {
                id: 6,
                answer: "Green",
                points: [
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        question: "What is your favorite drink?",
        answers: [
            {
                id: 1,
                answer: "Beer",
                points: [
                    {
                        fraction: FractionEnum.DWARF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 1
                    }
                ]
            },
            {
                id: 2,
                answer: "Sparkling Wine",
                points: [
                    {
                        fraction: FractionEnum.ELF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.DWARF,
                        point: 1
                    }
                ]
            },
            {
                id: 3,
                answer: "Cocktail",
                points: [
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 1
                    }
                ]
            },
            {
                id: 4,
                answer: "Water",
                points: [
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            },
            {
                id: 5,
                answer: "Blood",
                points: [
                    {
                        fraction: FractionEnum.ORC,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 1
                    }
                ]
            },
            {
                id: 6,
                answer: "Apple Juice",
                points: [
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ORC,
                        point: 1
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        question: "Which mount would you prefer?",
        answers: [
            {
                id: 1,
                answer: "Goat",
                points: [
                    {
                        fraction: FractionEnum.DWARF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 1
                    }
                ]
            },
            {
                id: 2,
                answer: "Eagle",
                points: [
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            },
            {
                id: 3,
                answer: "Boar",
                points: [
                    {
                        fraction: FractionEnum.ORC,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.DWARF,
                        point: 1
                    }
                ]
            },
            {
                id: 4,
                answer: "Horse",
                points: [
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            },
            {
                id: 5,
                answer: "Elk",
                points: [
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 1
                    }
                ]
            },
            {
                id: 6,
                answer: "Wolf",
                points: [
                    {
                        fraction: FractionEnum.ELF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ORC,
                        point: 1
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        question: "Your favorite place for vacation?",
        answers: [
            {
                id: 1,
                answer: "Beach",
                points: [
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 1
                    }
                ]
            },
            {
                id: 2,
                answer: "Mountains",
                points: [
                    {
                        fraction: FractionEnum.DWARF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 1
                    }
                ]
            },
            {
                id: 3,
                answer: "Forest",
                points: [
                    {
                        fraction: FractionEnum.WIZARD,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.HUMAN,
                        point: 1
                    }
                ]
            },
            {
                id: 4,
                answer: "Farm",
                points: [
                    {
                        fraction: FractionEnum.HOBBIT,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ORC,
                        point: 1
                    }
                ]
            },
            {
                id: 5,
                answer: "Cave",
                points: [
                    {
                        fraction: FractionEnum.ELF,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.DWARF,
                        point: 1
                    }
                ]
            },
            {
                id: 6,
                answer: "Desert",
                points: [
                    {
                        fraction: FractionEnum.ORC,
                        point: 3
                    },
                    {
                        fraction: FractionEnum.ELF,
                        point: 1
                    }
                ]
            }
        ]
    }
];
