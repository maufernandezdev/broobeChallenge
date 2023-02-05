import React , {useState, useEffect, useContext, useRef} from 'react'
import createIssue from '../utils/createIssue'
import toast, { Toaster } from 'react-hot-toast'
import { Session } from "../context/sessionContext"
import useForm from '../hooks/useForm'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import getPriorities from '../utils/getPriorities'


const New = () => {
  const {userSession:token, priorities} = useContext(Session);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const inputName = useRef(null);
  const inputDesciption = useRef(null);
  const inputPriority = useRef(null);

  const getPriorityList = async () =>
  { 
    const priorityList = await getPriorities(token);
    if(priorityList){
      setSelectOptions(priorityList);
      setPrioritiesInStorage(priorityList);
      return
    }
  }
  
  useEffect(() => {
    if(priorities && priorities.length === 0){
      getPriorityList();
    } else if(priorities){
      setSelectOptions(priorities)
    } 
  }, [])

  const handleChange = (e) =>
  { 
    const value = e.target.value;
    setSelectedOption(value);
    handleInputChange(e);
  }
  const handleSubmit = async (e) =>
  {
    e.preventDefault();   
    values.priority_id = Number(values.priority_id)
    const isCreated = await createIssue(values, token);
    if(isCreated){
      toast.success('Successfully created!', {
        position: "bottom-center",
        duration: 3500,
        style: {
            fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
      });
      inputName.current.value = '';
      inputDesciption.current.value = '';
      inputPriority.current.value = 1;
      setSelectedOption(1)
    }else{
      toast.error('Failed to create!', {
        position: "bottom-center",
        duration: 3500,
        style: {
            fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
      });
    }
  }

  const initialForm = {name:'', description: '', priority_id: 1}
  const { values , handleInputChange , handleBlur} = useForm(initialForm);
  return (
    <div className='container'>
      <h2>New issue</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name='name' ref={inputName} type='text' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Description</label>
        <input name='description' ref={inputDesciption} type='text' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Priority</label>
        <select name='priority_id' ref={inputPriority} onChange={e => handleChange(e)} value={selectedOption}> 
          {selectOptions && (selectOptions.map((option) => (<option key={option.id} value={option.id}> {option.type} </option>)))} 
        </select>
        <input type='submit' value='CREATE'/>
      </form>
      <div className='container__redirect' style={{marginTop: '1.5em'}}>
        <Link to='/issues'><HiOutlineArrowNarrowLeft></HiOutlineArrowNarrowLeft>Issues</Link>   
      </div>
      <Toaster/>
    </div>
  )
}

export default New