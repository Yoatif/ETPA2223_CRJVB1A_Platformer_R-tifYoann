class Inventory extends Menu{
    constructor(scene, money, appareance, items){

        var _money = money;

        super(scene, appareance, items, xNav, yNav, assetCursor, boxSpacing, nbBoxX, nbBoxY, nbColLeft, nbColRight, gap);

        this.select = function(x, y) {
            for(var k = 0; k < this.getSlots().length; k++){
                if(x == this.getSlots()[k][1] && y == this.getSlots()[k][2]){
                    scene.joueur.setWeapon(this.getSlots()[k][0]);
                }
            }
        }



        this.getMoney = function(){ return _money};
        this.setMoney = function(amount){ _money = amount};
    }
}
