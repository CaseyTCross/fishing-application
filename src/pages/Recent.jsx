import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import fishImage from '../assets/fish1.jpg';

function Recent() {

    return (
        <Card style={{maxWidth: '90%', textAlign: "center", marginTop: '10px'}}>
            <Card.Img variant="top" src={fishImage} width={'30%'} />
            <Card.Body>
                <Card.Title>Northern Pike</Card.Title>
                <Card.Text>Sucker in middle of channel</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Spinner | Primary/Secondary Color: Yellow/Yellow</ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Recent;