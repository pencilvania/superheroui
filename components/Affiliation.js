import React from 'react';
import links from '../config/link';
import error from '../config/Error';
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import {Dialog} from 'primereact/dialog';

class Affiliation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           dataAff : '',
           loadingAff:true,
           NewAff:'',
           ParentID:''

        }
    }

//show textbox for add ability
AddText(e){
    e.preventDefault()
    
    if(document.getElementById('AddHiden').style.display = 'none') {
        document.getElementById('AddHiden').style.display = 'block'
    }
    
}

    
//Add New Aff to state
SetAff = e =>{

    this.setState({NewAff:e.target.value})          
    
}

//insert data to DB
AddAff = () =>{
    var Id = this.props.id;

    if(this.state.NewAff == '') { error.RequireTextBox('Affiliation')}
    
    else{
        fetch(links['BaseUrl']+links['Aff_Add'],{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
            body: JSON.stringify(
                {
                    'name': this.state.NewAff   ,
                    'hero_id' : Id
                })
        }).then(res=>{
            if(res.status == 200){

                this.AffiliationRead(this.state.ParentID);
                //fill out this text box
                document.getElementsByName('Affiliation')[0].value = ''
                this.setState({NewAff:''})
                error.DeleteRequireTextBox('Affiliation')
            }
        })
    }
     
}


componentWillReceiveProps = (nextProps) =>{
    if(nextProps.visible){
        var id = nextProps.id;
        this.setState({ParentID:id})
        this.AffiliationRead(id);
    }
}

//read data
AffiliationRead(id){

    fetch(links['BaseUrl']+'/api/heros/'+id+'/affiliations',{
            method:'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
        })
    .then(res => res.json())
    .then(response => {
        this.setState({ dataAff: response,loadingAff:false })
    })
    .catch((error) => {
        })
}
 
delAffli = id =>{
    
        fetch(links['BaseUrl']+'/api/affiliations/'+id+'/remove',{
            method:'delete',
            body:{ id : id},
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
        })
        .then(res=>res.json())
        .then(response => {
            if(response){
                this.AffiliationRead(this.state.ParentID);
            }
        })
}

    render(){

        return(
		<Dialog header="Affiliation" visible={this.props.visible} style={{width: '60vw'}} modal={true} onHide={this.props.HideFunct}>
                <div className=" ListHolder Ability">
                <div className="row" style={{border:0}}>
                    <div className="col-lg-3">
                            <form>
                                <button className="inputSub" onClick={this.AddText}>Add</button>
                            </form>
                    </div>
                    <div className="col-lg-8" id="AddHiden">
                        <input type="text"
                            name="Affiliation"
                            className="inputTxt"
                            placeholder="Write New affiliation"
                            onKeyUp = {this.SetAff}
                            onBlur={this.AddAff}
                        />
                    </div>
                </div>
                    {!this.state.loadingAff ?(
                        this.state.dataAff.map((item,index)=>{
                            return(
                                <div className="row" key={item['id']}>
                                    <div className="col-lg-8">
                                        <input type="text"
                                            className="inputTxt"
                                            defaultValue={item["name"]}
                                            disabled
                                        />
                                        </div>
                                    <div className="col-lg-1"><i className="pi pi-times" onClick={() => this.delAffli(item['id']) }></i></div>
                                </div>
                            )
                        })
                    ):
                    (<div>Loading</div>)}
                </div>
		</Dialog>
        )
    }
}

export default Affiliation;