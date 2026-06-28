export const samplePlays = [
  {
    "name": "Blank Court Template",
    "category": "Blank",
    "group": "Blank",
    "tags": [
      "Whiteboard",
      "Template"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "",
    "annotations": [],
    "purpose": "Use this as a quick whiteboard. Turn on Draw, choose a pen color, and sketch the action.",
    "steps": [
      {
        "note": "Blank full-court template for quick coaching notes or drawing a play in a pinch.",
        "ball": null,
        "players": {},
        "actions": []
      }
    ]
  },
  {
    "name": "5-Out Motion: Pass and Cut",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Motion",
      "5 Out",
      "Pass and Cut"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Cut hard after the pass. Fill the open spot. The shot comes from the best catch-and-shoot or layup read.",
    "videoUrl": "https://www.youtube.com/watch?v=inc4zoIjzEI",
    "annotations": [],
    "purpose": "Teach spacing, pass-and-cut habits, and filling open spots.",
    "steps": [
      {
        "note": "Initial 5-out spacing. 1 has the ball at the top.",
        "ball": 1,
        "players": {
          "1": [
            36,
            50
          ],
          "2": [
            23,
            26
          ],
          "3": [
            23,
            74
          ],
          "4": [
            40,
            18
          ],
          "5": [
            40,
            82
          ]
        },
        "actions": []
      },
      {
        "note": "1 passes to 2 and cuts hard to the rim.",
        "ball": 2,
        "players": {
          "1": [
            20,
            48
          ],
          "2": [
            23,
            26
          ],
          "3": [
            23,
            74
          ],
          "4": [
            40,
            18
          ],
          "5": [
            40,
            82
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              36,
              50
            ],
            "to": [
              23,
              26
            ]
          },
          {
            "type": "cut",
            "from": [
              36,
              50
            ],
            "to": [
              20,
              48
            ]
          }
        ]
      },
      {
        "note": "1 clears to opposite corner. 4 fills the top.",
        "ball": 2,
        "players": {
          "1": [
            23,
            82
          ],
          "2": [
            23,
            26
          ],
          "3": [
            25,
            70
          ],
          "4": [
            36,
            50
          ],
          "5": [
            40,
            82
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              20,
              48
            ],
            "to": [
              23,
              82
            ]
          },
          {
            "type": "cut",
            "from": [
              40,
              18
            ],
            "to": [
              36,
              50
            ]
          }
        ]
      },
      {
        "note": "2 reverses to 4. 3 lifts from corner to wing.",
        "ball": 4,
        "players": {
          "1": [
            23,
            82
          ],
          "2": [
            23,
            26
          ],
          "3": [
            32,
            70
          ],
          "4": [
            36,
            50
          ],
          "5": [
            40,
            82
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              23,
              26
            ],
            "to": [
              36,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              25,
              70
            ],
            "to": [
              32,
              70
            ]
          }
        ]
      },
      {
        "note": "4 swings to 3. 5 back-cuts from corner.",
        "ball": 3,
        "players": {
          "1": [
            23,
            82
          ],
          "2": [
            23,
            26
          ],
          "3": [
            32,
            70
          ],
          "4": [
            36,
            50
          ],
          "5": [
            20,
            58
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              36,
              50
            ],
            "to": [
              32,
              70
            ]
          },
          {
            "type": "cut",
            "from": [
              40,
              82
            ],
            "to": [
              20,
              58
            ]
          }
        ]
      },
      {
        "note": "3 hits 5 at the rim for the finish.",
        "ball": 5,
        "players": {
          "1": [
            23,
            82
          ],
          "2": [
            23,
            26
          ],
          "3": [
            32,
            70
          ],
          "4": [
            36,
            50
          ],
          "5": [
            16,
            52
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              32,
              70
            ],
            "to": [
              16,
              52
            ]
          },
          {
            "type": "cut",
            "from": [
              20,
              58
            ],
            "to": [
              16,
              52
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Give and Go",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Give and Go",
      "Cut",
      "Youth"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Passer must cut immediately. Receiver looks at the cutter first, then keeps the ball moving if covered.",
    "videoUrl": "https://www.youtube.com/watch?v=O_Z4gkyPNG0",
    "annotations": [],
    "purpose": "Simple action for passing, cutting, and timing.",
    "steps": [
      {
        "note": "1 starts at the top. 2 is on the wing.",
        "ball": 1,
        "players": {
          "1": [
            38,
            50
          ],
          "2": [
            24,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": []
      },
      {
        "note": "1 passes to 2.",
        "ball": 2,
        "players": {
          "1": [
            38,
            50
          ],
          "2": [
            24,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              38,
              50
            ],
            "to": [
              24,
              30
            ]
          }
        ]
      },
      {
        "note": "1 cuts hard to the basket.",
        "ball": 2,
        "players": {
          "1": [
            21,
            50
          ],
          "2": [
            24,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              38,
              50
            ],
            "to": [
              21,
              50
            ]
          }
        ]
      },
      {
        "note": "2 leads 1 with the return pass.",
        "ball": 1,
        "players": {
          "1": [
            18,
            50
          ],
          "2": [
            24,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              24,
              30
            ],
            "to": [
              18,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              21,
              50
            ],
            "to": [
              18,
              50
            ]
          }
        ]
      },
      {
        "note": "1 finishes at the rim. Weak side stays spaced.",
        "ball": 1,
        "players": {
          "1": [
            14,
            50
          ],
          "2": [
            24,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              18,
              50
            ],
            "to": [
              14,
              50
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Pick and Roll",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Pick and Roll",
      "Ball Screen"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Wait for the screen. Ball handler attacks shoulder-to-shoulder. Roller shows hands.",
    "annotations": [],
    "purpose": "Teach ball screen spacing, driving, rolling, and kick-out reads.",
    "steps": [
      {
        "note": "1 has the ball. 5 prepares to screen.",
        "ball": 1,
        "players": {
          "1": [
            39,
            50
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            47,
            24
          ],
          "5": [
            31,
            55
          ]
        },
        "actions": []
      },
      {
        "note": "5 sets a high ball screen for 1.",
        "ball": 1,
        "players": {
          "1": [
            39,
            50
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            47,
            24
          ],
          "5": [
            35,
            50
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              35,
              50
            ]
          }
        ]
      },
      {
        "note": "1 uses the screen to turn the corner.",
        "ball": 1,
        "players": {
          "1": [
            29,
            43
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            47,
            24
          ],
          "5": [
            35,
            50
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              39,
              50
            ],
            "to": [
              29,
              43
            ]
          }
        ]
      },
      {
        "note": "5 rolls to the rim. 4 lifts as the safety outlet.",
        "ball": 1,
        "players": {
          "1": [
            26,
            43
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            42,
            35
          ],
          "5": [
            21,
            54
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              35,
              50
            ],
            "to": [
              21,
              54
            ]
          },
          {
            "type": "cut",
            "from": [
              47,
              24
            ],
            "to": [
              42,
              35
            ]
          }
        ]
      },
      {
        "note": "1 reads help and passes to the roller.",
        "ball": 5,
        "players": {
          "1": [
            26,
            43
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            42,
            35
          ],
          "5": [
            18,
            54
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              26,
              43
            ],
            "to": [
              18,
              54
            ]
          },
          {
            "type": "cut",
            "from": [
              21,
              54
            ],
            "to": [
              18,
              54
            ]
          }
        ]
      },
      {
        "note": "5 catches and finishes at the rim.",
        "ball": 5,
        "players": {
          "1": [
            26,
            43
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            42,
            35
          ],
          "5": [
            14,
            52
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              18,
              54
            ],
            "to": [
              14,
              52
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Horns Entry",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Horns",
      "Ball Screen",
      "Entry"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "4 and 5 start at elbows. 1 uses either screen. Opposite big spaces or dives.",
    "annotations": [],
    "purpose": "Classic two-high-post entry that can flow into ball screen, dive, or kick-out reads.",
    "steps": [
      {
        "note": "Horns alignment: 4 and 5 at elbows, 2 and 3 in corners.",
        "ball": 1,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            30,
            42
          ],
          "5": [
            30,
            58
          ]
        },
        "actions": []
      },
      {
        "note": "1 dribbles off 5. 5 sets the ball screen.",
        "ball": 1,
        "players": {
          "1": [
            33,
            59
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            30,
            42
          ],
          "5": [
            34,
            56
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              34,
              56
            ]
          },
          {
            "type": "dribble",
            "from": [
              42,
              50
            ],
            "to": [
              33,
              59
            ]
          }
        ]
      },
      {
        "note": "1 attacks the lane. 5 rolls. 4 pops behind the play.",
        "ball": 1,
        "players": {
          "1": [
            25,
            62
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            41,
            44
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              33,
              59
            ],
            "to": [
              25,
              62
            ]
          },
          {
            "type": "cut",
            "from": [
              34,
              56
            ],
            "to": [
              20,
              55
            ]
          },
          {
            "type": "cut",
            "from": [
              30,
              42
            ],
            "to": [
              41,
              44
            ]
          }
        ]
      },
      {
        "note": "Help tags the roller. 1 kicks to 3 in the corner.",
        "ball": 3,
        "players": {
          "1": [
            25,
            62
          ],
          "2": [
            22,
            22
          ],
          "3": [
            22,
            78
          ],
          "4": [
            41,
            44
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              25,
              62
            ],
            "to": [
              22,
              78
            ]
          }
        ]
      },
      {
        "note": "3 has shot. 5 seals inside as rebound/finish option.",
        "ball": 3,
        "players": {
          "1": [
            25,
            62
          ],
          "2": [
            22,
            22
          ],
          "3": [
            19,
            82
          ],
          "4": [
            41,
            44
          ],
          "5": [
            16,
            55
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              22,
              78
            ],
            "to": [
              19,
              82
            ]
          },
          {
            "type": "cut",
            "from": [
              20,
              55
            ],
            "to": [
              16,
              55
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "UCLA Cut",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "UCLA",
      "Back Screen",
      "Cut"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Pass to wing, cut off the high-post back screen, and look for the layup first.",
    "annotations": [],
    "purpose": "Entry action that teaches passing to the wing and cutting off a back screen.",
    "steps": [
      {
        "note": "1 at top, 2 wing, 5 high post.",
        "ball": 1,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            31,
            50
          ]
        },
        "actions": []
      },
      {
        "note": "1 passes to 2.",
        "ball": 2,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            31,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              42,
              50
            ],
            "to": [
              25,
              30
            ]
          }
        ]
      },
      {
        "note": "5 sets the UCLA back screen.",
        "ball": 2,
        "players": {
          "1": [
            38,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            31,
            50
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              31,
              50
            ]
          }
        ]
      },
      {
        "note": "1 cuts off 5 toward the rim.",
        "ball": 2,
        "players": {
          "1": [
            19,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            31,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              38,
              50
            ],
            "to": [
              19,
              50
            ]
          }
        ]
      },
      {
        "note": "2 passes to 1 for layup if open.",
        "ball": 1,
        "players": {
          "1": [
            16,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            31,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              25,
              30
            ],
            "to": [
              16,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              19,
              50
            ],
            "to": [
              16,
              50
            ]
          }
        ]
      },
      {
        "note": "If covered, 5 pops as safety. 1 can kick back.",
        "ball": 5,
        "players": {
          "1": [
            16,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            24,
            78
          ],
          "4": [
            44,
            75
          ],
          "5": [
            38,
            48
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              31,
              50
            ],
            "to": [
              38,
              48
            ]
          },
          {
            "type": "pass",
            "from": [
              16,
              50
            ],
            "to": [
              38,
              48
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Flex Screen",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Flex",
      "Screen Away",
      "Baseline Cut"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Cut shoulder-to-shoulder. Screen the screener. Final look is layup or elbow jumper.",
    "annotations": [],
    "purpose": "Classic screening action that teaches baseline cuts and screen-the-screener movement.",
    "steps": [
      {
        "note": "Start in four-out spacing with 5 near the block.",
        "ball": 1,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            26,
            25
          ],
          "3": [
            26,
            75
          ],
          "4": [
            42,
            25
          ],
          "5": [
            20,
            70
          ]
        },
        "actions": []
      },
      {
        "note": "1 passes to 4.",
        "ball": 4,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            26,
            25
          ],
          "3": [
            26,
            75
          ],
          "4": [
            42,
            25
          ],
          "5": [
            20,
            70
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              42,
              50
            ],
            "to": [
              42,
              25
            ]
          }
        ]
      },
      {
        "note": "5 sets flex screen for 3 on the baseline.",
        "ball": 4,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            26,
            25
          ],
          "3": [
            18,
            52
          ],
          "4": [
            42,
            25
          ],
          "5": [
            22,
            68
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              22,
              68
            ]
          },
          {
            "type": "cut",
            "from": [
              26,
              75
            ],
            "to": [
              18,
              52
            ]
          }
        ]
      },
      {
        "note": "4 looks for 3 at the rim.",
        "ball": 3,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            26,
            25
          ],
          "3": [
            17,
            52
          ],
          "4": [
            42,
            25
          ],
          "5": [
            22,
            68
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              42,
              25
            ],
            "to": [
              17,
              52
            ]
          }
        ]
      },
      {
        "note": "If rim is covered, 2 screens down for 5.",
        "ball": 3,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            28,
            30
          ],
          "3": [
            17,
            52
          ],
          "4": [
            42,
            25
          ],
          "5": [
            35,
            62
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              28,
              30
            ]
          },
          {
            "type": "cut",
            "from": [
              22,
              68
            ],
            "to": [
              35,
              62
            ]
          }
        ]
      },
      {
        "note": "3 kicks to 5 for the shot.",
        "ball": 5,
        "players": {
          "1": [
            42,
            50
          ],
          "2": [
            28,
            30
          ],
          "3": [
            17,
            52
          ],
          "4": [
            42,
            25
          ],
          "5": [
            35,
            62
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              17,
              52
            ],
            "to": [
              35,
              62
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Backdoor Cut",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "Backdoor",
      "Pressure Release"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Sell the catch, cut behind the defender, and finish before help rotates.",
    "annotations": [],
    "purpose": "Simple pressure-release action when the defender overplays the passing lane.",
    "steps": [
      {
        "note": "2 is denied on the wing. 1 has the ball.",
        "ball": 1,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            28,
            28
          ],
          "3": [
            28,
            72
          ],
          "4": [
            45,
            25
          ],
          "5": [
            45,
            75
          ]
        },
        "actions": []
      },
      {
        "note": "2 plants high and cuts backdoor.",
        "ball": 1,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            20,
            42
          ],
          "3": [
            28,
            72
          ],
          "4": [
            45,
            25
          ],
          "5": [
            45,
            75
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              28,
              28
            ],
            "to": [
              20,
              42
            ]
          }
        ]
      },
      {
        "note": "1 leads 2 with the pass.",
        "ball": 2,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            17,
            46
          ],
          "3": [
            28,
            72
          ],
          "4": [
            45,
            25
          ],
          "5": [
            45,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              40,
              50
            ],
            "to": [
              17,
              46
            ]
          },
          {
            "type": "cut",
            "from": [
              20,
              42
            ],
            "to": [
              17,
              46
            ]
          }
        ]
      },
      {
        "note": "2 finishes or jumps stops at the rim.",
        "ball": 2,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            14,
            50
          ],
          "3": [
            28,
            72
          ],
          "4": [
            45,
            25
          ],
          "5": [
            45,
            75
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              17,
              46
            ],
            "to": [
              14,
              50
            ]
          }
        ]
      },
      {
        "note": "If help comes, 2 can kick to 3 in opposite corner.",
        "ball": 3,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            14,
            50
          ],
          "3": [
            24,
            78
          ],
          "4": [
            45,
            25
          ],
          "5": [
            45,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              14,
              50
            ],
            "to": [
              24,
              78
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Dribble Handoff",
    "category": "Half Court",
    "group": "Offense",
    "tags": [
      "DHO",
      "Handoff",
      "Motion"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Receiver waits, curls tight, and turns the corner. Corner shooter is the second read.",
    "annotations": [],
    "purpose": "Teaches timing and spacing for a simple dribble handoff action.",
    "steps": [
      {
        "note": "1 starts with ball. 2 is on the wing.",
        "ball": 1,
        "players": {
          "1": [
            40,
            50
          ],
          "2": [
            25,
            28
          ],
          "3": [
            25,
            76
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": []
      },
      {
        "note": "1 dribbles toward 2 for handoff.",
        "ball": 1,
        "players": {
          "1": [
            30,
            34
          ],
          "2": [
            25,
            28
          ],
          "3": [
            25,
            76
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              40,
              50
            ],
            "to": [
              30,
              34
            ]
          }
        ]
      },
      {
        "note": "2 curls around 1 and receives the handoff.",
        "ball": 2,
        "players": {
          "1": [
            30,
            34
          ],
          "2": [
            24,
            40
          ],
          "3": [
            25,
            76
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              30,
              34
            ],
            "to": [
              24,
              40
            ]
          },
          {
            "type": "cut",
            "from": [
              25,
              28
            ],
            "to": [
              24,
              40
            ]
          }
        ]
      },
      {
        "note": "2 turns the corner toward the lane.",
        "ball": 2,
        "players": {
          "1": [
            31,
            34
          ],
          "2": [
            18,
            48
          ],
          "3": [
            25,
            76
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              24,
              40
            ],
            "to": [
              18,
              48
            ]
          }
        ]
      },
      {
        "note": "Help steps up. 2 kicks to 3.",
        "ball": 3,
        "players": {
          "1": [
            31,
            34
          ],
          "2": [
            18,
            48
          ],
          "3": [
            25,
            76
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              18,
              48
            ],
            "to": [
              25,
              76
            ]
          }
        ]
      },
      {
        "note": "3 catches for the shot.",
        "ball": 3,
        "players": {
          "1": [
            31,
            34
          ],
          "2": [
            18,
            48
          ],
          "3": [
            22,
            80
          ],
          "4": [
            44,
            25
          ],
          "5": [
            44,
            75
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              25,
              76
            ],
            "to": [
              22,
              80
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Box BLOB",
    "category": "BLOB",
    "group": "Offense",
    "tags": [
      "Baseline",
      "Box",
      "Inbound"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "First look is cutter at rim. Second look is safety. Inbounder steps in after pass.",
    "annotations": [],
    "purpose": "Baseline out-of-bounds box set with a screen, rim cut, and safety outlet.",
    "steps": [
      {
        "note": "Box set under left basket. 3 inbounds.",
        "ball": 3,
        "players": {
          "1": [
            28,
            40
          ],
          "2": [
            28,
            60
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            40
          ],
          "5": [
            18,
            60
          ]
        },
        "actions": []
      },
      {
        "note": "5 screens for 4.",
        "ball": 3,
        "players": {
          "1": [
            28,
            40
          ],
          "2": [
            28,
            60
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            40
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              20,
              55
            ]
          }
        ]
      },
      {
        "note": "4 curls to the rim.",
        "ball": 3,
        "players": {
          "1": [
            28,
            40
          ],
          "2": [
            28,
            60
          ],
          "3": [
            6,
            50
          ],
          "4": [
            14,
            50
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              18,
              40
            ],
            "to": [
              14,
              50
            ]
          }
        ]
      },
      {
        "note": "3 passes to 4 for the layup.",
        "ball": 4,
        "players": {
          "1": [
            28,
            40
          ],
          "2": [
            28,
            60
          ],
          "3": [
            6,
            50
          ],
          "4": [
            13,
            50
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              6,
              50
            ],
            "to": [
              13,
              50
            ]
          }
        ]
      },
      {
        "note": "If covered, 1 pops as safety and 4 can kick out.",
        "ball": 1,
        "players": {
          "1": [
            34,
            34
          ],
          "2": [
            28,
            60
          ],
          "3": [
            12,
            48
          ],
          "4": [
            13,
            50
          ],
          "5": [
            20,
            55
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              28,
              40
            ],
            "to": [
              34,
              34
            ]
          },
          {
            "type": "cut",
            "from": [
              6,
              50
            ],
            "to": [
              12,
              48
            ]
          },
          {
            "type": "pass",
            "from": [
              13,
              50
            ],
            "to": [
              34,
              34
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Stack BLOB",
    "category": "BLOB",
    "group": "Offense",
    "tags": [
      "Baseline",
      "Stack",
      "Inbound"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Cutters separate at different angles. Inbounder reads first open jersey. Safety flashes back if covered.",
    "annotations": [],
    "purpose": "Baseline stack action with cutters breaking in opposite directions.",
    "steps": [
      {
        "note": "Players stacked on lane line. 3 inbounds.",
        "ball": 3,
        "players": {
          "1": [
            22,
            48
          ],
          "2": [
            20,
            48
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            48
          ],
          "5": [
            16,
            48
          ]
        },
        "actions": []
      },
      {
        "note": "1 pops high as safety.",
        "ball": 3,
        "players": {
          "1": [
            34,
            38
          ],
          "2": [
            20,
            48
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            48
          ],
          "5": [
            16,
            48
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              22,
              48
            ],
            "to": [
              34,
              38
            ]
          }
        ]
      },
      {
        "note": "2 curls to corner. 5 dives to rim.",
        "ball": 3,
        "players": {
          "1": [
            34,
            38
          ],
          "2": [
            22,
            76
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            48
          ],
          "5": [
            14,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              20,
              48
            ],
            "to": [
              22,
              76
            ]
          },
          {
            "type": "cut",
            "from": [
              16,
              48
            ],
            "to": [
              14,
              50
            ]
          }
        ]
      },
      {
        "note": "3 hits 5 at rim if open.",
        "ball": 5,
        "players": {
          "1": [
            34,
            38
          ],
          "2": [
            22,
            76
          ],
          "3": [
            6,
            50
          ],
          "4": [
            18,
            48
          ],
          "5": [
            13,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              6,
              50
            ],
            "to": [
              13,
              50
            ]
          }
        ]
      },
      {
        "note": "If 5 is covered, 5 passes out to 2 for corner shot.",
        "ball": 2,
        "players": {
          "1": [
            34,
            38
          ],
          "2": [
            22,
            80
          ],
          "3": [
            10,
            52
          ],
          "4": [
            18,
            48
          ],
          "5": [
            13,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              13,
              50
            ],
            "to": [
              22,
              80
            ]
          },
          {
            "type": "cut",
            "from": [
              6,
              50
            ],
            "to": [
              10,
              52
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Sideline Stack SLOB",
    "category": "SLOB",
    "group": "Offense",
    "tags": [
      "Sideline",
      "Stack",
      "Inbound"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Create separation from the stack. One player to ball, one player to rim. Always keep a safety outlet.",
    "annotations": [],
    "purpose": "Sideline out-of-bounds stack with a safety, rim cut, and corner look.",
    "steps": [
      {
        "note": "Stack near sideline. 3 inbounds.",
        "ball": 3,
        "players": {
          "1": [
            38,
            32
          ],
          "2": [
            37,
            38
          ],
          "3": [
            50,
            18
          ],
          "4": [
            36,
            44
          ],
          "5": [
            35,
            50
          ]
        },
        "actions": []
      },
      {
        "note": "1 pops to safety.",
        "ball": 3,
        "players": {
          "1": [
            48,
            35
          ],
          "2": [
            37,
            38
          ],
          "3": [
            50,
            18
          ],
          "4": [
            36,
            44
          ],
          "5": [
            35,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              38,
              32
            ],
            "to": [
              48,
              35
            ]
          }
        ]
      },
      {
        "note": "5 cuts to the rim. 2 fades to corner.",
        "ball": 3,
        "players": {
          "1": [
            48,
            35
          ],
          "2": [
            22,
            24
          ],
          "3": [
            50,
            18
          ],
          "4": [
            36,
            44
          ],
          "5": [
            18,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              35,
              50
            ],
            "to": [
              18,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              37,
              38
            ],
            "to": [
              22,
              24
            ]
          }
        ]
      },
      {
        "note": "3 passes to 5 for layup if open.",
        "ball": 5,
        "players": {
          "1": [
            48,
            35
          ],
          "2": [
            22,
            24
          ],
          "3": [
            50,
            18
          ],
          "4": [
            36,
            44
          ],
          "5": [
            16,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              50,
              18
            ],
            "to": [
              16,
              50
            ]
          }
        ]
      },
      {
        "note": "If help covers the rim, 5 kicks to 2 for shot.",
        "ball": 2,
        "players": {
          "1": [
            48,
            35
          ],
          "2": [
            20,
            22
          ],
          "3": [
            50,
            18
          ],
          "4": [
            36,
            44
          ],
          "5": [
            16,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              16,
              50
            ],
            "to": [
              20,
              22
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Secondary Break",
    "category": "Fast Break",
    "group": "Offense",
    "tags": [
      "Transition",
      "Drag Screen",
      "Early Offense"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Wings sprint wide. 5 trails into drag screen. Attack before defense loads up.",
    "annotations": [],
    "purpose": "Early offense after transition when the defense is not fully set.",
    "steps": [
      {
        "note": "1 pushes middle. Wings are wide. 5 trails.",
        "ball": 1,
        "players": {
          "1": [
            58,
            50
          ],
          "2": [
            48,
            22
          ],
          "3": [
            48,
            78
          ],
          "4": [
            66,
            65
          ],
          "5": [
            72,
            48
          ]
        },
        "actions": []
      },
      {
        "note": "2 and 3 sprint wide. 5 trails into drag screen.",
        "ball": 1,
        "players": {
          "1": [
            50,
            50
          ],
          "2": [
            32,
            22
          ],
          "3": [
            32,
            78
          ],
          "4": [
            56,
            65
          ],
          "5": [
            54,
            52
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              58,
              50
            ],
            "to": [
              50,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              48,
              22
            ],
            "to": [
              32,
              22
            ]
          },
          {
            "type": "cut",
            "from": [
              48,
              78
            ],
            "to": [
              32,
              78
            ]
          },
          {
            "type": "cut",
            "from": [
              72,
              48
            ],
            "to": [
              54,
              52
            ]
          }
        ]
      },
      {
        "note": "1 uses drag screen from 5.",
        "ball": 1,
        "players": {
          "1": [
            36,
            43
          ],
          "2": [
            25,
            22
          ],
          "3": [
            30,
            78
          ],
          "4": [
            50,
            65
          ],
          "5": [
            50,
            52
          ]
        },
        "actions": [
          {
            "type": "screen",
            "at": [
              50,
              52
            ]
          },
          {
            "type": "dribble",
            "from": [
              50,
              50
            ],
            "to": [
              36,
              43
            ]
          }
        ]
      },
      {
        "note": "5 rolls. 3 drifts to corner.",
        "ball": 1,
        "players": {
          "1": [
            28,
            43
          ],
          "2": [
            25,
            22
          ],
          "3": [
            22,
            82
          ],
          "4": [
            44,
            65
          ],
          "5": [
            19,
            54
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              50,
              52
            ],
            "to": [
              19,
              54
            ]
          },
          {
            "type": "cut",
            "from": [
              30,
              78
            ],
            "to": [
              22,
              82
            ]
          }
        ]
      },
      {
        "note": "1 passes to 5 at the rim.",
        "ball": 5,
        "players": {
          "1": [
            28,
            43
          ],
          "2": [
            25,
            22
          ],
          "3": [
            22,
            82
          ],
          "4": [
            44,
            65
          ],
          "5": [
            16,
            54
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              28,
              43
            ],
            "to": [
              16,
              54
            ]
          }
        ]
      },
      {
        "note": "If roller is covered, 5 kicks to 3 corner for shot.",
        "ball": 3,
        "players": {
          "1": [
            28,
            43
          ],
          "2": [
            25,
            22
          ],
          "3": [
            22,
            82
          ],
          "4": [
            44,
            65
          ],
          "5": [
            16,
            54
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              16,
              54
            ],
            "to": [
              22,
              82
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "1-2-1-1 Press Break",
    "category": "Press Break",
    "group": "Offense",
    "tags": [
      "Press Break",
      "Diamond",
      "Middle Flash"
    ],
    "labelMode": "numbers",
    "labels": {
      "1": "1",
      "2": "2",
      "3": "3",
      "4": "4",
      "5": "5"
    },
    "coachNotes": "Do not dribble into traps. Flash middle. Reverse or attack once the ball enters the middle.",
    "annotations": [],
    "purpose": "Diamond press break with a middle flash and sideline release.",
    "steps": [
      {
        "note": "5 inbounds. 1 middle, 2 and 3 outlets, 4 deep.",
        "ball": 5,
        "players": {
          "1": [
            72,
            50
          ],
          "2": [
            82,
            32
          ],
          "3": [
            82,
            68
          ],
          "4": [
            54,
            50
          ],
          "5": [
            94,
            50
          ]
        },
        "actions": []
      },
      {
        "note": "2 cuts back toward the ball.",
        "ball": 5,
        "players": {
          "1": [
            72,
            50
          ],
          "2": [
            84,
            42
          ],
          "3": [
            82,
            68
          ],
          "4": [
            54,
            50
          ],
          "5": [
            94,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              82,
              32
            ],
            "to": [
              84,
              42
            ]
          }
        ]
      },
      {
        "note": "5 passes to 2. 1 flashes middle.",
        "ball": 2,
        "players": {
          "1": [
            64,
            50
          ],
          "2": [
            84,
            42
          ],
          "3": [
            82,
            68
          ],
          "4": [
            54,
            50
          ],
          "5": [
            94,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              94,
              50
            ],
            "to": [
              84,
              42
            ]
          },
          {
            "type": "cut",
            "from": [
              72,
              50
            ],
            "to": [
              64,
              50
            ]
          }
        ]
      },
      {
        "note": "2 passes to 1 in the middle.",
        "ball": 1,
        "players": {
          "1": [
            60,
            50
          ],
          "2": [
            84,
            42
          ],
          "3": [
            82,
            68
          ],
          "4": [
            54,
            50
          ],
          "5": [
            94,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              84,
              42
            ],
            "to": [
              60,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              64,
              50
            ],
            "to": [
              60,
              50
            ]
          }
        ]
      },
      {
        "note": "4 releases up court. 3 fills sideline.",
        "ball": 1,
        "players": {
          "1": [
            56,
            50
          ],
          "2": [
            78,
            42
          ],
          "3": [
            68,
            72
          ],
          "4": [
            40,
            56
          ],
          "5": [
            90,
            50
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              54,
              50
            ],
            "to": [
              40,
              56
            ]
          },
          {
            "type": "cut",
            "from": [
              82,
              68
            ],
            "to": [
              68,
              72
            ]
          },
          {
            "type": "dribble",
            "from": [
              60,
              50
            ],
            "to": [
              56,
              50
            ]
          }
        ]
      },
      {
        "note": "1 passes ahead to 4.",
        "ball": 4,
        "players": {
          "1": [
            56,
            50
          ],
          "2": [
            78,
            42
          ],
          "3": [
            68,
            72
          ],
          "4": [
            36,
            56
          ],
          "5": [
            90,
            50
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              56,
              50
            ],
            "to": [
              36,
              56
            ]
          }
        ]
      },
      {
        "note": "4 attacks for layup or hits 3 if help rotates.",
        "ball": 4,
        "players": {
          "1": [
            56,
            50
          ],
          "2": [
            78,
            42
          ],
          "3": [
            28,
            78
          ],
          "4": [
            15,
            55
          ],
          "5": [
            90,
            50
          ]
        },
        "actions": [
          {
            "type": "dribble",
            "from": [
              36,
              56
            ],
            "to": [
              15,
              55
            ]
          },
          {
            "type": "cut",
            "from": [
              68,
              72
            ],
            "to": [
              28,
              78
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Shell Drill",
    "category": "Man Defense",
    "group": "Defense",
    "tags": [
      "Defense",
      "Shell",
      "Help"
    ],
    "labelMode": "positions",
    "labels": {
      "1": "X1",
      "2": "X2",
      "3": "X3",
      "4": "X4",
      "5": "X5"
    },
    "coachNotes": "One pass away: deny or gap. Two passes away: help. Move on the flight of the ball.",
    "annotations": [],
    "purpose": "Defensive teaching drill for ball-you-man, help position, and closeouts.",
    "steps": [
      {
        "note": "Defenders start matched to offensive spacing.",
        "ball": 1,
        "players": {
          "1": [
            32,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            42,
            30
          ],
          "5": [
            42,
            70
          ]
        },
        "actions": []
      },
      {
        "note": "Ball moves to wing. Defense shifts toward ball.",
        "ball": 2,
        "players": {
          "1": [
            31,
            46
          ],
          "2": [
            24,
            32
          ],
          "3": [
            30,
            62
          ],
          "4": [
            39,
            34
          ],
          "5": [
            38,
            65
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              32,
              50
            ],
            "to": [
              25,
              30
            ]
          },
          {
            "type": "cut",
            "from": [
              25,
              70
            ],
            "to": [
              30,
              62
            ]
          },
          {
            "type": "cut",
            "from": [
              42,
              70
            ],
            "to": [
              38,
              65
            ]
          }
        ]
      },
      {
        "note": "Skip pass. Weak side closes out.",
        "ball": 3,
        "players": {
          "1": [
            31,
            54
          ],
          "2": [
            30,
            38
          ],
          "3": [
            24,
            68
          ],
          "4": [
            39,
            36
          ],
          "5": [
            36,
            62
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              25,
              30
            ],
            "to": [
              25,
              70
            ]
          },
          {
            "type": "cut",
            "from": [
              30,
              62
            ],
            "to": [
              24,
              68
            ]
          },
          {
            "type": "cut",
            "from": [
              24,
              32
            ],
            "to": [
              30,
              38
            ]
          }
        ]
      },
      {
        "note": "Ball goes corner. Low help rotates.",
        "ball": 3,
        "players": {
          "1": [
            32,
            56
          ],
          "2": [
            32,
            40
          ],
          "3": [
            20,
            82
          ],
          "4": [
            39,
            38
          ],
          "5": [
            22,
            66
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              24,
              68
            ],
            "to": [
              20,
              82
            ]
          },
          {
            "type": "cut",
            "from": [
              36,
              62
            ],
            "to": [
              22,
              66
            ]
          }
        ]
      },
      {
        "note": "Defense forces kick-out to top.",
        "ball": 1,
        "players": {
          "1": [
            32,
            50
          ],
          "2": [
            27,
            34
          ],
          "3": [
            28,
            70
          ],
          "4": [
            42,
            30
          ],
          "5": [
            42,
            70
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              20,
              82
            ],
            "to": [
              32,
              50
            ]
          },
          {
            "type": "cut",
            "from": [
              20,
              82
            ],
            "to": [
              28,
              70
            ]
          },
          {
            "type": "cut",
            "from": [
              22,
              66
            ],
            "to": [
              42,
              70
            ]
          }
        ]
      },
      {
        "note": "Closeout is complete. Defense resets in shell.",
        "ball": 1,
        "players": {
          "1": [
            32,
            50
          ],
          "2": [
            25,
            30
          ],
          "3": [
            25,
            70
          ],
          "4": [
            42,
            30
          ],
          "5": [
            42,
            70
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              27,
              34
            ],
            "to": [
              25,
              30
            ]
          },
          {
            "type": "cut",
            "from": [
              28,
              70
            ],
            "to": [
              25,
              70
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "2-3 Zone Slides",
    "category": "Zone Defense",
    "group": "Defense",
    "tags": [
      "Defense",
      "2-3 Zone",
      "Rotation"
    ],
    "labelMode": "positions",
    "labels": {
      "1": "X1",
      "2": "X2",
      "3": "X3",
      "4": "X4",
      "5": "X5"
    },
    "coachNotes": "Top two protect elbows and ball. Bottom three move as a unit. Corner pass triggers wing/bottom rotation.",
    "annotations": [],
    "purpose": "Basic 2-3 zone rotations against ball movement.",
    "steps": [
      {
        "note": "2-3 zone starting shape.",
        "ball": 1,
        "players": {
          "1": [
            30,
            42
          ],
          "2": [
            30,
            58
          ],
          "3": [
            18,
            28
          ],
          "4": [
            18,
            50
          ],
          "5": [
            18,
            72
          ]
        },
        "actions": []
      },
      {
        "note": "Ball goes to right wing. Top and bottom shift.",
        "ball": 2,
        "players": {
          "1": [
            32,
            52
          ],
          "2": [
            24,
            70
          ],
          "3": [
            18,
            28
          ],
          "4": [
            18,
            56
          ],
          "5": [
            16,
            76
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              40,
              50
            ],
            "to": [
              26,
              74
            ]
          },
          {
            "type": "cut",
            "from": [
              30,
              58
            ],
            "to": [
              24,
              70
            ]
          },
          {
            "type": "cut",
            "from": [
              18,
              72
            ],
            "to": [
              16,
              76
            ]
          },
          {
            "type": "cut",
            "from": [
              18,
              50
            ],
            "to": [
              18,
              56
            ]
          }
        ]
      },
      {
        "note": "Ball to corner. Bottom defender closes out, middle drops.",
        "ball": 3,
        "players": {
          "1": [
            34,
            54
          ],
          "2": [
            23,
            68
          ],
          "3": [
            18,
            28
          ],
          "4": [
            17,
            60
          ],
          "5": [
            14,
            82
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              26,
              74
            ],
            "to": [
              18,
              84
            ]
          },
          {
            "type": "cut",
            "from": [
              16,
              76
            ],
            "to": [
              14,
              82
            ]
          },
          {
            "type": "cut",
            "from": [
              18,
              56
            ],
            "to": [
              17,
              60
            ]
          }
        ]
      },
      {
        "note": "Corner passes back to wing. Zone bumps back up.",
        "ball": 2,
        "players": {
          "1": [
            32,
            52
          ],
          "2": [
            24,
            70
          ],
          "3": [
            18,
            28
          ],
          "4": [
            18,
            56
          ],
          "5": [
            16,
            76
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              18,
              84
            ],
            "to": [
              26,
              74
            ]
          },
          {
            "type": "cut",
            "from": [
              14,
              82
            ],
            "to": [
              16,
              76
            ]
          },
          {
            "type": "cut",
            "from": [
              17,
              60
            ],
            "to": [
              18,
              56
            ]
          }
        ]
      },
      {
        "note": "Skip pass. Zone shifts together to opposite side.",
        "ball": 4,
        "players": {
          "1": [
            24,
            30
          ],
          "2": [
            32,
            46
          ],
          "3": [
            16,
            24
          ],
          "4": [
            18,
            44
          ],
          "5": [
            20,
            68
          ]
        },
        "actions": [
          {
            "type": "pass",
            "from": [
              26,
              74
            ],
            "to": [
              24,
              24
            ]
          },
          {
            "type": "cut",
            "from": [
              34,
              54
            ],
            "to": [
              32,
              46
            ]
          },
          {
            "type": "cut",
            "from": [
              23,
              68
            ],
            "to": [
              24,
              30
            ]
          },
          {
            "type": "cut",
            "from": [
              16,
              76
            ],
            "to": [
              20,
              68
            ]
          }
        ]
      },
      {
        "note": "Top defender closes to shooter. Bottom protects block.",
        "ball": 4,
        "players": {
          "1": [
            22,
            28
          ],
          "2": [
            32,
            46
          ],
          "3": [
            14,
            24
          ],
          "4": [
            18,
            44
          ],
          "5": [
            20,
            68
          ]
        },
        "actions": [
          {
            "type": "cut",
            "from": [
              24,
              30
            ],
            "to": [
              22,
              28
            ]
          },
          {
            "type": "cut",
            "from": [
              16,
              24
            ],
            "to": [
              14,
              24
            ]
          }
        ]
      }
    ]
  }
];
