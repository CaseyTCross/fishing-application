import { Form } from "react-bootstrap";
import FishTypes from "../assets/FishTypes";

function FishTypesDropDown(props) {
  return (
    <Form.Select aria-label="Default select Example" onChange={props.onChange}>
      <option>Select Fish</option>
      {FishTypes.map((FishType, index) => (
        <option key={index} value={FishType}>
          {FishType}
        </option>
      ))}
    </Form.Select>
  );
}

export default FishTypesDropDown;
