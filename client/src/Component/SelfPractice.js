
import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Icon, Input, TextArea } from 'semantic-ui-react'


class Self extends Component {
    constructor(props) {

        super(props);
        this.state = {
            title: '',
            author: '',
            body: '',
            task_name: '',
            items: [],
            editData: '',
            id: ''


        }
    }
    componentDidMount() {
        this.getAll()
    }



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
            author: this.state.author,
            body: this.state.body,


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
            task_name: '',
            author: '',
            body: ''
        });
    };

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
    onUpdate = (id, task_name, title, author, body, e) => {
        e.preventDefault()
        const updatedValue = { task_name: task_name, title: title, author: author, body: body }
        axios.put(`api/task/${id}`, updatedValue)
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully updated')
                this.getAll();
                this.resetUserInputs();
            }).catch((error) => {
                console.log(error)
            })

    }

    onEdit = (task_name, id, title, author, body, e) => {
        e.preventDefault()
        this.setState({
            id: id,
            task_name: task_name,
            title: title,
            author: author,
            body: body


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
                        onClick={this.onEdit.bind(this, post.task_name, post._id, post.title, post.author, post.body
                        )} style={{ float: 'right', color: 'green' }} className="ui edit icon" />

                    <p style={{ float: 'center' }}>{`${post.task_name}____${post.title}`}</p>
                    <p >{post.author}</p>
                    <p >{post.body}</p>
                </div>
            </Card>
        ));
    };
    render() {
        console.log('state', this.state)



        const data = this.state
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
                    <div className="form-input">
                        <Input
                            type='text'
                            name='author'
                            placeholder='Enter Author name'
                            value={this.state.author}
                            onChange={this.handleChange}
                        />

                    </div>
                    <div className="form-input">
                        <Input
                            type='text'
                            name='body'
                            placeholder='Enter body details'
                            value={this.state.body}
                            onChange={this.handleChange}
                        />

                    </div>
                    <br />

                    <Button
                        onClick={this.onUpdate.bind(this, data.id, data.task_name, data.title, data.author, data.body)}
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
