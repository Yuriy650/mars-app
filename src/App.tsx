import React, {useEffect, useState} from 'react';
import './App.scss';
import {Photos, Search} from "./interfaces";
import '@material/react-button/index.scss';
import "@fontsource/roboto";
import Content from "./components/Content/Content";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/Header/Header";
import FormSearch from "./components/FormSearch/FormSearch";

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
        e.preventDefault();
        setSearch(search);
        setNewSearch(search);
    }
    useEffect(() => {
        fetchPhotos()

        async function fetchPhotos() {
            const KEY = '7M7W1a3vuOBHckG58f8MsAcCeeTe9Oqn0SUfStg5';

            try {
                const res = await fetch(
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${KEY}`
                );
                setIsLoaded(true);
                const data = await res.json();
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
                <Header/>
                <FormSearch
                    onChange={onChange}
                    onSubmitHandler={onSubmitHandler}
                    search={search}
                    sol={sol}/>
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
