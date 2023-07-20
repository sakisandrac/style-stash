const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.statusText} -- Please try again`);
  };
}

const getData = async (type, userID, secondID) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}/${userID}/${secondID?secondID:''}`);
  let data = await handleError(response);
  return data;
}

const postData = async (type, info) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/${type}`, {
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

export { postData, getData }
