import React, {useEffect, useState, useContext} from 'react'
import Issue from '../components/issue/Issue'
import { Link } from 'react-router-dom'
import { Session } from "../context/sessionContext"
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import getPriorities from '../utils/getPriorities'
import getIssues from '../utils/getIssues'

const Issues = () => {
  const {userSession:token, list, setPrioritiesInStorage} = useContext(Session);
  const [issues, setIssues] = useState([])
  useEffect(() => {
    getIssuesList();
    getPriorityList();
  }, [])

  useEffect(() => {
    getIssuesList();
  }, [list])

  const getPriorityList = async () =>
  {
    const priorityList = await getPriorities(token);
    if(priorityList){
      setPrioritiesInStorage(priorityList);
    }
  }

  const getIssuesList = async () =>
  {
    const issues = await getIssues(token)
    if(issues){
      setIssues(issues)
    }
  }
  
  return (
    <div className='container'>
      <h2>Issues</h2>
      <div className='container__issues'>
        <h3>Hi user!</h3>
        <div className='container__issues__link'>
          <Link to='/issues/new'>Create <HiOutlineArrowNarrowRight></HiOutlineArrowNarrowRight></Link>
        </div>
        <div className='container__issues__list'>
          {
            issues && (
              issues.length > 0? (
                issues.map(issue =>{
                  return (
                    <Issue key={issue.id} data={issue}></Issue>
                    )
                  })) : <div className='emptyIssues'>
                          <h3>You haven't issues yet ...</h3> 
                        </div> 
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Issues