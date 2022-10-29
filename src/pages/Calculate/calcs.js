export const getDvrByQuantityCameras = (quantityCameras) => {

    if (!quantityCameras || quantityCameras <= 4)
        return { ports: 4, quantity: 1 };
    if (quantityCameras <= 8)
        return { ports: 8, quantity: 1 };
    if (quantityCameras <= 16)
        return { ports: 16, quantity: 1 };

    return { ports: 16, quantity: Math.ceil(quantityCameras / 16) };
}