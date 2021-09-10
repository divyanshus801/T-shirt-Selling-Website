import React,{useState, useEffect} from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
    
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllproduct = () => {
      getProducts().then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setProducts(data)
        }
      });
  };

  useEffect(() => {
    loadAllproduct();
  }, [])

    return (
        <Base tittle="All tshirts" description="Welcome to the Tshirt store"
        >
            <div className="row text-center">
              <h1><br></br></h1>
              <div className="row">
                {products.map((product, index)=> {
                  return (
                    <div key={index} className="col-4 mb-4">
                      <Card product={product} />
                    </div>
                  )
                })}
              </div>
            </div>
        </Base>
    )
}
