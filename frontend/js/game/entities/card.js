/**
 * Created by maksim on 2.11.16.
 */

class Card{
    constructor(setting){
        this.id         = setting.property.id;
        this.cost       = setting.property.cost;
        this.name       = setting.property.name;
        this.damage     = setting.property.damage;
        this.life       = setting.property.life;
    }
}
