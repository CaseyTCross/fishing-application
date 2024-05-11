import { Form } from 'react-bootstrap';
import lakes from './../assets/Lakes';
import { useState } from 'react';

function LakesDropDown(props) {
    

    
      
    return (
        
        <Form.Select aria-label="Default select Example" onChange={props.onChange}>
            <option>Select Lake</option>
            {lakes.map((lake, index) => (
                <option key={index} value={index}>
                    {lake.name}
                </option>
            ))}
        </Form.Select>
        
    )
}

export default LakesDropDown;