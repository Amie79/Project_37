class Food{

    constructor(){
        this.foodStock=0;
        this.lastfed;
        this.image=loadImage("images/Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){

        this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
           }
    }

    display(){
    
        fill(255,255,254);
        textSize(20);
        
            if(lastFed>=12){
                text("Last Fed: "+lastFed%12 + "PM",350,30);
              }
              else if(lastFed==0){
                text("Last Fed:12 AM",350,30);
              }
              else{
                text("Last Fed: "+lastFed+"AM",350,30);
              }
            
            var x=80,y=100;

            imageMode(CENTER);

            if(this.foodStock!=0){
                for(var i=0;i<this.foodStock;i++){
                    if(i%10==0){
                        x=80;
                        y=y+50;
                    }
                    
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}

bedroom(){
    background(bedroom_img,550,500);

}

garden(){
    background(garden_img,550,500);
}

washroom(){
    background(washroom_img,550,500);
}
}
