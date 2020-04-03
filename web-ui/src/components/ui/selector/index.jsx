import React from 'react';
import Form from 'react-bootstrap/FormControl';

const Selector = (props) => {
    return (
        <Form>
            <Form.Group controlId = "ControlSelect">
                <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default Selector;