import React, { useState } from "react";
import { Image, Card, Button, Carousel, Modal } from "react-bootstrap";
import Table from 'react-bootstrap/Table';








function FishDisplay({ fishObject }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    

    return (
        <>
            <Card style={{ width: '30%', margin: '0 auto',  }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Species</th>
                            <th>Length</th>
                            <th>Weight</th>
                            <th>Lake</th>
                            <th>Fisherman</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{fishObject.fishType}</td>
                            <td>{fishObject.length} Inches</td>
                            <td>{fishObject.weight} Pounds</td>
                            <td>{fishObject.lakeName}</td>
                            <td>{fishObject.fisherman}</td>
                        </tr>
                    </tbody>
                </Table>
                {/* <Card.Title>Caught By: {fishObject.fisherman}</Card.Title> */}
                <Card.Img variant="top" src={fishObject.mainPhotoUrl} onClick={() => openModal(fishObject.mainPhotoUrl)} style={{ width: '90%', margin: '0 auto' }} />
                <div style={{display: 'flex', margin: '1%',}}>
                <Carousel interval={null} style={{ width: '60%', margin: '0' }}>
                    {fishObject.secondaryPhotoUrls.map((image, index) => (
                        <Carousel.Item key={index}>
                            <Image src={image} onClick={() => openModal(image)} style={{ width: '100%', cursor: 'pointer' }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Table >
                    <thead>
                        <tr>
                            <th>Time of Catch</th>
                            <th>Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Image src={"https://cross-fishing.nyc3.cdn.digitaloceanspaces.com/weather_icons/" + fishObject.currentWeatherIconNum + ".png" } alt="No Data"/></td>
                            <td><Image src={"https://cross-fishing.nyc3.cdn.digitaloceanspaces.com/weather_icons/" + fishObject.dayWeatherIconNum + ".png" } alt="No Data"/></td>
                        </tr>
                        <tr>
                            <td>{fishObject.currentTemp}°F </td>
                            <td>{fishObject.dayWeatherTempMin} - {fishObject.dayWeatherTempMax}°F  </td>  
                        </tr>
                        <tr>
                            <td>{fishObject.currentWindSpeed}mph {fishObject.currentWindDirection} </td>
                            <td>{fishObject.dayWeatherWindSpeed}mph {fishObject.dayWeatherWindDirection}  </td>  
                        </tr>
                    </tbody>
                </Table>
                </div>
                <Card.Title>{fishObject.dayWeatherSummary}</Card.Title>
                <br/>
                <Card.Title>More Catch Details</Card.Title>
                <Table >
                    <thead>
                        <tr>
                            <th>Upload Date</th>
                            <th>Lure/Bait Type</th>
                            <th>Lure Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{fishObject.uploadDate}</td>
                            <td>{fishObject.lureType}</td>
                            <td>{fishObject.lureColor}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Text>Notes:</Card.Text>
                <Card.Text>{fishObject.notes}</Card.Text>

                

            </Card>
            <Modal show={showModal} onHide={closeModal} size="lg">
                <Modal.Body style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={selectedImage} fluid style={{ maxHeight: '80vh', maxWidth: '80vw', objectFit: 'contain' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal} style={{ fontSize: '1.5rem' }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FishDisplay;
