import React, { useState , useEffect} from 'react';
import { Button,  Modal } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'
import {firestore} from '../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

function Createdocs() {
  const postData = async()=>{
    await addDoc(docsCollectionRef,{
      title:docTitle,
      discription:""
    })
    setReaload(docTitle)
  }

    const [show, setShow] = useState(false);
    const [allDocs,setAllDocs] = useState([])
    const [docTitle,setDocTitle] = useState("")
    const [reload,setReaload] = useState('')


    const docsCollectionRef = collection(firestore,'documents')

    const getAllDocs = async()=>{
      const docsData = await getDocs(docsCollectionRef)
      const data = docsData.docs.map(doc =>(
        {
          ...doc.data(),
          id:doc.id
        }
      ))
      setAllDocs(data)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()
    const handleEdit = (data) =>{
      navigate('/changebox',{state:data})
    }

    const deleleDocs = async(id)=>{
      const oneDoc = doc(firestore,'documents',id)
      await deleteDoc(oneDoc)
      setReaload(id)
    }

    const handleAdd = () =>{
      postData()
      alert(`Document ${docTitle} added successfully`)
      setShow(false);
    } 

    const handleChange =(e)=>{
      setDocTitle(e)
    }


    useEffect(()=>{
      getAllDocs()
    },[reload])
    return (
        <>

            <div>
                <button className='btn btn-primary' style={{marginLeft:'700px',fontFamily:'-moz-initial'}} onClick={handleShow}>+ Add Documents</button>
            </div>
            <Modal size='lg'centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New documents</Modal.Title>
        </Modal.Header>
        <Modal.Body> <input type="text"  style={{width:'100%'}}    onChange={(e)=>handleChange(e.target.value)}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div  className="row ms-5">
          {allDocs?.length>0?allDocs.map((item)=>(
            <div key={item.id} className="col-lg-4 mb-4 mt-4"   >
            <div style={{height:'170px',border:'2px,solid,black',borderRadius:'30px',backgroundColor:'white'}}  className='brd rounded  shadow'>
              <div style={{backgroundColor:'white'}} className='d-flex justify-content-between px-3 py-2'>
                <h4 style={{backgroundColor:'white'}} className='mb-0'>{item.title}</h4>
                <div className='d-flex justify-content-center align-items-center'>
                  <button onClick={()=>handleEdit(item)} className='btn'><i className="fa-solid fa-pen-to-square text-info"></i></button>
                  <button onClick={()=>deleleDocs(item.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
              </div>
              <p style={{textAlign:'justify',backgroundColor:'white'}} className='px-3'>{item.discription.replace(/<[^>]+>/g, '')}</p>
            </div>
          </div>
           ))
           :
           <div></div>
           }
          </div> 
        </>
    )
}

export default Createdocs;