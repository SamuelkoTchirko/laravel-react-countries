import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

//Components
import Navigation from '../../components/Navigation';
import Pagination from 'react-js-pagination';


function List() {

    const [continents, setContinents] = useState([]);

    const [countries, setCountries] = useState();
    const [order, setOrder] = useState("");
    const [continent, setContinent] = useState("");

    //Get data from API
    function getContinents(){
        axios.get(`/api/continents`)
        .then(resp => {
            setContinents(resp.data);
        })
    }

    //Fetch data from API
    function fetchData(order = "", continent = "", pageNumber = 1){
        axios.get(`/api/countries?page=${pageNumber}`, {
            params: {
              order: order,
              continent: continent
            }
        }).then(resp => {
            setCountries(resp.data);
        })
    }


    //Render results with pagination
    function renderCountryList(){

        const { data, current_page, per_page, total } = countries;

        return(
            <>
                <div>
                    <ul className="list-group">
                        {data.map((country, id) => {
                            return <li className="list-group-item" key={id}>
                                        <Link to="/detail" state={{ id: country.country_id }}>{country.name}</Link>
                                    </li>
                        })}
                    </ul>
                </div>
                <div className="mt-3">
                    <Pagination 
                        activePage={current_page}
                        totalItemsCount={total}
                        itemsCountPerPage={per_page}
                        onChange={(pageNumber) => fetchData(order, continent, pageNumber)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </div>
            </>
        )
    }

    useEffect(() => {
        fetchData(order, continent);
        getContinents();
    }, [order, continent])


    return (
        <>
            <Navigation />
            <div className="container">
                <div className="row justify-content-center margin-top-15">
                    <div className="col-md-8">
                        <h1>Countries</h1>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5">
                    <div className="col-md-2">
                        <p>Order by:</p>
                    </div>
                    <div className="col-md-6">
                        <select className="form-select" aria-label="Order Select" value={order} onChange={(e) => {setOrder(e.target.value)}}>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="">Default</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5">
                    <div className="col-md-2">
                        <p>Continent:</p>
                    </div>
                    <div className="col-md-6">
                        <select className="form-select" aria-label="Continent Select" value={continent} onChange={(e) => {setContinent(e.target.value)}}>
                            {continents.map((continent, id) => {
                                return  <option value={continent.code} key={id}>{continent.name}</option>
                            })}
                            <option value="">All</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center margin-top-5 margin-bottom-10">
                    <div className="col-md-8">
                        { countries && renderCountryList() }
                    </div>
                </div>
            </div>
        </>
    );
}

export default List;
