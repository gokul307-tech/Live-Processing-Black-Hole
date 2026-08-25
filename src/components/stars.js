import * as THREE from "three";


export function createStars() {

    const starCount = 9000;


    const positions =
        new Float32Array(
            starCount * 3
        );


    const colors =
        new Float32Array(
            starCount * 3
        );


    const sizes =
        new Float32Array(
            starCount
        );


    for (
        let i = 0;
        i < starCount;
        i++
    ) {

        const index = i * 3;


        /*
         * Large spherical star field.
         */

        const radius =
            THREE.MathUtils.randFloat(
                18,
                80
            );


        const theta =
            Math.random() *
            Math.PI * 2;


        const phi =
            Math.acos(
                THREE.MathUtils.randFloat(
                    -1,
                    1
                )
            );


        positions[index] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        positions[index + 1] =
            radius *
            Math.cos(phi);


        positions[index + 2] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);


        /*
         * Star temperature.
         */

        const type =
            Math.random();


        if (type < 0.72) {

            /*
             * White stars.
             */

            colors[index] = 1;

            colors[index + 1] = 1;

            colors[index + 2] = 1;

        }

        else if (type < 0.88) {

            /*
             * Blue stars.
             */

            colors[index] = 0.72;

            colors[index + 1] = 0.84;

            colors[index + 2] = 1;

        }

        else {

            /*
             * Warm stars.
             */

            colors[index] = 1;

            colors[index + 1] = 0.72;

            colors[index + 2] = 0.48;

        }


        /*
         * Mostly tiny stars.
         */

        const r =
            Math.random();


        if (r < 0.94) {

            sizes[i] =
                THREE.MathUtils.randFloat(
                    0.3,
                    1.0
                );

        }
        else if (r < 0.99) {

            sizes[i] =
                THREE.MathUtils.randFloat(
                    1.0,
                    2.0
                );

        }
        else {

            sizes[i] =
                THREE.MathUtils.randFloat(
                    2.0,
                    3.8
                );

        }

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


    geometry.setAttribute(
        "size",
        new THREE.BufferAttribute(
            sizes,
            1
        )
    );


    const material =
        new THREE.ShaderMaterial({

            transparent: true,

            depthWrite: false,

            vertexColors: true,

            blending:
                THREE.AdditiveBlending,


            vertexShader: `

                attribute float size;

                varying vec3 vColor;

                void main() {

                    vColor = color;

                    vec4 mvPosition =
                        modelViewMatrix *
                        vec4(position, 1.0);

                    gl_PointSize =
                        size *
                        (
                            250.0 /
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

                    vec2 uv =
                        gl_PointCoord -
                        vec2(0.5);

                    float d =
                        length(uv);

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

                    vec3 color =
                        vColor *
                        (
                            glow * 0.65 +
                            core * 1.5
                        );

                    gl_FragColor =
                        vec4(
                            color,
                            glow
                        );

                }

            `

        });


    return new THREE.Points(
        geometry,
        material
    );

}