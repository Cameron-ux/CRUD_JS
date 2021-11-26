class Pokemon {

    constructor(type, region, number, attack, stat){
        this._type = type;
        this._region = region;
        this._number = number;
        this._attack = attack;
        this._stat = stat;
    }

    get type(){
        return this._type;
    }

    get region(){
        return this._region;
    }

    get number(){
        return this._number;
    }

    get attack(){
        return this._attack;
    }

    get stat(){
        return this._stat;
    }

    settype(a){
        this._type = a;
    }

    setnumber(b){
        this._number = b;
    }

    setregion(n){
        this._region = n;
    }

    setattack(at){
        this._attack = at;
    }

    setstat(s){
        this._stat = s;
    }
}

class Cat{
    constructor(){
        this.name ='cat'
    }
}

module.exports = {
    Pokemon,
    Cat
}