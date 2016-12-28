class Alerts{
    constructor(table_name, logger = console.log){
        this.table_name_orginal = table_name;
        this.table_name = table_name[0].toUpperCase()+table_name.substr(1);
        this.logger = logger;
    }

    _log(str_alert){
        this.logger(`[${this.table_name}] : ${str_alert}`)
    }

    _error(error){
        this._log(error);
    }

    table_created(){
        this._log(`table was created`);
    }

    table_not_created(error){
        this._log(`table wasn't created`);
        this._error(error);
    }

    index_created(index_name){
        this._log(`index [${index_name}] was created`);
    }

    index_not_created(index_name, error){
        this._log(`index [${index_name}] wasn't created`);
        this._error(error);
    }

    table_deleted(){
        this._log(`table was deleted`);
    }

    table_not_deleted(error){
        this._log(`table wasn't deleted`);
        this._error(error);
    }

    data_inserted(){
        this._log(`data was inserted`);
    }

    data_not_inserted(){
        this._log(`data wasn't inserted`);
    }
}

module.exports = Alerts;


