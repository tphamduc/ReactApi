import React, {Component, Fragment} from "react"
import { Button, Col, Container, Row ,CardImg, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Data extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            cmt:[],
            index: 0,
            indez:0,
            doc:'',
            id:"", 
        };
    }

    componentDidMount(){
        this.getDataAPI();
        this.getCmtAPI();
    }


    getDataAPI(){
            fetch('https://60ebfed7e9647b0017cddfbd.mockapi.io/post2')
            .then((response) => response.json())
            .then((data) => {
                        console.log(data)
                        this.setState({
                            data: data,
                        })  
                    })
         }

    
         getCmtAPI(){
            fetch('https://60ebfed7e9647b0017cddfbd.mockapi.io/comments')
            .then((response) => response.json())
            .then((data) => {
                        console.log(data)
                        this.setState({
                            cmt: data,
                        })  
                    })
         }


    changeText = (ev) => {
            let data = this.state.data;
            this.state.doc = ev.target.value;
            this.setState({
                data
            });
        }

    DELETE = (ev, i) => {
        this.state.index = i;
        let data = this.state.data;
        let id = data[i].id;
        console.log(i);
        fetch(`https://60ebfed7e9647b0017cddfbd.mockapi.io/post2/${id}`, {
        method: 'DELETE',
        })
        .then((data) => {
            this.setState({
                data: data,
            }) 
        })
         }

    OnSubmit = () => {
            let doc = this.state.doc;
            fetch('https://60ebfed7e9647b0017cddfbd.mockapi.io/post2', {
            method: 'POST',
            body: JSON.stringify({
            author: 'Trung',
            content: doc,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                data: data,
            })  
        })
            }


       toggle = (ev,i) => {
            let data = this.state.data; 
            this.setState({modal: !this.state.modal});
            this.state.id = data[i].id ;
            console.log(this.state.id);
            this.state.doc = data[i].content;
            this.setState({
                data
            });
            };

        PostOut = () => {
                let out = this.state.doc;
                return out;
        }
    
        TEXTFIX = (ev) =>{
            this.state.doc = ev.target.value;
        }
        
        EditContent = () => {
            let data = this.state.data;
            let id = this.state.id;
                console.log(id);
                if(typeof(data[id]) != 'undefinded' )
                {
                // data[id].content = this.state.doc;
                let url = "https://60ebfed7e9647b0017cddfbd.mockapi.io/post2/"
                fetch(`${url}${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                content: this.state.doc,
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((data) => { console.log(data)
                    this.setState({
                        data: data,
                        modal: !this.state.modal
                    })  
                })
                }
   
        }

    render(){
        let {data, modal, cmt} = this.state;
        let arrP = Object.values(data).map(key => key);
        let arrC = Object.values(cmt).map(key => key);
        let item = arrP.map((c,i) => {
            return(
                    <div className="AppPost">
                    <Container className="appDemo" style={{padding:"20px", border:"1px solid black"}}>
                        <Row className="Post">
                            <Col xs="3" className="ava">
                                <CardImg src alt style={{border : "2px solid black", height:"70px"}}></CardImg>
                                <h3>{c.author}</h3>
                            </Col>
                            <Col xs="9" className="content-post">
                                <span  style={{width:"101%", height:"300px"}} type="text" >{c.content}</span>
                            </Col>
                            <Col xs="1">
                                <button onClick={ev => this.DELETE(ev,i)}>DELETE</button>
                            </Col>
                            <Col xs="1">
                                <button onClick={(ev) => this.toggle(ev, i)}>EDIT</button>
                            </Col>
                        </Row>
                              {/* //comment */}
                  <Row className = "Comment-other" style={{marginTop: "10px"}}>
                        <Col xs={{ 'size' : '10', 'offset' : '2'  }}>
                          {!c.comments ? null: arrC.map((cm, index) => {
                              if(c.comments.includes(cm.id)){
                                  return(
                                  <Row key={index} style={{ 'backgroundColor' : 'lightgray' }}>
                                      <Col xs={2}>
                                           {cm.author}
                                     </Col>
                                     <Col xs={6}>
                                            {cm.content}
                                     </Col>
                                     <Col xs="1">
                                         <button class="material-icons" style={{fontSize:"20px",'cursor' : 'pointer'}}>like</button>
                                      </Col>
                                      <Col xs={1}>
                                      <button >Edit</button>
                                     </Col>
                                     <Col xs={1}>
                                      <button >Delete</button>
                                     </Col>
                                     </Row>
                                        )
                                  }
                                    })}
                 
                <Row className="Comment-User" style={{marginTop:"20px"}} xs="12">
                  <input  style={{width:"70%", height:"150px", marginLeft:"15%"}} type="text" placeholder="My Comment..."  onChange = {ev => this.changeText(ev)}></input>
                </Row>
                  <Row className="button">
                       <Button >Comment</Button>
                       {/* onClick={this.OnSubmitCMT()} */}
                  </Row>
                </Col>   
               </Row>
               </Container>
                    </div>
            );
        })
        return(
            <Fragment>
            <div className="UpPost">
                <Row>
                <input style={{width:"70%", height:"150px", marginLeft:"15%"}} type="text" placeholder="My Post..."  onChange = {ev => this.changeText(ev)}></input>
                </Row>
                <Row style={{marginBottom:"20px"}}>
                <button onClick={ this.OnSubmit}>SUBMIT</button>
                </Row>
            </div>
                <Container>    
                    {item}
                </Container>
                <div>
          
          <Modal isOpen={modal}  toggle={(ev)=>this.toggle(ev, 0)}>
              <ModalHeader  toggle={(ev)=>this.toggle(ev, 0)}>Modal title</ModalHeader>
              <ModalBody>
                <input type="textarea" className="inputPost" defaultValue={this.PostOut()} onChange={(ev) => this.TEXTFIX(ev)}></input>
              </ModalBody>
              <ModalFooter>
              <Button color="primary" onClick={this.EditContent}>Update</Button>
              <Button color="secondary"  toggle={(ev)=>this.toggle(ev, 0)}>Cancel</Button>
              </ModalFooter>
          </Modal>
      </div>
            </Fragment>
        )
        

}
}
export default Data;