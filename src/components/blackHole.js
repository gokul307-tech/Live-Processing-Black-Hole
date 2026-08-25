import * as THREE from "three";


/* ==========================================================
   CREATE RADIAL GLOW TEXTURE
========================================================== */

function createGlowTexture() {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width = 512;

    canvas.height = 512;


    const context =
        canvas.getContext("2d");


    const gradient =
        context.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            256
        );


    gradient.addColorStop(
        0,
        "rgba(255,245,220,0.95)"
    );


    gradient.addColorStop(
        0.12,
        "rgba(255,190,100,0.65)"
    );


    gradient.addColorStop(
        0.28,
        "rgba(255,100,30,0.25)"
    );


    gradient.addColorStop(
        0.55,
        "rgba(120,30,10,0.06)"
    );


    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    context.fillStyle =
        gradient;


    context.fillRect(
        0,
        0,
        512,
        512
    );


    return new THREE.CanvasTexture(
        canvas
    );

}


/* ==========================================================
   CREATE BLACK HOLE
========================================================== */

export function createBlackHole() {

    const group =
        new THREE.Group();


    /*
     * Place the black hole
     * to the right.
     */

    group.position.set(
        1.15,
        0,
        0
    );


    /* ======================================================
       BLACK EVENT HORIZON
    ====================================================== */

    const sphereGeometry =
        new THREE.SphereGeometry(
            0.85,
            96,
            96
        );


    const sphereMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x000000

        });


    const blackSphere =
        new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );


    group.add(
        blackSphere
    );


    /* ======================================================
       SOFT GRAVITATIONAL GLOW
    ====================================================== */

    const glowMaterial =
        new THREE.SpriteMaterial({

            map:
                createGlowTexture(),

            transparent: true,

            opacity: 0.52,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });


    const glow =
        new THREE.Sprite(
            glowMaterial
        );


    glow.scale.set(
        4.2,
        4.2,
        1
    );


    group.add(
        glow
    );


    /* ======================================================
       ACCRETION DISK
    ====================================================== */

    const disk =
        new THREE.Group();


    /*
     * Very strong tilt.
     *
     * This makes the disk look
     * like a thin horizontal band.
     */

    disk.rotation.x =
        THREE.MathUtils.degToRad(
            72
        );


    disk.rotation.z =
        THREE.MathUtils.degToRad(
            -5
        );


    group.add(
        disk
    );


    /* ======================================================
       OUTER DISK
    ====================================================== */

    const outerGeometry =
        new THREE.TorusGeometry(
            1.45,
            0.22,
            32,
            256
        );


    const outerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x6b1708,

            transparent: true,

            opacity: 0.45,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const outer =
        new THREE.Mesh(
            outerGeometry,
            outerMaterial
        );


    disk.add(
        outer
    );


    /* ======================================================
       ORANGE DISK
    ====================================================== */

    const orangeGeometry =
        new THREE.TorusGeometry(
            1.25,
            0.105,
            32,
            256
        );


    const orangeMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xff641e,

            transparent: true,

            opacity: 0.75,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const orange =
        new THREE.Mesh(
            orangeGeometry,
            orangeMaterial
        );


    disk.add(
        orange
    );


    /* ======================================================
       HOT WHITE RING
    ====================================================== */

    const whiteGeometry =
        new THREE.TorusGeometry(
            1.04,
            0.055,
            32,
            256
        );


    const whiteMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xffffed,

            transparent: true,

            opacity: 0.95,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const white =
        new THREE.Mesh(
            whiteGeometry,
            whiteMaterial
        );


    disk.add(
        white
    );


    /* ======================================================
       THIN OUTER LIGHT
    ====================================================== */

    const thinGeometry =
        new THREE.TorusGeometry(
            1.82,
            0.018,
            16,
            256
        );


    const thinMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xff8b50,

            transparent: true,

            opacity: 0.22,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const thin =
        new THREE.Mesh(
            thinGeometry,
            thinMaterial
        );


    disk.add(
        thin
    );


    return {

        group,

        sphere: blackSphere,

        glow,

        disk,

        outer,

        orange,

        white,

        thin

    };

}