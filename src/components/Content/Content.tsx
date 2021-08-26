import React from 'react';
import {Photos} from "../../interfaces";
import './content.scss';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import "@fontsource/roboto";

const Content = (props: any) => {
    if (props.error) {
        return (
            <div className="error">Something went wrong 😞. Please try again. Error: {props.error}</div>
        )
    } else if (!props.isLoaded) {
        return <div className="loader">Loading...</div>;
    } else if (props.photos.length === 0) {
        return <p className="message">There are no one photos 😞! Try input another search options!</p>
    }
    return (
        <div className="content-container">
            <div className="content-container__photos">
                {props.photos.map((item: Photos) => (
                    <Card className="content-container__card" key={item.id}>
                        <CardActionArea>
                            <CardMedia
                                className="content-container__media"
                                image={item.img_src}
                                title={item.earth_date}
                            />
                            <CardContent className="content-container__card-content">
                                <Typography gutterBottom variant="h5" component="h2"
                                            className="content-container__typography">
                                    <span>{item.rover.name}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div"
                                            className="content-container__typo-content">

                                    <p><span>Earth date:</span> {item.earth_date}</p>
                                    <p><span>Sol: </span>{item.sol}</p>
                                    <p><span>Camera: </span>{item.camera.full_name}</p>
                                    <p><span>Rover status:</span> {item.rover.status}</p>

                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default Content;
