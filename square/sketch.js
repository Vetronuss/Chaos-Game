var points = []
var point4;
var step = 1000;
var last
var BIAS = 0.5
var total = 0;
var last2;
var index;
var ss = [0,1,2,3]

var midpoints = true //whether or not to use midpoints
var canLast = false //whether or not vertex can be the same as the last one

function setup() {
  squareCanvas()
  points.push(createVector(20,20),createVector(width-20,20),createVector(width-20,height-20),createVector(20,height-20))
  background(0);
  
  //add midpoints (can be skipped)
  if (midpoints){
    points.push(lerpVector(points[0],points[1],0.5))
    points.push(lerpVector(points[1],points[2],0.5))
    points.push(lerpVector(points[2],points[3],0.5))
    points.push(lerpVector(points[3],points[0],0.5))
    ss.push(4,5,6,7)
  }
  last = random(points);
  last2 = random(ss);
  
  
}

function draw() {
  
  push();
  strokeWeight(4)
  stroke(255)
  for (var i = 0; i < points.length; i++)
  {
    point(points[i].x,points[i].y)
  }
  pop();
  for (var i = 0; i < step; i++){
    
    
    do{
      index = random(ss);
      point4 = points[index];
    }while(canLast && point4 == points[(last2+0)%8]);
    last2 = index;
    
    //BIAS = map(last.y,20,width-20,0,1);
    //BIAS = 0.99;
    //BIAS = 0.5
    //BIAS = noise(last.y,last.y)
    //BIAS = 0.6
    BIAS = 1/3
    
    
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