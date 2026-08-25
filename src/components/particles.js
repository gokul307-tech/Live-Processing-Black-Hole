import * as THREE from "three";


export function createDiskParticles() {

    const count = 12000;


    const positions =
        new Float32Array(
            count * 3
        );


    const colors =
        new Float32Array(
            count * 3
        );


    const data = [];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const i3 = i * 3;


        /*
         * More particles near the
         * black hole.
         */

        const random =
            Math.random();


        const radius =
            1.15 +
            Math.pow(
                random,
                0.65
            ) * 3.4;


        const angle =
            Math.random() *
            Math.PI *
            2;


        /*
         * Flattened disk.
         */

        const height =
            (
                Math.random() -
                0.5
            ) *
            0.08 *
            (
                radius / 2
            );


        positions[i3] =
            Math.cos(angle) *
            radius;


        positions[i3 + 1] =
            height;


        positions[i3 + 2] =
            Math.sin(angle) *
            radius;


        /*
         * Temperature based on
         * distance from the hole.
         */

        const temperature =
            THREE.MathUtils.clamp(
                1 -
                (
                    radius - 1.15
                ) /
                3.4,
                0,
                1
            );


        if (
            temperature > 0.72
        ) {

            /*
             * Very hot inner material.
             */

            colors[i3] = 1.0;
            colors[i3 + 1] = 0.95;
            colors[i3 + 2] = 0.82;

        }

        else if (
            temperature > 0.42
        ) {

            colors[i3] = 1.0;
            colors[i3 + 1] = 0.42;
            colors[i3 + 2] = 0.08;

        }

        else {

            colors[i3] = 0.72;
            colors[i3 + 1] = 0.10;
            colors[i3 + 2] = 0.025;

        }


        data.push({

            radius,

            angle,

            speed:
                0.0015 /
                Math.pow(
                    radius,
                    0.7
                ),

            phase:
                Math.random() *
                Math.PI * 2

        });

    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );


    const material =
        new THREE.ShaderMaterial({

            transparent: true,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending,

            vertexColors: true,

            vertexShader: `

                varying vec3 vColor;

                void main() {

                    vColor = color;

                    vec4 mvPosition =
                        modelViewMatrix *
                        vec4(
                            position,
                            1.0
                        );

                    gl_PointSize =
                        2.2 *
                        (
                            300.0 /
                            -mvPosition.z
                        );

                    gl_Position =
                        projectionMatrix *
                        mvPosition;

                }

            `,

            fragmentShader: `

                varying vec3 vColor;

                void main() {

                    vec2 p =
                        gl_PointCoord -
                        vec2(0.5);

                    float d =
                        length(p);

                    float glow =
                        smoothstep(
                            0.5,
                            0.0,
                            d
                        );

                    float core =
                        smoothstep(
                            0.12,
                            0.0,
                            d
                        );

                    gl_FragColor =
                        vec4(
                            vColor *
                            (
                                glow +
                                core * 2.0
                            ),
                            glow
                        );

                }

            `

        });


    const particles =
        new THREE.Points(
            geometry,
            material
        );


    return {

        particles,

        geometry,

        data

    };

}