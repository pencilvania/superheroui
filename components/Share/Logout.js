import React, {Component} from 'react'
import links from '../../config/link';
import Router from 'next/router'

class Logout extends React.Component{

    LogOut(){
		sessionStorage.setItem('Token','')
        fetch(links['BaseUrl']+links['LogOut'],{
            method:'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(Router.push('/'))
        
    }

    render(){

        return(
            <div className="signOut" onClick={this.LogOut}>LogOut</div>
        )
    }
}

export default Logout;