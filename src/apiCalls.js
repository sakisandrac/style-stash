const handleError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error ${response.statusText} -- Please try again`);
  };
}

const getClosetData = async (category, userID) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/closet/${userID}/${category}`,);
  let data = await handleError(response);
  return data;
}

const getOutfitData = async (userID) => {
  let response = await fetch(`http://localhost:3003/api/v1/data/outfits/${userID}`,);
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
  let data = await response.json()
  throw new Error(`${data.message} -- Please try again`)
}

const postOutfit = async(outfit) => {
  let response = await fetch('http://localhost:3003/api/v1/data/outfits', {
    method: 'POST',
    body: JSON.stringify(outfit), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()
  throw new Error(`${data.message} -- Please try again`)
}

const postPieceToOutfit = async(idInfo) => {
  let response = await fetch('http://localhost:3003/api/v1/data/outfit-to-pieces', {
    method: 'POST',
    body: JSON.stringify(idInfo), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()
  throw new Error(`${data.message} -- Please try again`)
}

const getUserData = async (loginInfo) => {
  let response = await fetch('http://localhost:3003/api/v1/data/user', {
    method: 'POST',
    body: JSON.stringify(loginInfo), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await response.json()
  if(data.message) {
    throw new Error(`${data.message} -- Please try again`)
  }
  return data
  
}

export { getClosetData, postClosetData,getUserData, postOutfit, postPieceToOutfit, getOutfitData }
