let data = null

class Car{
    constructor(name, model, year){
        if(!data){
            this.name = name;
            this.model = model;
            this.year = year;
            data = this;
        } else{
            return data
        }
        
    }
}

class Truck extends Car{
    constructor(name, model, year, bedLength){
        super(name, model, year);
        this.bedLength = bedLength;
    }
}

const touareg = new Car('touareg', 'touareg', '2015');
