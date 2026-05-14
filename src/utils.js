export function collision(a, b) {
    let leftBorderA = a.x;
    let rightBorderA = a.x + a.width;
    let topA = a.y;
    let bottomA = a.y + a.height;

    let leftBorderB = b.x;
    let rightBorderB = b.x + b.width;
    let topB = b.y;
    let bottomB = b.y + b.height;

    // conditions for collision must be added here

    return false; // default
}
