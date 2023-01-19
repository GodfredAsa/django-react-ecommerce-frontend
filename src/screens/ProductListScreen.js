import React from 'react'
import { useEffect} from "react";
import {Button, Table, ButtonGroup, Row, Col, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {useDispatch, useSelector} from "react-redux";
import {ListProducts, DeleteProduct}  from '../actions/ProductActions'
import { useNavigate } from 'react-router-dom';


export default function ProductListScreen() {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    
    const deleteProduct = useSelector(state => state.deleteProduct);
    const {loading: loadingDelete, error: errorDelete, successDelete} = deleteProduct;

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(ListProducts())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate, successDelete])

    const deleteProductHandler = (id) => {
        if(window.confirm("Are you Sure in deleting a product")){
           dispatch(DeleteProduct(id));
           window.location.reload()
        }
    }

    const createProductHandler = (product) => {
        console.log("Creating Product ...")
    }

  return (
    <div>

   <Row className='align-items-center'>
     <Col> <h1>Products</h1></Col>
     <Col className='text-right'> 
        <Button className='my-3' onClick={createProductHandler}> <span style={{'fontSize': '1.5rem'}}>+</span> Create Product </Button>
        </Col>
   </Row>

   {loadingDelete && <Loader/>}
   {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

    {loading ? <Loader/> 
    : error ? <Message variant="danger">{error}</Message> 
    : <Table  bordered hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Stock</th>
                <th>IMAGE</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
           {products &&  products.map(product => 
           <tr key={product._id}>
                <td>{product._id}</td> 
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>
                <td> <img src={product.image} alt={product.name} style={{'width': '55%',"height": '20px' }}/></td>

                <td>
                <ButtonGroup style={{'fontSize': '1rem'}}>
                       <LinkContainer to={`/product/${product._id}/edit`}  >
                            <Button 
                                className='btn-sm' 
                                variant='success' 
                                type='button'> Edit
                            </Button>
                       
                       </LinkContainer>
                       <Button 
                                className='btn-sm' 
                                variant='info' 
                                type='button'> View
                       </Button>
                        <Button 
                            className='btn-sm' 
                            variant='danger' 
                            type='button'
                            onClick={() => deleteProductHandler(product._id)}
                            >Delete
                        </Button>
                    </ButtonGroup>

                </td>


                


    
            </tr>)}
        </tbody>
      </Table>}
</div>
  )
}


