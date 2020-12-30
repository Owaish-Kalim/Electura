import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Row, BreadcrumbItem, Breadcrumb, Button, CardText } from 'reactstrap'
import { Link } from 'react-router-dom';
import 'tachyons';
import axios from 'axios';
import { store } from 'react-notifications-component';
import FilesUploadComponent from '../fileUpload';


class AdminHome extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isSignedIn: localStorage.getItem('isSignedIn') === 'true' ?  true :false,
            route: JSON.parse(localStorage.getItem('route')),
            signInEmail: '',
            signInPassword: '',
        };
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        console.log("SignIn With - ");
        console.log(this.state.signInEmail);
        console.log(this.state.signInPassword);
        // console.log()
        axios.post(`http://${window.location.hostname}:3005/signIn`,{
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
        .then(response => {

            console.log("Response is - ")
            console.log(response)
            
                if(response.status!== 401 && response.status !== 400 ){
                   
                    if(response.data.user.email) { 
                        console.log(response.data);
                        // console.log("Token is " + response.data.token)
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        if(response.data.user.role === 1)
                            {
                                this.onRouteChange('admin');
                            }
                        else
                            {
                                this.onRouteChange('home');
                            }

                    }
                }

        }).catch(function(err){      
            console.log("catch err is ");
            console.log(err)  
            alert("Invalid Credentials.Please try Again!");
        });
    }

    onRouteChange = (route) => {
        if(route === 'signout')
        {
          this.setState({isSignedIn:false})
          localStorage.setItem('isSignedIn',false);
          localStorage.removeItem('user');
        }
        else if (route === 'home'|| route === 'admin')
        {
          this.setState({isSignedIn: true})
          localStorage.setItem('isSignedIn',true);
        }

        this.setState({route: route});
        localStorage.setItem('route',JSON.stringify(route));
        console.log("route is: " +  localStorage.getItem('route'));
    }

    componentWillUnmount(){

        document.querySelector("#bootstrap\\ ").remove();
    }

    render() { 
        console.log(localStorage.getItem('user'))
        return (
            <>
            {/* <Header /> */}
            <div className="Adminhome">
                {   
                    this.state.isSignedIn === true
                    ?<div className="container">
                    <Row>
                        <Breadcrumb className="col-12 col-md-12">
                            <BreadcrumbItem active>Home</BreadcrumbItem>

                            {/* This will be only visible to gensec */}
                            <div className="ml-auto">
                            { this.state.route==='admin'
                                ? <div>
                                        <p>Welcome,SuperAdmin</p>
                                        <Link to="/admin/create/group" >
                                            <Button color="outline-primary">Create Group</Button>   
                                        </Link>
                                    </div>
                                :<div><p>Welcome, {JSON.parse(localStorage.getItem('user')).name}</p></div>    
                            }
                           
                            <Button color="outline-primary" onClick={() => this.onRouteChange('signout')} >Sign Out</Button>  
                            </div>
                            

                        </Breadcrumb>
                        <div className="col-12 col-md-12">
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <FilesUploadComponent />
                    </Row> 
                </div> 

                : (
                    <div className="SignIn">
                        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                            <main className="pa4 black-80">
                                <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                    <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                    />
                                    </div>
                                    <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                    />
                                    </div>
                                </fieldset>
                                <div className="">
                                    <input 
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in" />
                                </div>    
                                </div>
                                <br />
                            <a href="/admin/signUp">Not yet registered?</a>  
                            </main>
                        </article>  
                    </div>        
                )                                                     
                }
                    </div>
            </>
        );
    }
}
 
export default AdminHome;