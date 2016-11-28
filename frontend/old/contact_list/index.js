import React from 'react';

import ReactDOM from 'react-dom';

class Contact extends React.Component{
    constructor(prop){
        super(prop);
        // componentWillUnmount = componentWillUnmount.bind(this);
    }

    render(){

        let data_contact = this.props.data_contact;
        return (
            <li className="contact"><div>
                <Name  name = {data_contact.name}/>
                <Phone phone ={data_contact.phone} />
            </div></li>
        )
    }

    //Вызывается после удаления
    componentWillUnmount(){
        //console.dir(this.props);
    }
}

class Phone extends React.Component{
    render(){
        return (
            <div className="phone">
                <p>{this.props.phone}</p>
            </div>
        );
    }
}

class Name extends React.Component{
    render(){
        return (
            <div className="name">
                <p>{this.props.name}</p>
            </div>
        );
    }
}


class ContactList extends React.Component{
    constructor(props){
        super(props);
        this.state = {displayContact: props.data};
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event){
        // event - некое синтетическое событие
        // console.log(event.target.value);

        let searchQuery = event.target.value.toLowerCase();
        let displayContact = this.props.data.filter(function (el) {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        // console.log(displayContact);

        this.setState({
            displayContact : displayContact
        });
    }

    componentWillMount(){
        console.log('will mount');
    }

    componentDidMount() {
        console.log('mounted');
    }

    render(){
        // console.dir(this.props.data.length);
        let data = this.props.data;
        return (
            <div className="contact-list">
                <input
                    type="text"
                    className="search-field"
                    placeholder = {this.props.serch_text}
                    onChange={
                        this.handleSearch
                    }
                />
                <ul>
                {
                   this.state.displayContact.map(function (contact) {
                        return (
                            <Contact
                                key={contact.id}
                                data_contact = {contact}
                            />
                        );
                   })
                }
                </ul>
            </div>
        )
    }
}

ContactList.defaultProps ={
   serch_text: 'Введите текст для поиска!'
}



//

export default ContactList