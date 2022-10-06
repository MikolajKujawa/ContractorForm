import React, { useEffect, useState } from "react";

import classes from './Form.module.scss'
import Card from "../ui/Card";
import ErrorModal from "../ui/ErrorModal";
import { nipValidation, peselValidation } from "./Validation";

const Form = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('')
    const [enteredType, setEnteredType] = useState('person')
    const [enteredPesel, setEnteredPesel] = useState('')
    const [enteredNip, setEnteredNip] = useState('')
    const [enteredImages, setEnteredImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [error, setError] = useState()

    //Loading a preview photo
    useEffect(() => {
        if(enteredImages.length < 1) return;
        const newImageUrls = [];
        enteredImages.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    }, [enteredImages])

    const clearError = () => {
        setError(null);
    }

    //validation and submission of the form
    const submitHandler = (event) => {
        event.preventDefault()

        if(enteredType === 'person'){
            const peselError = peselValidation(enteredPesel)        
            if(peselError){
                return setError(peselError)
            }  
        }
        if(enteredType ==='company'){
            const nipError = nipValidation(enteredNip)
            if(nipError){
                return setError(nipError)
            }
        }

        const contractorData = {
            name: enteredName,
            lastName: enteredLastName,
            type: enteredType,
            Pesel: enteredPesel,
            nip: enteredNip,
            image: enteredImages
        }

        props.onAddContractor(contractorData)
    }

    return(
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.element}>
                    <label htmlFor="name">Name</label>
                    <input type='text' required id="name" value={enteredName} onChange={event => {setEnteredName(event.target.value)}}/>
                </div>
                <div className={classes.element}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type='text' required id="lastName" value={enteredLastName} onChange={event => {setEnteredLastName(event.target.value)}}/>
                </div>
                <div className={classes.element}>
                    <label htmlFor="type">Type</label>
                    <select id="type" value={enteredType} onChange={event => {setEnteredType(event.target.value)}}>
                        <option value='person'>Person</option>
                        <option value='company'>Company</option>
                    </select>
                </div>
                {enteredType === 'person' &&
                    <div className={classes.element}>
                        <label htmlFor="pesel">PESEL</label>
                        <input type='text' id="pesel" maxLength={11} value={enteredPesel} onChange={event => {setEnteredPesel(event.target.value)}}/>
                    </div>
                }
                {enteredType === 'company' &&
                    <div className={classes.element}>
                        <label htmlFor="nip">NIP</label>
                        <input type='text' id="nip" maxLength={10} value={enteredNip} onChange={event => {setEnteredNip(event.target.value)}}/>
                    </div>
                }
                <div className={classes.element}>
                    <label htmlFor="lastName">Upload Image</label>
                    <input type='file' accept="image/jpg, image/jpeg" onChange={event => {setEnteredImages([...event.target.files])}}/>                    
                </div>
                { imageURLs.map(imageSrc => <img src={imageSrc} alt="Upload_images"/>) }
                <div className={classes.actions}>
                    <button>Add Account</button>
                </div>
            </form>
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
        </Card>        
    )
}

export default Form