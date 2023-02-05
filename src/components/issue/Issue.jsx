import React , {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './issue.css'
import { Session } from "../../context/sessionContext"
import DeleteIssue from '../../utils/deleteIssue'
import {AiOutlineClockCircle} from 'react-icons/ai'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import toast, { Toaster } from 'react-hot-toast'
import getPriorities from '../../utils/getPriorities'

const Issue = ({data}) => {
  const {userSession:token, list, renderList, priorities} = useContext(Session);
  const { id, name, description, priority_id } = data;
  const [priorityType, setPriorityType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const MySwal = withReactContent(Swal)

  const setPriority = (priorityList) =>
  { 
    if(priorityList){
      const {type} = priorityList.find(priority => priority.id === priority_id)
      const colors = ['FF8300','ff0000','1798B5','B51749','E2F87D','63D93E'];
      if(priority_id === 1) setSelectedColor(colors[2])
      if(priority_id === 2) setSelectedColor(colors[1])
      if(priority_id === 3) setSelectedColor(colors[0])
      if(priority_id === 4) setSelectedColor(colors[5])
      setPriorityType(type)
    }
  }

  const getPriorityList = async () =>
  { 
    const priorityList = await getPriorities(token);
    if(priorityList){
      setPriority(priorities);
      setPrioritiesInStorage(priorityList);
      return
    }
  }
  
  useEffect(() => {
    if(priorities && priorities.length === 0){
      getPriorityList();
    } else if(priorities){
      setPriority(priorities);
    } 
  }, [])

  const handleDelete = () =>
  {
    MySwal.fire({
      showCancelButton: true,
      confirmButtonText: 'Remove',
      confirmButtonColor: '#e6007a',
      html: `<h4>Do you want to remove issue #${id}?</h4>`,
    }).then( async (result) => {
      if (result.isConfirmed) {
        const isDeleted = await DeleteIssue(token,id);
        if(isDeleted){
          renderList(!list)
          toast.success('Delete successful!', {
            position: "bottom-center",
            duration: 3500,
            style: {
                fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
          });
        } 
      }
    })
  }

  return (
    <div className='issue'>
        <h4>#{id} {name}</h4>
        <hr></hr>
        <h4>{description}</h4>
        <h4 className='priority'><AiOutlineClockCircle style={{color:`#${selectedColor}`}}></AiOutlineClockCircle>{priorityType}</h4>
        <div>
          <Link to={`/issues/edit/${id}`}>Editar</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <Toaster/> 
    </div>
  )
}

export default Issue