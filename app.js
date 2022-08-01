const searchBar = document.querySelector("input");
const moviesList = document.querySelector(".listMovies");
const msgNoResult = document.querySelector("p");

const deleteMovies = () => {
    if(moviesList.children.length > 0)
    {
        let mList = moviesList.children[0];
        mList.remove();
    }
}

searchBar.addEventListener("input", async () => {
    try
    {
        let res = await getMovies(searchBar.value);
        deleteMovies();
        if(res.data.length > 0)
        {
            msgNoResult.classList.add("hide");
            const list = document.createElement('ul');
            for(let m of res.data)
            {
                const movie = document.createElement('li');
                const linkMovie = document.createElement("a");

                if(m.show.officialSite !== null)
                {
                    linkMovie.setAttribute("target", "_blank");
                    linkMovie.href = m.show.officialSite;
                }
                else
                {
                    linkMovie.href = "#";
                }

                movie.append(linkMovie);

                if(m.show.image !== null)
                {
                    const moviePic = document.createElement("IMG");
                    moviePic.setAttribute("src", m.show.image.medium);
                    moviePic.setAttribute("title", m.show.name);
                    linkMovie.append(moviePic);
                    const title = document.createElement("p");
                    title.innerText = m.show.name;
                    linkMovie.append(title);
                }
                else
                {
                    movie.classList.add("noImg");
                    linkMovie.append(m.show.name)
                }
                
                list.append(movie);
            }
            moviesList.append(list);
        }
        else
        {
            msgNoResult.classList.remove("hide");
        }
    }
    catch (err)
    {
        console.log(err);
    }
})

const getMovies = async (key) => {
    try
    {
        let res = await axios({
            method : 'get',
            url : 'https://api.tvmaze.com/search/shows',
            params : {
                q : `${key}`
            }
        });
        return res;
    }
    catch(err)
    {
        console.log(err);
    }
}