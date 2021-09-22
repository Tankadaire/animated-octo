function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngleleft = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second
	var rotateAngleright = Math.PI / 2 * delta * -(2);

    if (keyboard.pressed("left"))
        player1.turnLeft(rotateAngleleft);
    if (keyboard.pressed("right"))
        player1.turnRight(rotateAngleright);
    if (keyboard.pressed("up"))
        player1.accelerate(moveDistance);
    if (keyboard.pressed("down"))
        player1.decelerate(moveDistance);

    player1.move();
    controls.update();
}