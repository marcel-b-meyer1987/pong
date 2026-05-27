export function collisionX(circle, rect) {

    let leftBorderCircle = circle.x - circle.size;
    let rightBorderCircle = circle.x + circle.size;
    let topCircle = circle.y - circle.size;
    let bottomCircle = circle.y + circle.size;

    let leftBorderRect = rect.x;
    let rightBorderRect = rect.x + rect.width;
    let topRect = rect.y;
    let bottomRect = rect.y + rect.height;

    // conditions for collision must be added here
    if (
        leftBorderCircle < rightBorderRect &&
        rightBorderCircle > leftBorderRect &&
        topCircle < bottomRect &&
        bottomCircle > topRect
    ) {
        return true;
    }

    return false; // default
}


export function collisionY(circle, rect) {

    let leftBorderCircle = circle.x - circle.size;
    let rightBorderCircle = circle.x + circle.size;
    let topCircle = circle.y - circle.size;
    let bottomCircle = circle.y + circle.size;

    let leftBorderRect = rect.x;
    let rightBorderRect = rect.x + rect.width;
    let topRect = rect.y;
    let bottomRect = rect.y + rect.height;

    // conditions for collision must be added here
    if (
        leftBorderCircle < rightBorderRect &&
        rightBorderCircle > leftBorderRect &&
        topCircle < bottomRect &&
        bottomCircle > topRect
    ) {
        return true;
    }

    return false; // default
}
