import React from 'react';
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import links from '../config/link';
import error from '../config/Error';
import {Dialog} from 'primereact/dialog';

class HerosEdite extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            realname : '',
            heroname : '',
            publisher:'',
            fadate:'',
            ParentID:''
        }
      
    }

    //save value in state with onBlur
    SetHeros = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
	
    //update with click on submit 
    UpdateHeros(e){
        e.preventDefault();
        var Id = this.state.ParentID;

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

                fetch(links['BaseUrl']+'/api/heros/'+Id+'/update',{
                    method: 'put',
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
                        })
                    })
                    .then(res=>res.json())
                    .then(response=>{
                        this.props.HideFunct();
                    })
        }
            
    }

    //get ParentID
    componentWillReceiveProps(nextProps){

        if(nextProps.visible){
            var id = nextProps.id;
            this.setState({ParentID:id})
            this.HeroseGetOne(id);
        }
    }

    //read data from database
    HeroseGetOne(id){
        fetch(links['BaseUrl']+'/api/heros/'+id,{
            method:'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            }
       })
       .then(res=>res.json())
       .then(response=>{
           this.setState({
                realname : response[0].realname,
                heroname : response[0].heroname,
                publisher:response[0].publisher,
                fadate:response[0].fadate
           })
       })
    }

    render(){
       
        return(
            <Dialog header="Heros Edite" visible={this.props.visible} style={{width: '60vw'}} modal={true} onHide={this.props.HideFunct}>
                <form onSubmit={e => this.UpdateHeros(e)}>
                    <div className="row">
                        <div className="col-lg-2">realname</div>
                        <div className="col-lg-4">
                            <input
                                name="realname"
                                className="inputTxt"
                                defaultValue={this.state.realname}
                                onKeyUp = {this.SetHeros}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">heroname</div>
                        <div className="col-lg-4">
                            <input
                                name="heroname"
                                className="inputTxt"
                                defaultValue={this.state.heroname}
                                onKeyUp = {this.SetHeros}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">publisher</div>
                        <div className="col-lg-4">
                            <input
                                name="publisher"
                                className="inputTxt"
                                defaultValue={this.state.publisher}
                                onKeyUp = {this.SetHeros} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">fadate</div>
                        <div className="col-lg-4">
                            <input
                                name="fadate"
                                type="date"
                                className="inputTxt"
                                defaultValue={this.state.fadate}
                                onBlur = {this.SetHeros} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">
                            <input type="submit"
                                className="inputSub"
                                value="Update"/>
                        </div>
                    </div>
                </form>
            </Dialog>
        )
    }
}

export default HerosEdite;