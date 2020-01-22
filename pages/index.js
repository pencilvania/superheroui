import React from 'react'
import Head from 'next/head'
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import links from '../config/link';
import strings from '../config/string';
import Router from 'next/router'

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            username:'',
            password:''
        }
              
    }
    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        
        fetch(links['BaseUrl']+links['login'],{
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify(
                {
                    'email': this.state.username,
                    'password':this.state.password,
                })
          }
        )
      
        .then(res => res.json())
        .then(function(response){
            if(response.token){
                sessionStorage.setItem('Token',response.token)
                Router.push('/home')
            }
            else{
                console.log(response)
                document.getElementById('message').innerHTML = response.validation.email+'<br>'+response.validation.password
            }
        })
        .catch(error => console.error( error))
        
    }
        
    render(){
        return(
            <div className="LoginHolder">
                <div id="message"></div>
                <form onSubmit={e=>this.handleSubmit(e)}>
                    <input type="text"
                        name="username"
                        placeholder={strings['UserName']}
                        className="inputTxt"
                        onKeyUp = {e => this.handleChange(e)}
                        />
                    <input type="pasword"
                        name="password"
                        placeholder={strings['Password']}
                        className="inputTxt"
                        onKeyUp = {e => this.handleChange(e)}
                        />
                    <input type="submit"
                        className="inputSub"
                        />
                   </form>
            </div>
        )
    }
}

export default Home;