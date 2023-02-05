import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'


function SearchBox() {
    const [keyword, setKeyword] = useState("");
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()

    console.log(location)

    const searcchKeywordHandler = e => {
            setKeyword(e.target.value);
            setSearchParams(e.target.value);
            navigate(`/?keyword=${e.target.value}&page=1`)

    }


    const searchSubmitHandler = e => {
        e.preventDefault();
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate(location.pathname)
        }
    }
  return (
    <Form onSubmit={searchSubmitHandler} inline>
        <Form.Control
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
      
    </Form>
  )
}

export default SearchBox


