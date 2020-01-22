import React from 'react';
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import links from '../config/link';
import strings from '../config/string';
import Auth from '../config/Auth';
import error from '../config/Error';
import Router from 'next/router'
import {FileUpload} from 'primereact/fileupload';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class HerosAdd extends React.Component{

    constructor(){
        super();
        this.state = {
            realname : '',
            heroname : '',
            publisher:'',
            fadate:''
        }


    }
	
	componentDidMount(){
		Auth.RemoveSession();
	}
	
    SetHeros = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    AddHeros(e){
        e.preventDefault();
        var realname = this.state.realname
        var heroname = this.state.heroname
        var publisher = this.state.publisher
        var fadate = this.state.fadate

        if(realname == '') { error.RequireTextBox('realname')}
        else{ error.DeleteRequireTextBox('realname')}

        if(heroname == '') { error.RequireTextBox('heroname')}
        else{ error.DeleteRequireTextBox('heroname')}

        if(publisher == '') { error.RequireTextBox('publisher')}
        else{ error.DeleteRequireTextBox('publisher')}

        if(fadate == '') { error.RequireTextBox('fadate')}
        else{ error.DeleteRequireTextBox('fadate')}

        if(realname != '' && heroname != '' && publisher != '' && fadate != ''){

            fetch(links['BaseUrl']+links['Heros_Create'],{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
                },
                body: JSON.stringify(
                    {
                        'realname': realname,
                        'heroname':heroname,
                        'publisher':publisher,
                        'fadate':fadate,
                        'affiliations':[],
                        'ability':[]
                    })
                })
                .then(res=>res.json())
                .then(response => {
                    Router.push('/home')
                })
        }
        
    }

    render(){

        return(
            <div className="HomeHolder">
                <form onSubmit={e => this.AddHeros(e)}>
                    <div className="row">
                        <div className="col-lg-2">{strings['realname']}</div>
                        <div className="col-lg-4">
                            <input
                                name="realname"
                                className="inputTxt"
                                onKeyUp = {this.SetHeros}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['heroname']}</div>
                        <div className="col-lg-4">
                            <input
                                name="heroname"
                                className="inputTxt"
                                onKeyUp = {this.SetHeros}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['publisher']}</div>
                        <div className="col-lg-4">
                            <input
                                name="publisher"
                                className="inputTxt"
                                onKeyUp = {this.SetHeros} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['fadate']}</div>
                        <div className="col-lg-4">
                            <input
                                name="fadate"
                                type="date"
                                className="inputTxt"
                                onBlur = {this.SetHeros} />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-2">
                            <input type="submit"
                                className="inputSub"
                                value="Add"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default HerosAdd;