import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const searcchKeywordHandler = (e) => {
    setKeyword(e.target.value);
    setSearchParams(e.target.value);
    navigate(`/?keyword=${e.target.value}&page=1`);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(location.pathname);
    }
  };
  return (
    <Table className="table-sm outline-none">
        <tr>
          <td style={{'borderTop': 'none'}}>
            <Form onSubmit={searchSubmitHandler} >
              <Form.Control
                style={{ 
                    borderRadius: "5px", 
                    border: "2px solid lemon", 
                    width: '100%',
                    height: '45px',
                    letterSpacing: '1px',
                    fontFamily: 'Sans',
                    fontSize: '20px',
                    padding: "50px auto"
                 }}
                 size="md"
                //  className ="form-lg"
                type="text"
                placeholder="search item"
                name="q"
                onChange={searcchKeywordHandler}
              ></Form.Control>
            </Form>
          </td>
          <td style={{'borderTop': 'none'}}>
            <Button 
                type="submit"  
                variant="outline-success" 
                className="p-2 mt-1">
              Search
            </Button>
          </td>
        </tr>
    </Table>
  );
}

export default SearchBox;

{
  /* <Form onSubmit={searchSubmitHandler} inline>
        <Form.Control style={{'borderRadius': '5px', 'border': '2px solid lightgreen'}}
            type='text'
            name='q'
            className='mr-sm-2 ml-sm-5'
            onChange = {searcchKeywordHandler}
        >
        </Form.Control>

        <Button 
            type='submit'
            variant='outline-success'
            className='p-2'
        >Search</Button>
      
    </Form> */
}
