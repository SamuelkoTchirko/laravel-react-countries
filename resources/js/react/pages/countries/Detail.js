import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom'

//Components
import Navigation from '../../components/Navigation';


function Detail() {

    const location = useLocation()
    const { id } = location.state;

    const [country, setCountry] = useState("");


    //Fetch data from API
    function fetchData(id){
        axios.get(`/api/country/${id}`)
        .then(resp => {
            //console.log(resp.data[0])
            setCountry(resp.data[0]);
        })
    }


    //On reload
    useEffect(() => {
        if(!country){
            fetchData(id);
        }
    }, [country])


    return (
        <>
            <Navigation />
            <div className="container">
                <div className="row justify-content-center margin-top-15">
                    <div className="col-md-8">
                        <h1 className='fw-bold'>{country.name}</h1>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5">
                    <div className="col-md-2">
                        <h3 className='fw-bold'>Full name:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4'>{country.full_name}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-2">
                        <h3 className='fw-bold'>Continent:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4'>{country.continent_name}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-2">
                        <h3 className='fw-bold'>Abbrev. iso3:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4'>{country.iso3}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                     <div className="col-md-2">
                        <h3 className='fw-bold'>Country ID:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4'>{country.country_id}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                     <div className="col-md-2">
                        <h3 className='fw-bold'>Code:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-4'>{country.code}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                     <div className="col-md-2">
                        <h3 className='fs-5'>Number:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-5'>{country.number}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                     <div className="col-md-2">
                        <h3 className='fs-5'>Display order:</h3>
                    </div>
                    <div className="col-md-6">
                        <p className='fs-5'>{country.display_order}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;