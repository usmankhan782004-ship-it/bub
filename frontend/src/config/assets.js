/*
  Asset Configuration
  -------------------
  Since I cannot access your Google Drive link directly (security restriction),
  I have set this up to use LOCAL assets by default.

  If you want to use Google Drive Direct Links:
  1. Paste the FILE ID for the video in `CHUBBA_VIDEO_ID`.
  2. Paste the FILE IDs for the images in `GALLERY_IMAGE_IDS`.
  3. Set `USE_DRIVE_ASSETS = true`.
*/

const USE_DRIVE_ASSETS = false; // Toggle this to TRUE to use Drive Links

// PASTE YOUR IDS HERE
const DRIVE_IDS = {
    CHUBBA_VIDEO: "REPLACE_WITH_VIDEO_ID",
    GALLERY: [
        "REPLACE_WITH_IMAGE_ID_1",
        "REPLACE_WITH_IMAGE_ID_2",
        "REPLACE_WITH_IMAGE_ID_3",
        "REPLACE_WITH_IMAGE_ID_4",
        "REPLACE_WITH_IMAGE_ID_5"
    ]
};

// ----------------------------------------------------

const getDriveImage = (id) => `https://drive.google.com/uc?export=view&id=${id}`;
const getDriveVideo = (id) => `https://drive.google.com/uc?export=download&id=${id}`;

export const ASSETS = {
    chubbaVideo: USE_DRIVE_ASSETS
        ? getDriveVideo(DRIVE_IDS.CHUBBA_VIDEO)
        : '/assets/chubba.mp4',

    gallery: USE_DRIVE_ASSETS
        ? DRIVE_IDS.GALLERY.map(id => ({ src: getDriveImage(id), alt: 'Cosmic Memory' }))
        : [
            { src: "/assets/gallery1.jpg", alt: "Memory 1" },
            { src: "/assets/gallery2.jpg", alt: "Memory 2" },
            { src: "/assets/gallery3.jpg", alt: "Memory 3" },
            { src: "/assets/gallery4.jpg", alt: "Memory 4" },
            { src: "/assets/gallery5.jpg", alt: "Memory 5" },
        ]
};
