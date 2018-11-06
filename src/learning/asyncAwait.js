// async used in conjunction with await => both words must exist
// await the PROMISE
async function handleGetUser () {
    try {
      var user = await getUser();
      return user.propToReturn;
      console.log(user)
    } catch (error) {
      console.log('Error in handleGetUser', error)
    }
  }