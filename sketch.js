
var plane, planeImg;
var asteroid, asteroidImg;
var bg;
var missile, missileImg;
var missileGroup, asteroidGroup;

function preload()
{
  //loading all images
    planeImg = loadImage("img/plane.png");
    asteroidImg = loadImage("img/asteroid.png");
    bg = loadImage("img/bg.jpg");
    missileImg = loadImage("img/missile.png");
}


function setup() 
{
  createCanvas(800, 600);

  //creating plane
    plane = createSprite(400, 500, 50, 50);
    plane.addImage(planeImg);
    plane.scale = 0.3;

    asteroidGroup = new Group();
    missileGroup = new Group();

}

function draw() 
{
  background(bg);  

  fill("white");
  textSize(20);
  text("UsE aRrOw KeYs tO MoVe aNd SpAcE kEy To sHoOt!", 150, 20);

  //making plane move according to arrow keys
  if (keyDown(RIGHT_ARROW))
  {
    plane.x = plane.x + 10;
  }

  if (keyDown(LEFT_ARROW))
  {
    plane.x = plane.x - 10;
  }

  //calling asteroid spawning function
  spawnAsteroids();

  if (keyDown("space"))
  {
    createMissile();
  }

  //destroying missile and asteroid if they collide
  if (asteroidGroup.isTouching(missileGroup))
  {
    asteroidGroup.destroyEach();
    missileGroup.destroyEach();
  }


  drawSprites();
}

//function to create asteroids every 60 frames
function spawnAsteroids()
{
    if(frameCount % 60 === 0)
    {          
      asteroid = createSprite(random(50, 550), 10, 30, 30);
      asteroid.addImage(asteroidImg);
      asteroid.scale = 0.15;
      asteroid.velocityY = 4 + frameCount/240;
      asteroid.lifetime = 200;
      //asteroid.debug = true;   
      asteroidGroup.add(asteroid);
    }
}

//creating missile
function createMissile()
{
  missile = createSprite(plane.x, 470, 20, 50);
  missile.addImage(missileImg);
  missile.scale = 0.15;
  missile.velocityY = -5;
  missile.lifetime = 200;
  //missile.debug = true;
  missile.setCollider("rectangle", 0, 0, 30, 50);
  missileGroup.add(missile);
}
