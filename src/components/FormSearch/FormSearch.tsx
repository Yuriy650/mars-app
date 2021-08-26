import React from 'react';
import './formSearch.scss';
import {Button, FormControl, InputLabel, TextField} from "@material-ui/core";
import Select from "@material-ui/core/Select";

const FormSearch = (props: any) => {
    return (
        <div className="container">
            <div className="container__form">
                <form onSubmit={props.onSubmitHandler}>
                    <FormControl variant="outlined" focused>
                        <InputLabel htmlFor="outlined-age-native-simple">Rover</InputLabel>
                        <Select
                            className="container__form-item"
                            native
                            name="rover"
                            onChange={props.onChange}
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
                    <FormControl variant="outlined" className="app-container__control" focused>
                        <InputLabel htmlFor="outlined-age-native-simple">Camera</InputLabel>
                        <Select
                            className="container__form-item"
                            native
                            name="camera"
                            onChange={props.onChange}
                            label="Camera"
                            displayEmpty
                            inputProps={{
                                name: 'camera',
                                id: 'outlined-age-native-simple',
                                color: 'red'
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
                    <div className="container__form-item-textField">
                        <TextField id="outlined-basic"
                                   focused
                                   className="container__form-item"
                                   label="Sol"
                                   variant="outlined"
                                   type="number"
                                   name='sol'
                                   value={props.sol}
                                   onChange={props.onChange}/>
                    </div>
                    <div className="container__form-item">
                        <Button variant="outlined" color="primary" type="submit"
                                className="container__btn">Search</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default FormSearch;
