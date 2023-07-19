const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.status} -- Please try again`);
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
  let data = await handleError(response)
}

const postOutfit = async(outfit) => {
  let response = await fetch('http://localhost:3003/api/v1/data/outfits', {
    method: 'POST',
    body: JSON.stringify(outfit), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = handleError(response) 
  return data;
}

const postPieceToOutfit = async(idInfo) => {
  let response = await fetch('http://localhost:3003/api/v1/data/outfit-to-pieces', {
    method: 'POST',
    body: JSON.stringify(idInfo), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = handleError(response)
  return data;
}


export { getClosetData, postClosetData, postOutfit, postPieceToOutfit }