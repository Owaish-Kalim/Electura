import React, { Component } from "react";
import { Container } from "reactstrap";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email: '',
            password: '',
        };
    }

    onChange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmitSignUp = () => {
        // console.log("Signup With -
        // console.log()
        axios.post(`http://${window.location.hostname}:3005/signUp`,{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {

            console.log("Response is - ")
            console.log(response)
            alert("Registered!")

            window.location.href = "/admin/home";

        }).catch(function(err){      
            console.log("catch err is ");
            console.log(err)  
            alert("Please try Again!");
        });
    }

    render() {
        return (
            <Container>
             <div className="SignUp">
                        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                            <main className="pa4 black-80">
                                <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                        <input 
                                            className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                            type="name" 
                                            name= "name"  
                                            id="name" 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                        <input 
                                            className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                            type="email" 
                                            name= "email"  
                                            id="email" 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onChange}
                                    />
                                    </div>
                                </fieldset>
                                <div className="">
                                    <input 
                                    onClick={this.onSubmitSignUp}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign Up" />
                                </div>    
                                </div>
                                <br />
                            <a href="/admin/home">Already registered?</a>  
                            </main>
                        </article>    
                    </div>        
            </Container>
        );
    }
}