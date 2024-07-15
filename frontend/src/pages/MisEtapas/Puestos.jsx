// src/pages/Stages.jsx
import React, { useContext, useEffect, useState } from 'react';
import pos1 from '../../assets/pos1.jpg'
import pos2 from '../../assets/pos2.jpg'
import SideBar from '../../components/SideBar';
import axiosBase from "../../axios/axiosBase";
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const Puestos = () => {
  const { user } = useContext(UserContext);
  const [listaResorts, setListaResorts] = useState([])
  const [selectedJob, setSelectedJob] = useState(user.job)
  const [selectedEmployer, setSelectedEmployer] = useState(user.employer)

    useEffect(()=> {
        obtenerResorts()
    }, [])

    const obtenerResorts = async () => {
        const response = await axiosBase.get("/resorts")
        setListaResorts(response.data)
        
    }

    const selectJob = async (name, title) => {
        const response = await axiosBase.put(`/users/${user._id}/job`,{
            name,
            title
        })
        setSelectedEmployer(response.data.employer)
        setSelectedJob(response.data.job)
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:5001/api/users/${user._id}`)
        setSelectedEmployer(response.data.employer)
        setSelectedJob(response.data.job)
      }
    
      useEffect(() => {
        fetchUser();
      }, []);

  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Puestos</h2>
            <div className='grid grid-cols-2'>
                {
                    listaResorts.map((resort) => {
                        return <div key={resort._id}>
                            <h3 className='text-xl'><b>{resort.name}</b></h3>
                            {
                                resort.jobs.map((job) => {
                                    return <div className='my-2 ms-2' key={job._id}>
                                        <p className="text-lg mb-1">{job.title}</p>
                                        <p className='ms-1'>{job.description}</p>
                                        <p className='ms-1'>Salario: ${job.salary}</p>
                                        {
                                            selectedJob == job.title && selectedEmployer == resort.name ?
                                            <button disabled className='bg-gray-500 p-1 rounded text-white'>Empleo escogido</button> :
                                            <button className='bg-marron p-1 rounded text-white' onClick={()=>selectJob(resort.name,job.title)}>Escoger empleo</button>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                    
                }
            </div>
        </section>
    </div>
  );
};

export default Puestos;

