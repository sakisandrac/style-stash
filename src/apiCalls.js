const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.status} -- Please try again`);
  };
}

const getClosetData = async () => {
  let response = await fetch('http://localhost:3003/api/v1/data/closet');
  let data = handleError(response);
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

export { getClosetData, postClosetData }