import React, {useEffect, useState} from 'react';
import './App.scss';
import {Photos, Search} from "./interfaces";
//import {Button} from "@material/react-button";
import Select from '@material-ui/core/Select';
import '@material/react-button/index.scss';
import "@fontsource/roboto";
import {
    Button,
    FormControl,
    InputLabel,
    TextField,
} from "@material-ui/core";
import Content from "./components/Content/Content";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/Header/Header";

function App() {
    const defaultSearch: Search = {
        rover: 'curiosity',
        camera: 'FHAZ',
        sol: 999
    }
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [search, setSearch] = useState(defaultSearch);
    const [newSearch, setNewSearch] = useState<null | Search>(null)
    const {rover, camera, sol} = search;
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [photosPerPage] = useState<number>(8);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const lastPhotosIdx = currentPage * photosPerPage;
    const firstPhotosIdx = lastPhotosIdx - photosPerPage;
    const currentPhotos = photos.slice(firstPhotosIdx, lastPhotosIdx)

    const onChange = (e: any) => {
        setSearch((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        setSearch(search)
        setNewSearch(search)
        console.log(newSearch)
    }
    useEffect(() => {
        fetchPhotos()

        async function fetchPhotos() {
            const KEY = '7M7W1a3vuOBHckG58f8MsAcCeeTe9Oqn0SUfStg5';

            try {
                const res = await fetch(
                    /*`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=999&page=2&api_key=${KEY}`*/
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${KEY}`
                );
                setIsLoaded(true);
                const data = await res.json();
                console.log(data)
                setPhotos(data.photos);
            } catch (err) {
                setError(err.message)
            }
        }

        setIsLoaded(false);
setLoadMore(false);
        //eslint-disable-next-line
    }, [newSearch])

    const getPageNumber = (pageNumber: number) => setCurrentPage(pageNumber)
    const changeLoad = (load: boolean) => setLoadMore(load)

    return (
        <div className="app-container">
            <div className="app-container__body">
                <Header />
                <div className="app-container__form">
                    <form onSubmit={onSubmitHandler}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">Rover</InputLabel>
                            <Select
                                className="app-container__form-item"
                                native
                                name="rover"
                                onChange={onChange}
                                label="Rover"
                                inputProps={{
                                    name: 'rover',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value=""/>
                                <option value="curiosity">Curiosity</option>
                                <option value="opportunity">Opportunity</option>
                                <option value="spirit">Spirit</option>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">Camera</InputLabel>
                            <Select
                                className="app-container__form-item"
                                native
                                name="camera"
                                onChange={onChange}
                                label="Camera"
                                inputProps={{
                                    name: 'camera',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value=""/>
                                <option value="FHAZ">FHAZ</option>
                                <option value="RHAZ">RHAZ</option>
                                <option value="MAST">MAST</option>
                                <option value="CHEMCAM">CHEMCAM</option>
                                <option value="MAHLI">MAHLI</option>
                                <option value="MARDI">MARDI</option>
                                <option value="NAVCAM">NAVCAM</option>
                                <option value="PANCAM">PANCAM</option>
                                <option value="MINITES">MINITES</option>
                            </Select>
                        </FormControl>
                        <div className="app-container__form-item-textField">
                            <TextField id="outlined-basic"
                                       className="app-container__form-item"
                                       label="Sol"
                                       variant="outlined"
                                       type="number"
                                       name='sol'
                                       value={sol}
                                       onChange={onChange}/>
                        </div>
                        <div className="app-container__form-item">
                        <Button variant="outlined" color="primary" type="submit" className="app-container__btn">Search</Button>
                        </div>
                    </form>
                </div>
                <Content
                    photos={currentPhotos}
                    isLoaded={isLoaded}
                    error={error}/>
                <Pagination
                    photosPerPage={photosPerPage}
                    totalPhotos={photos.length}
                    getPageNumber={getPageNumber}
                    loadMore={loadMore}
                    changeLoad={changeLoad}/>
            </div>
        </div>
    );
}

export default App;
