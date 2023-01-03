import {takeLatest, put, fork, call} from "redux-saga/effects";
import { fetchMovies } from "./api";
import { getMovies } from "./feature/movieSlice";

function* onLoadMoviesAsync({payload}) {
    try {
        const movieName = payload;
        const response = yield call(fetchMovies, movieName);
        if (response.status === 200) {
            yield put(getMovies({...response.data}));
        }
    } catch (error) {
        console.log(error);
    }
}

function* onLoadMovies() {
    yield takeLatest(getMovies.type, onLoadMoviesAsync)
}

export const movieSagas = [fork(onLoadMovies)];