//Create variables here
var dog,happydog,database,foodS,foodStock,dog_img,happydog_img,bottles,foodObj,fedTime,lastFed;
var bedroom_img,garden_img,washroom_img;
var readState,gameState;
function preload()
{
  //load images here
  
  dog_img=loadImage("images/dogImg.png");
  happydog_img=loadImage("images/dogImg1.png");
  bedroom_img=loadImage("vp/Bed Room.png");
  garden_img=loadImage("vp/Garden.png");
  washroom_img=loadImage("vp/Wash Room.png");
}

function setup() {
	createCanvas(1000, 500);
  dog=createSprite(700,250,50,40);
  dog.addImage(dog_img);
  dog.scale=0.30;
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 // bottles=20;

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  
    lastFed=data.val();
  });

  feed=createButton("Feed the cute doggie");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addfood=createButton("AddTheFood");
  addfood.position(900,100);
  addfood.mousePressed(addFoods);

  foodObj=new Food();

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  })
}


function draw() {  
background(46,139,87);
currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   


foodObj.display();

if(gameState!=="Hungry"){
  feed.hide();
  addfood.hide();
  dog.remove();
}

else{
  feed.show();
  addfood.show();
}
  drawSprites();
}
  //add styles here

  
  

function readStock(data){
  foodObj.updateFoodStock(foodS);
  foodS=data.val();
}
function writeStock(bottles){
  if(bottles<1){
    bottles=0;
  }else{
    bottles=bottles-1;
  }
 database.ref('/').update({
  Food: bottles
})
}


function feedDog(){
  dog.addImage(happydog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}

