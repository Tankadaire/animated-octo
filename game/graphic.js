function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

	var player_spawn = (0, 0);
    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10, player_spawn);
    
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(player_spawn[0], player_spawn[1]), 0);
    scene.add(player1.graphic);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function is_a_spawn_point(x, y,sizeOfTileX, sizeOfTileY,  player_spawn)
{
	inf_x = x - sizeOfTileX;
	supp_x = x + sizeOfTileX;
	
	inf_y = y - sizeOfTileY;
	supp_y = y + sizeOfTileY;
	
	if ( inf_x < player_spawn[0] < supp_x)//&& player_spawn[0] <= supp_x))
	{
		if (inf_y <player_spawn[1] < supp_y) // && player_spawn[1] >= supp_y)
		{
			return true;
		}
	}
	return false;
}

function Ground(color, size_x, size_y, nb_tile, player_spawn)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);

	var flag = true;
    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
			
			if (0x000000 != color || is_a_spawn_point(x, y, sizeOfTileX, sizeOfTileY, player_spawn))
            {
				if (y == 0 && x == 0 && flag)
				{
					tmpGround = new THREE.Mesh(
					new THREE.PlaneGeometry(sizeOfTileX-5, sizeOfTileY-5),
					new THREE.MeshLambertMaterial({color: 0xfd6c9e, transparent: true, opacity: 0.6}));
					//flag = false;
				}
				else
                {
					tmpGround = new THREE.Mesh(
					new THREE.PlaneGeometry(sizeOfTileX-5, sizeOfTileY-5),
					new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                }
				tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
                noGround.push([x, y]);
        }
    }
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, HEIGHT*2, WIDTH*2);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
