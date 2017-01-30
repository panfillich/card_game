class LoadPack{
    //config = {
    //  createNewIteration: func,
    //  all_iterations:     int,
    //  table_name:         str,
    //  pack_iterations:    1000
    //}
    constructor(config){

        // Добавлено итераций
        this.inserted_iterations   = 0;

        // Добавлено записей
        this.inserted_records    = 0;

        //Всего итераций
        this.all_iterations       = config.all_iterations;

        //Создать итерацию (итерация может содержать несколько записей)
        this.createNewIteration   = config.createNewIteration;

        //Имя таблицы
        this.table_name         = config.table_name;

        //Записывать в базу за один запрос
        this.pack_iterations = 1000;
        if(config.pack_iterations){
            this.pack_iterations = config.pack_iterations;
        }
    }


    // Формат вывода на консоль
    log(message){
        console.log(`[${this.table_name}] ` + message);
    }


    // Получить кол-во загруженных данных в %
    getPercents() {
        let percents = this.inserted_iterations * 100 / this.all_iterations;
        return percents.toFixed(2) + '%';
    }


    // Записать this.pack_value записей
    createPack() {
        if(this.inserted_iterations == this.all_iterations){
            return false;
        }

        let current_count_pack_value;
        if((this.inserted_iterations + this.pack_iterations) > this.all_iterations){
            current_count_pack_value = this.all_iterations - this.inserted_iterations;
        } else {
            current_count_pack_value = this.pack_iterations;
        }

        let result_puck = [];
        for(let i = 1; i <= current_count_pack_value; i++){
            let new_iteration = this.createNewIteration({
                current_records: (i + this.inserted_iterations)
            });

            this.inserted_records += new_iteration.length;

            result_puck = result_puck.concat(new_iteration);
        }

        this.inserted_iterations += current_count_pack_value;
        return result_puck;
    }


    // Записать всё
    insert(queryInterface, DataTypes, finalCallback) {
        let pack = this.createPack();
        if (pack) {
            queryInterface.bulkInsert(this.table_name, pack)
                .then(function () {
                    this.log(this.getPercents());
                    this.insert(queryInterface, DataTypes, finalCallback);
                }.bind(this));
        } else {
            this.log(`created ${this.inserted_records} records`);
            finalCallback();
        }
    }
}

module.exports = LoadPack;