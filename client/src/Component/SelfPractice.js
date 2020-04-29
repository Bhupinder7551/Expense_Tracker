// JavaScript source code
import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Icon, Input } from 'semantic-ui-react'


class Self extends Component {
    constructor(props) {

        super(props);
        this.state = {
            title: '',
            task_name: '',
            items: [],
            editData: ''


        }
    }
    componentDidMount() {
        this.getAll()
    }

    //getAll = () => {
    //    getList().then(data => {
    //        this.setState(
    //            {
    //                term: '',
    //                items: data
    //            },
    //            () => {
    //                console.log(this.state.items)
    //            }
    //        )
    //    })
    //}

    getAll = () => {

        axios.get('api/tasks', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                const data = response.data;
                this.setState({ items: data });

            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    submit = (e) => {
        e.preventDefault();
        const payload = {
            title: this.state.title,
            task_name: this.state.task_name,


        };
        axios({
            url: '/api/task ',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('data has been sent to the server');
                this.resetUserInputs();
                this.getAll();
            })
            .catch(() => {
                console.log('Internal server error')
            });
    };



    resetUserInputs = () => {
        this.setState({
            title: '',
            task_name: ''
        });
    };
    //onDelete = (term) => {

    //    deleteItem(term)

    //    var data = this.state.items
    //    data.filter((item, index) => {
    //        if (item[1] === term) {
    //            data.splice(index, 1)
    //        }
    //        return true
    //    })
    //    this.setState({ items: data })

    //}
    onDelete(id) {
        console.log("deleted item is", id)
        axios.delete('api/task/' + id)
            .then((res) => {
                console.log('Student successfully deleted!', res)
                this.getAll()
            }).catch((error) => {
                console.log(error)
            })
    }
    onUpdate = (term, id, e) => {
        e.preventDefault()

        axios.put(`api/task/${id}`,{ task_name: term })
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully updated')
                this.getAll();
                this.resetUserInputs();
            }).catch((error) => {
                console.log(error)
            })

    }
 
    onEdit = (item, id, e) => {
        e.preventDefault()
        this.setState({
            id: id,
            task_name: item

        })

    }


    displayBlogPost = (items) => {

        if (!items.length) return null;


        return items.map((post, index) => (
            <Card style={{ padding: '10px', borderRight: '5px solid red' }} key={index} className="blog-post__display">
                <div>
                    <Icon
                        onClick={this.onDelete.bind(this, post._id)} style={{ float: 'left', color: 'red' }} className="ui delete icon" />
                    <Icon
                        onClick={this.onEdit.bind(this, post.task_name, post._id
                        )} style={{ float: 'right', color: 'green' }} className="ui edit icon" />

                    <p style={{ float: 'center' }}>{`${post.task_name}____${post.title}`}</p>
                </div>
            </Card>
        ));
    };
    render() {
        console.log('state', this.state)




        return (

            <div>
                <form onSubmit={this.submit}>

                    <div className="form-input">
                        <Input
                            type='text'
                            name='task_name'
                            placeholder='Enter task name'
                            value={this.state.task_name}
                            onChange={this.handleChange}
                        />

                    </div>
                    <div className="form-input">
                        <Input
                            type='text'
                            name='title'
                            placeholder='Enter title name'
                            value={this.state.title}
                            onChange={this.handleChange}
                        />

                    </div>
                    <br />

                    <Button
                        onClick={this.onUpdate.bind(this, this.state.task_name, this.state.id)}
                    >
                        Update
                </Button>
                    <Button onClick={this.submit}>Submit</Button>
                </form>

                <div className="blog-">
                    {this.displayBlogPost(this.state.items)}
                </div>
            </div>
        )
    }
}

export default Self;
