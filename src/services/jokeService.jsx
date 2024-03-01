export const newJokePosted = (newJokeInput) => {

    const Newjoke = {
        "text": newJokeInput,
        "told": false
    }

    const portOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Newjoke)
    }

    const response = fetch("http://localhost:8088/jokes", portOptions)
}







export const getAllJokes = () => {
    return fetch("http://localhost:8088/Jokes").then((response) => response.json())
}

export const editJoke = async (existingjoke) => {
    existingjoke.told = !existingjoke.told
    const portOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(existingjoke)
    }

    const response = await fetch(`http://localhost:8088/Jokes/${existingjoke.id}`, portOptions)
}










export const deleteJoke = (deletingJoke ) => {

    const portOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
const response = fetch(`http://localhost:8088/Jokes/${deletingJoke.id}`, portOptions)
}
