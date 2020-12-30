import React, { Component } from 'react';
import axios from 'axios'
import {Col, Card, CardHeader, CardBody, Button} from 'reactstrap'

export default class FilesUploadComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile:null,
            data: [],
            gotData: false
        }
    }

    onChangeHandler=e=>{
        e.preventDefault();
        this.setState({
          selectedFile: e.target.files[0],
          loaded: 0,
        })
        console.log(e.target.files[0])
      }



    handleSubmit = () => {

        const formData = new FormData();
        formData.append("file", this.state.selectedFile);

        console.log("formData is")
        console.log(formData)

        const token = localStorage.getItem('token')
        console.log("token is " + `Bearer ${token}`)

        axios.post(`http://${window.location.hostname}:3005/uploadFile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
            // receive two    parameter endpoint url ,form data
        })  
        .then((response) => {
            // setResponse(response.data);
            console.log("Response");
            console.log(response)
            // if (response.status === 200) {
            //     console.log("Created");
            //     alert("Created!")
            // }
            alert("Saved")
        }).catch((error) => {
            console.log("error");
            console.log(error)
            alert("saving err")
        })
        
    }

    async componentDidMount(){
        var dataReceived = await axios.get(`http://${window.location.hostname}:3005/fetchFiles`);
        console.log(dataReceived)


        this.setState({data: dataReceived.data, gotData:true})
    }
    render() {
        console.log(this.state.data)
        return (
            <div className="container">
                <div className="row">
                    <Col md={6}>
                        <form>
                            <h3>React File Upload</h3>
                            <div className="form-group">
                                <input onChange={this.onChangeHandler} type="file" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Upload</button>
                            </div>
                        </form>
                    </Col>
                    <Col md={6}>
                        {this.state.gotData ?
                            this.state.data.reverse().map((item) => {

                                return (
                                    <Card>
                                        <CardHeader></CardHeader>
                                        <CardBody>
                                            <p>FileName: {item.fileName}  </p>
                                            <p>uploaded At: {item.createdAt}  </p>
                                            <a href={`http://${window.location.hostname}:3005/${item.fileName}`} download target="_blank">View it !</a>
                                            {/* {JSON.stringify(item)} */}
                                        </CardBody>
                                    </Card>
                                )
                            })
                        :
                        <>Fetchng Data..</>
                        }

                        <br />
                        <p style={{textAlign:"right"}}>* Already uploaded files can not be uploaded again ! </p>
                        
                    </Col>
                    
                </div>
            </div>
        )
    }
}