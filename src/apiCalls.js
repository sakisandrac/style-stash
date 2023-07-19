const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    console.log(response)
    throw new Error(`Error ${response.statusText} -- Please try again`);
  };
}

const getClosetData = async (category) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/closet/${category}`,);
  let data = await handleError(response);
  return data;
}


const postClosetData = async (newData) => {
  let response = await fetch('http://localhost:3003/api/v1/data/closet', {
    method: 'POST',
    body: JSON.stringify(newData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let json = await handleError(response)
  console.log(json)
}

const getUserData = async (loginInfo) => {
  let response = await fetch('http://localhost:3003/api/v1/data/user', {
    method: 'POST',
    body: JSON.stringify(loginInfo), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await handleError(response)
  console.log('data', data)
  return data
}


export { getClosetData, postClosetData, getUserData }