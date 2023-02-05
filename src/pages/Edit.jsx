import React, {useEffect, useState ,useContext} from 'react'
import {useParams} from 'react-router-dom'
import getIssue from '../utils/getIssue'
import { Session } from '../context/sessionContext'
import updateIssuePriority from '../utils/changePriority'
import getPriorities from '../utils/getPriorities'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'

const Edit = () => {

  const {userSession:token , priorities} = useContext(Session);
  const params = useParams();
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentIssue, setCurrentIssue] = useState({});
  const [pending , setPending] = useState(false);
  const [buttonStatus , setButtonStatus] = useState('UPDATE');

  const getPriorityList = async () =>
  { 
    const priorityList = await getPriorities(token);
    if(priorityList){
      setSelectOptions(priorityList);
      setPrioritiesInStorage(priorityList);
      return
    }
  }

  const getAnIssue = async () =>
  {
    if(params && params.id){
      const issue = await getIssue(params.id, token);
      if(issue){
        setSelectedOption(issue.priority_id);
        setCurrentIssue(issue)
      }
    }
  }

  useEffect(() => {
    if(priorities && priorities.length === 0){
      getPriorityList();
    } else if(priorities){
      setSelectOptions(priorities)
    }
    getAnIssue()
  }, [])

  const handleChange = (e) =>
  {
    const value = e.target.value;
    setSelectedOption(value);
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setButtonStatus('UPDATATING...');
    setPending(true);  
    const form = {
      name: currentIssue.name,
      description: currentIssue.description,
      priority_id: Number(selectedOption)
    }
    const isEdited = await updateIssuePriority(params.id, form, token);
    if(isEdited){
      setTimeout(() => {
        toast.success('Successfully edited!', {
          position: "bottom-center",
          duration: 2000,
          style: {
              fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
        });
        setButtonStatus('UPDATE')
        setPending(false); 
      }, 700);
    }else{
      setTimeout(() => {
        toast.error('Failed to update!', {
          position: "bottom-center",
          duration: 3500,
          style: {
              fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
        });
        setButtonStatus('UPDATE')
        setPending(false);
      }, 700);
    }
  }
  
  return (
    <div className='container'>
      <h2 style={{padding:'0 25px'}}>Edit issue #{params.id}</h2>
      <form onSubmit={handleSubmit}>
        <label>Change priority</label>
        <select name='priority_id' onChange={handleChange} value={selectedOption}> 
          {selectOptions && (selectOptions.map((option) => (<option key={option.id} value={option.id}> {option.type} </option>)))} 
        </select>
        <input type='submit' value={buttonStatus} disabled={pending}/>
      </form>
      <div className='container__redirect' style={{marginTop: '1.5em'}}>
        <Link to='/issues'><HiOutlineArrowNarrowLeft></HiOutlineArrowNarrowLeft>Issues</Link> 
      </div>
      <Toaster/>
    </div>
  )
}

export default Edit