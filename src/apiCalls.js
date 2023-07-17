const getClosetData = async () => {
  let response = await fetch('http://localhost:3003/api/v1/data/closet')
  if(!response.ok) {
      console.log(response.statusText)
      throw new Error(response.statusText)
  }
  let data = response.json()
  return data
}

const postClosetData = async (newData) => {
  let response = await fetch('http://localhost:3003/api/v1/data/closet', {
    method: 'POST',
    body: JSON.stringify(newData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let json = await response.json()
  console.log(json)
  // need to add error handling
}

export { getClosetData, postClosetData }