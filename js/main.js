const apiKey = 'e14af839'

$("#movies").html(
    `<h5 style="text-align: center;">Welcome nerds, search the movie you want to know the details of...</h5>`
)

$("#searchForm").on("submit", (event) => {

    $("#movies").addClass("spinner-wrapper");
    $("#movies").html( ` <div class="spinner"></div>`)
    var searchText = $('#searchText').val();
    var movieInfo = getMovies(searchText);
    event.preventDefault();
})

$("#searchBtn").on("click",(event)=>{

    $("#movies").addClass("spinner-wrapper");
    $("#movies").html( ` <div class="spinner"></div>`)
    var searchText = $('#searchText').val();
    var movieInfo = getMovies(searchText);
})

async function getMovies(searchText) {
    const response = await fetch(`https://www.omdbapi.com/?&apikey=${apiKey}&s=${searchText}&plot=full`)
    const movieInfo = await response.json();
    // console.log(movieInfo);
    let movies = movieInfo.Search;
        var output = ``;
        $.each(movies, (index, movie) => {
            output += `
        <div class = "col-md-3">
            <div class = "well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                 <a onclick="movieSelected('${movie.imdbID}')" class ="btn btn-primary" href="#">Movie Details</a>
            </div>
        </div>
        `;
        })
        // console.log(output);
        $("#movies").removeClass("spinner-wrapper");
        $("#movies").html(output);

    // return movieInfo;
}

function movieSelected(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

async function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    $("#movie").addClass("spinner-wrapper");
    $("#movie").html( ` <div class="spinner"></div>`)
    const response = await fetch(`https://www.omdbapi.com/?&apikey=${apiKey}&i=${movieID}&plot=full`);
    const movie = await response.json();
    console.log(movie);
    var output = ``;
    output += `
    <div class = "row">
        <div class = "col-md-4">
            <img src = "${movie.Poster}" class = "thumbnail">
        </div>
        <div class = "class-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}/" target="blank" class="btn btn-primary">View IMDB</a>
            <a href="https://www.youtube.com/results?search_query=${movie.Title} official trailer" target="blank" class="btn btn-primary">View Movie Trailer</a>
            <a href="index.html" class="btn btn-default">Go Back to Search</a>
        </div>
    </div>
    `
    $("#movie").removeClass("spinner-wrapper");
    $("#movie").html(output);
}



