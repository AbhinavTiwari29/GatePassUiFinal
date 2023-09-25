import axios from "axios";

export async function getAllOfficers() {
    const response = await fetch('http://172.16.15.42:5500/api/officers/getAll');
    const data = await response.json();
    return data;
  };
  export async function getDailyPass() {
    const response = await fetch('http://172.16.15.42:5500/api/gatePass/visitors/getall?type=daily');
    const data = await response.json();
    // console.log(data)
    return data;
  };

  export async function getAllVendors() {
    try{
      const response = await fetch('http://172.16.15.42:5500/api/authorities/getAll');
      const data = await response.json();
      return data;
    }
    catch(err:any){
      console.log("Error in getting all vendors",err.message)
    }
   
  };

  export async function createMonthlyPass(body:any) {
    try{
      const response = await axios.post('http://172.16.15.42:5500/api/pass/createPassMonthly',body);
      return response.data;
    }catch(err:any){
      console.log("Error in getting all vendors",err.message)
    }
   
  };
  export async function getPassData(params:any) {
    try{
      const response = await axios.get(`http://172.16.15.42:5500/api/pass/getPassDetail/${params}`);
      return response.data
    }catch(err:any){
      console.log("Error in getting all vendors",err.message)
    }
   
  };


  export async function getAllEmployee() {
  try {
    const response = await axios.get('http://172.16.15.42:5500/api/user/getAllEmployee');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get employees');
  }
};

export async function createEmployee(empData: any) {
  try {
    const response = await axios.post('http://172.16.15.42:5500/api/user/createEmployee', empData);
    return response;
  } 
  catch (error) {
    throw new Error('Failed to create employee');
  }
};

export async function getAllMonthlyPasses() {
  const response = await fetch('http://172.16.15.42:5500/api/pass/getAllMonthlyPass');
  const data = await response.json();
  console.log( data)
  return data;
};


export async function createDailyPass(body:any) {
  try{
    const response = await axios.post('http://172.16.15.42:5500/api/gatepass/createDailyPass',body);
    return response.data;
  }catch(err:any){
    alert("Error")
    console.log("Error in posting data",err)
  }
 
};
export async function getDailyPassDetails(params:any) {
  try{
    const response = await axios.get(`http://172.16.15.42:5500/api/gatepass/getDailyPassDetails/${params}`);
    return response.data
  }catch(err:any){
    console.log("Error in getting all vendors",err.message)
  }
 
};

export async function getAllDailyPasses() {
  const response = await fetch('http://172.16.15.42:5500/api/gatepass/getAllDailyPassDetails');
  const data = await response.json();
  console.log(data)
  return data;
};


export async function createOfficer(body:any) {
  try{
    const response = await axios.post('http://172.16.15.42:5500/api/officers/create',body);
    return response.data;
  }catch(err:any){
    alert("Error")
    console.log("Error in posting data",err)
  }
 
};