var points = []
var point1;
var point2;
var point3;
var point4;
var last
var step = 100
var total = 0;

var BIAS = 0.5;
function setup() {
  squareCanvas()
  point1 = createVector(width/2,20)
  point2 = createVector(20,height-height/4)
  point3 = createVector(width-20,height-height/4)
  points.push(point1,point2,point3)
  
  background(0);
  last = random(points);
  colorMode(HSB)
}

function draw() {
  
  
  noFill();
  drawCircle(point1,20)
  drawCircle(point2,20)
  drawCircle(point3,20)
  for (var i = 0; i < step; i++){
    point4 = random(points);
    
    
    //BIAS = map(last.y,20,width-20,0,1);
    //BIAS = 0.99;
    //BIAS = 0.5
    //BIAS = noise(last.y,last.y)
    //BIAS = 0.6
    
    
    
    var mp = lerpVector(point4,last,BIAS)
    last = mp
    
    
    
    let clr;
    clr = color(map(last.x,20,width-20,0,255),255,255)
    //clr = noise(last.x/20,last.y/20)*255
    
    
    set(last.x,last.y,clr);
    
  }
  
  updatePixels()
  
  total+=step;
  
  stroke(255)
  fill(0)
  rect(0,0,120,80)
  fill(255)
  text("Iterations: " + total,10,20)
  text("Fps: " + getFps(true),10,35)
  text("Step: " + step,10,50)
  
  if (getFps(true) > 60)
  {
    step++;
  }
}

function lerpVector(p1,p2,v)
{
  return createVector(lerp(p1.x,p2.x,v),lerp(p1.y,p2.y,v))
}