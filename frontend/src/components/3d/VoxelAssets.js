export const HEART_GRID = [
    [
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
    ]
];

// Extrude Heart to thickness
export const HEART_VOXEL = [
    HEART_GRID[0], // Layer 1
    HEART_GRID[0], // Layer 2 (Thicker)
];


export const STRAWBERRY_VOXEL = [
    // Bottom tip
    [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    // Middle
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    // Top
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // Leaves (Green = 2)
    [
        [0, 2, 0],
        [2, 2, 2],
        [0, 2, 0]
    ]
];

export const STAR_VOXEL = [
    [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0]
    ]
];


export const CAT_VOXEL = [
    // Head only for simplicity
    [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1], // Eyes gap
        [1, 1, 0, 1, 1]  // Mouth gap
    ],
    [
        // Ears (Layer 2)
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

export const BLACK_CAT_VOXEL = [
    // Body/Head Base
    [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 2, 1, 2, 1], // Eyes (2)
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0]
    ],
    // Ears
    [
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
];

// 5x5 Grid for Play Icon (Triangle)
const PLAY_GRID = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
];

// 5x5 Grid for Pause Icon (Two Bars)
const PAUSE_GRID = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
];

export const PLAY_VOXEL = [PLAY_GRID];
export const PAUSE_VOXEL = [PAUSE_GRID];

// ---- Cute additions ----

// Adorable bunny (5 layers tall)
export const BUNNY_VOXEL = [
    // Body base
    [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
    ],
    // Body top
    [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
    ],
    // Head
    [
        [0, 1, 1, 1, 0],
        [1, 2, 1, 2, 1],  // 2 = eyes (pink)
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
    ],
    // Ears
    [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // Ear tips
    [
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
];

// Tulip flower
export const FLOWER_VOXEL = [
    // Stem base
    [
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
    ],
    // Stem
    [
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
    ],
    // Bloom
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    // Petals top
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
];

// Crescent moon
export const MOON_VOXEL = [
    [
        [0, 0, 1, 1, 1],
        [0, 1, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
    ],
];

export const PALETTES = {
    heart: { 1: '#ff69b4' }, // Pink
    strawberry: { 1: '#ffb7c5', 2: '#90ee90' }, // Pink body, Green leaves
    star: { 1: '#ffd700' }, // Gold
    cat: { 1: '#ffffff' }, // White
    blackCat: { 1: '#1a1a1a', 2: '#00ff00' }, // Black body, Bright Green eyes
    controls: { 1: '#ffffff' }, // White for buttons
    bunny: { 1: '#ffffff', 2: '#ffb7c5' }, // White body, Pink eyes
    flower: { 1: '#ff69b4', 2: '#90ee90' }, // Pink petals, Green stem
    moon: { 1: '#ffeaa7' }, // Warm golden
};
