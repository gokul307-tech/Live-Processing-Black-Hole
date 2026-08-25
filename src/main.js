import * as THREE from "three";

import "./style.css";

import {
    createStars
} from "./components/stars.js";

import {
    createBlackHole
} from "./components/blackHole.js";


/* ==========================================================
   CONTAINER
========================================================== */

const container =
    document.getElementById(
        "scene"
    );


/* ==========================================================
   SCENE
========================================================== */

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x000000
    );


/* ==========================================================
   CAMERA
========================================================== */

const camera =
    new THREE.PerspectiveCamera(
        42,
        window.innerWidth /
        window.innerHeight,
        0.1,
        200
    );


camera.position.set(
    0,
    0,
    8
);


/* ==========================================================
   RENDERER
========================================================== */

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,

        powerPreference:
            "high-performance"

    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


container.appendChild(
    renderer.domElement
);


/* ==========================================================
   STARS
========================================================== */

const stars =
    createStars();


scene.add(
    stars
);


/* ==========================================================
   BLACK HOLE
========================================================== */

const blackHole =
    createBlackHole();


scene.add(
    blackHole.group
);


/* ==========================================================
   POINTER VALUES
========================================================== */

let targetX = 0;

let targetY = 0;

let currentX = 0;

let currentY = 0;


/* ==========================================================
   COORDINATES
========================================================== */

const xValue =
    document.getElementById(
        "xValue"
    );


const yValue =
    document.getElementById(
        "yValue"
    );


/* ==========================================================
   POINTER
========================================================== */

window.addEventListener(
    "pointermove",
    event => {

        targetX =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        targetY =
            -(
                (
                    event.clientY /
                    window.innerHeight
                ) * 2 - 1
            );

    }
);


/* ==========================================================
   CLOCK
========================================================== */

const clock =
    new THREE.Clock();


/* ==========================================================
   ANIMATION
========================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    /* ======================================================
       SMOOTH CURSOR
    ====================================================== */

    currentX +=
        (
            targetX -
            currentX
        ) * 0.035;


    currentY +=
        (
            targetY -
            currentY
        ) * 0.035;


    /* ======================================================
       CAMERA PARALLAX
    ====================================================== */

    const desiredCameraX =
        currentX * 0.65;


    const desiredCameraY =
        currentY * 0.38;


    camera.position.x +=
        (
            desiredCameraX -
            camera.position.x
        ) * 0.025;


    camera.position.y +=
        (
            desiredCameraY -
            camera.position.y
        ) * 0.025;


    camera.lookAt(
        0.45,
        0,
        0
    );


    /* ======================================================
       BLACK HOLE MOVEMENT
    ====================================================== */

    blackHole.group.rotation.y +=
        (
            currentX * 0.14 -
            blackHole.group.rotation.y
        ) * 0.025;


    blackHole.group.rotation.x +=
        (
            -currentY * 0.08 -
            blackHole.group.rotation.x
        ) * 0.025;


    /* ======================================================
       DISK MOVEMENT
    ====================================================== */

    const diskTargetX =
        THREE.MathUtils.degToRad(
            72 +
            currentY * 7
        );


    const diskTargetZ =
        THREE.MathUtils.degToRad(
            -5 +
            currentX * 5
        );


    blackHole.disk.rotation.x +=
        (
            diskTargetX -
            blackHole.disk.rotation.x
        ) * 0.025;


    blackHole.disk.rotation.z +=
        (
            diskTargetZ -
            blackHole.disk.rotation.z
        ) * 0.025;


    /* ======================================================
       DISK ROTATION
    ====================================================== */

    blackHole.outer.rotation.z +=
        0.0008;


    blackHole.orange.rotation.z -=
        0.0012;


    blackHole.white.rotation.z +=
        0.0016;


    blackHole.thin.rotation.z -=
        0.0005;


    /* ======================================================
       SUBTLE FLOAT
    ====================================================== */

    blackHole.group.position.y =
        Math.sin(
            time * 0.45
        ) * 0.025;


    /* ======================================================
       GLOW
    ====================================================== */

    const glowSize =
        4.2 +
        Math.sin(
            time * 1.3
        ) * 0.08;


    blackHole.glow.scale.set(
        glowSize,
        glowSize,
        1
    );


    /* ======================================================
       STAR PARALLAX
    ====================================================== */

    stars.position.x =
        -currentX * 0.12;


    stars.position.y =
        -currentY * 0.08;


    stars.rotation.y +=
        0.000025;


    /* ======================================================
       COORDINATES
    ====================================================== */

    if (xValue) {

        xValue.textContent =
            String(
                Math.round(
                    currentX * 50
                )
            ).padStart(
                2,
                "0"
            );

    }


    if (yValue) {

        yValue.textContent =
            String(
                Math.round(
                    currentY * 50
                )
            ).padStart(
                2,
                "0"
            );

    }


    /* ======================================================
       RENDER
    ====================================================== */

    renderer.render(
        scene,
        camera
    );

}


/* ==========================================================
   START
========================================================== */

animate();


/* ==========================================================
   RESIZE
========================================================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);