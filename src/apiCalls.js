const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.statusText} -- Please try again`);
  };
}

const getData = async (type, userID, secondID) => {
  let response = await fetch(`https://style-stash-api.vercel.app/api/v1/data/${type}/${userID}/${secondID?secondID:''}`);
  let data = await handleError(response);
  return data;
}

const postData = async (type, info) => {
  let response = await fetch(`https://style-stash-api.vercel.app/api/v1/data/${type}`, {
    method: 'POST',
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

const patchData = async (type, allIDs, info) => {
  let response = await fetch(`https://style-stash-api.vercel.app/api/v1/data/${type}/${allIDs}`, {
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

const deleteData = async (type, userID, info) => {
  let response = await fetch(`https://style-stash-api.vercel.app/api/v1/data/${type}/${userID}`, {
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
