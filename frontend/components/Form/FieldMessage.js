class Message extends Component {
    constructor(props){
        super(props);
        // Язык сообщения
        this.lang =  props.lang.cur_lang;
        // Само сообщение
        this.message = '';
        // Тип сообщения
        this.type_message = '';
        // Тип поля
        this.type_field = '';
        this.createMessageOnCurrentLanguage = this.createMessageOnCurrentLanguage.bind(this);
    }

    createMessageOnCurrentLanguage(){

    }

    //Срабатывает перед рендерингом
    componentWillMount(){
        // Нужно ли заново генерировать сообщение
        let is_gen_message = false;

        // Текущий язык приложения
        let cur_lang = this.props.lang.cur_lang;

        // Проверяем изменился ли язык или тип сообщения
        // если нет, то берем из состояния, если да, то заново генерируем сообщение
        if(this.type_message != this.props.type_message || this.type_field != this.props.type_field) {
            this.type_message = this.props.type_message;
            this.type_field   = this.props.type_field;
            this.createMessageOnCurrentLanguage();
        } else if(this.lang != cur_lang){
            this.lang =  cur_lang;
            this.createMessageOnCurrentLanguage();
        }
    }

    render() {
        return (
            <div className="form-control-feedback">
                {this.message}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lang: state.lang

    }
}

export default connect(mapStateToProps)(Message);