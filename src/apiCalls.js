const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.statusText} -- Please try again`);
  };
}

const getData = async (type, firstID, secondID) => {
  // let response = await fetch(`https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/${type}/${firstID}/${secondID?secondID:''}`);
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}/${firstID}/${secondID?secondID:''}`);
  let data = await handleError(response);
  return data;
}

const postData = async (type, info) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}`, {
  // let response = await fetch(`https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/${type}`, {
    method: 'POST',
    body: JSON.stringify(info), 
    headers: {
      'Content-Typce': 'application/json'
    }
  })
  return handleError(response)
}

const patchData = async (type, allIDs, info) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}/${allIDs}`, {
  // let response = await fetch(`https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/${type}/${allIDs}`, {
    method: 'PATCH',
    body: JSON.stringify(info), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()
  
  if(data.message.includes('Error')) {
    throw new Error(`${data.message} -- Please try again`)
  }
  return data
}

const deleteData = async (type, info) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}`, {
  // let response = await fetch(`https://style-stash-db-0d28a93cf3ce.herokuapp.com/api/v1/data/${type}`, {
    method: 'DELETE',
    body: JSON.stringify(info), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()

  if(data.message.includes('Error')) {
    throw new Error(`${data.message} -- Please try again`)
  }
  return data
}

export { postData, getData, patchData, deleteData }
