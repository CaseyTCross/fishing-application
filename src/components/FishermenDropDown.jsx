import { Form } from "react-bootstrap";
import Fishermen from "../assets/Fishermen";

function FishermenDropDown(props) {
  return (
    <Form.Select aria-label="Default select Example" onChange={props.onChange}>
      <option>Select Fisherman</option>
      {Fishermen.map((Fishermen, index) => (
        <option key={index} value={Fishermen}>
          {Fishermen}
        </option>
      ))}
    </Form.Select>
  );
}

export default FishermenDropDown;
