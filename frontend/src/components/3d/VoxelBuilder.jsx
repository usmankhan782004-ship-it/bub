import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

const VoxelBuilder = ({ matrix, colorPalette, size = 0.5, ...props }) => {
    const meshRef = useRef();

    // 1. Flatten the 3D matrix into a list of {x,y,z, colorIndex}
    const voxels = useMemo(() => {
        const data = [];
        matrix.forEach((layer, y) => {
            layer.forEach((row, z) => {
                row.forEach((col, x) => {
                    if (col !== 0) {
                        data.push({ x, y, z, color: col });
                    }
                });
            });
        });
        return data;
    }, [matrix]);

    // 2. Center the model
    const offset = useMemo(() => {
        if (matrix.length === 0) return [0, 0, 0];
        const height = matrix.length;
        const depth = matrix[0].length;
        const width = matrix[0][0].length;
        return [-(width * size) / 2, -(height * size) / 2, -(depth * size) / 2];
    }, [matrix, size]);

    // 3. Update Instances
    useLayoutEffect(() => {
        if (!meshRef.current) return;
        const tempObject = new THREE.Object3D();

        voxels.forEach((voxel, i) => {
            const { x, y, z, color } = voxel;

            tempObject.position.set(
                x * size + offset[0],
                y * size + offset[1],
                z * size + offset[2]
            );

            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            // Handle Color
            if (colorPalette && colorPalette[color]) {
                const c = new THREE.Color(colorPalette[color]);
                meshRef.current.setColorAt(i, c);
            }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    }, [voxels, size, offset, colorPalette]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, voxels.length]}
            {...props}
        >
            <boxGeometry args={[size, size, size]} />
            {props.children ? props.children : <meshStandardMaterial />}
        </instancedMesh>
    );
};

export default VoxelBuilder;
