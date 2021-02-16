import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import { text } from '@fortawesome/fontawesome-svg-core';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    constructor(){
        super()
        this.state = {
            uploadedFiles:[],
            uploading: false       
        }
    }

    onDrop = (files) =>{
        console.log('files',files)
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);

        axios.post('/api/users/uploadimage',formData,config)
        .then(response => {
            //console.log(response.data);
            this.setState({
                uploading: false,
                uploadedFiles: [
                    ...this.state.uploadedFiles,
                    response.data
                ]
            });
            console.log(this.state.uploadedFiles)
            this.props.imagesHandler(this.state.uploadedFiles)
           
        }, () => console.log(this.state.uploadedFiles),
            () => this.props.imagesHandler(this.state.uploadedFiles)
        )

        console.log(this.state.uploadedFiles);
    }

    onRemove = (id) =>{
        axios.get(`/api/users/removeimage?public_id=${id}`)
        .then(response =>{
            let images = this.state.uploadedFiles.filter(item => {
                return item.public_id !== id;
            });
        })
    }
    showUploadImages = () => (
        this.state.uploadedFiles.map(item =>(
            <div className='dropzone_UploadedImg_wrapper'
                key={item.public_id}
                onClick={() => this.onRemove(item.public_id)}
            >
                <div className='wrap'
                    style={{ backgroundImage: `url(${item.url}) `,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '5px', 
                            width: '200px',
                            height:'200px'}}
                ></div>
            </div>
        ))
    )

    render() {
        return (
            <div>
                <section>
                   <div className='dropzone clear'>
                        <Dropzone 
                            onDrop={(e) => this.onDrop(e)}
                            multiple={false}
                            className='dropzone_box'>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} className="dropzone_container">
                                        <input {...getInputProps()} />
                                        <div {...getRootProps} className='dropzone_Add_button'>
                                            <FontAwesomeIcon
                                                icon={faPlusCircle} />
                                        </div>
                                        {
                                            this.showUploadImages()
                                        } 
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {
                            this.state.uploading ?
                            <div className='dropzone_box'
                                style={{
                                    textAlign: 'center',
                                    paddingTop: '60px ',
                                }}>
                                <CircularProgress
                                    style={{
                                        color: '#334578',
                                        thickness: 7
                                    }}
                                />
                            </div>
                            :null
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default FileUpload;