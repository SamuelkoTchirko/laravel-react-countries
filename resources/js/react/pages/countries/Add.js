import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

//Toasts
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Navigation from '../../components/Navigation';


function Add() {

    let navigate = useNavigate();

    const [continents, setContinents] = useState([]);

    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [code, setCode] = useState("");
    const [iso, setIso] = useState("");
    const [number, setNumber] = useState("");
    const [continent, setContinent] = useState("");
    const [displayOrder, setDisplayOrder] = useState("");



    //Get data from API
    function getContinents(){
        axios.get(`/api/continents`)
        .then(resp => {
            setContinents(resp.data);
        })
    }


    function validateCountryData(name, fullName, code, iso, number, continent, displayOrder){

        if(name && fullName && code && iso && number && continent){
            if(code.length != 2){
                toast.error("Code has to be 2 characters long !", {
                    position: toast.POSITION.TOP_CENTER
                });

                return false
            }else{
                if(iso.length != 3){
                    toast.error("ISO3 has to be 3 characters long !", {
                        position: toast.POSITION.TOP_CENTER
                    });
    
                    return false
                }else{
                    if(isNaN(number) || number.length > 3){
                        toast.error("Number must be at most a three-digit number !", {
                            position: toast.POSITION.TOP_CENTER
                        });
        
                        return false
                    }else{
                        if(displayOrder){
                            if(isNaN(displayOrder) || displayOrder.length > 3){
                                toast.error("Display order must be at most a three-digit number !", {
                                    position: toast.POSITION.TOP_CENTER
                                });

                                return false
                            }else{
                                return true
                            }
                        }else{
                            return true
                        }
                    }
                }
            }
        }else{
            toast.error("Please, fill all of the inputs !", {
                position: toast.POSITION.TOP_CENTER
            });

            return false
        }
    }


    const handleForm = () => {
        if(validateCountryData(name, fullName, code, iso, number, continent, displayOrder)){
            axios.post('/api/country', {
                name: name,
                full_name: fullName,
                code: code,
                iso3: iso,
                number: parseInt(number),
                continent_code: continent,
                display_order: parseInt(displayOrder)
            }).then(() => {
                navigate('/');
            }).catch((error) => {
                toast.error("Server: "+error, {
                    position: toast.POSITION.TOP_CENTER
                });
            });
        }
    };


    //On reload
    useEffect(() => {
        getContinents();
    }, [])


    return (
        <>
            <Navigation />
            <form>
            <div className="container">
                <div className="row justify-content-center margin-top-15">
                    <div className="col-md-8">
                        <h1>Add Country</h1>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="name" placeholder="Slovakia" onChange={(e) => {setName(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="full-name" className="form-label">Full name:</label>
                            <input type="text" className="form-control" id="full-name" placeholder="Slovak republic" onChange={(e) => {setFullName(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Code:</label>
                            <input type="text" className="form-control" id="code" placeholder="SK" onChange={(e) => {setCode(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="iso3" className="form-label">ISO3:</label>
                            <input type="text" className="form-control" id="iso3" placeholder="SVK" onChange={(e) => {setIso(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Number:</label>
                            <input type="text" className="form-control" id="number" placeholder="999" onChange={(e) => {setNumber(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="displayOrder" className="form-label">Display order:</label>
                            <input type="text" className="form-control" id="displayOrder" placeholder="1" onChange={(e) => {setDisplayOrder(e.target.value)}} required/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <label htmlFor="continent" className="form-label">Continent:</label>
                        <select className="form-select" id="continent" aria-label="continent-select" onChange={(e) => {setContinent(e.target.value)}} required>
                            <option value="">Select continent</option>
                            {continents.map((continent, id) => {
                                return  <option value={continent.code} key={id}>{continent.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center">  
                    <div className="col-md-8">
                        <button type="button" className="btn btn-dark margin-top-5 margin-bottom-10" onClick={handleForm}>Save</button>
                    </div>  
                </div>
            </div>
            </form>
        </>
    );
}

export default Add;
