"use client";

import { useState, useEffect } from "react";
import { netflixCountry } from "../../utils/country";

type Movie = {
  title: string;
  image: string;
  watch: string;
};

export default function TopPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("SouthKorea");
  const date = "2024-11-03";

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://websseu.github.io/pythonNetflix/country/${selectedCountry}/${selectedCountry}FilmsTop10_${date}.json`
        );
        if (!response.ok) throw new Error("영화 데이터를 가져올 수 없습니다.");
        const data: Movie[] = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [selectedCountry, date]);

  return (
    <>
      <section className="max-w-screen-xl mx-auto mt-8 px-4">
        <div className="flex flex-wrap gap-1">
          {netflixCountry.map((country, index) => (
            <span
              key={index}
              onClick={() => setSelectedCountry(country.name)}
              className={`border px-1 text-xs rounded-full NanumSquareNeo cursor-pointer ${
                selectedCountry === country.name
                  ? "bg-slate-900 border-slate-900 text-white"
                  : ""
              }`}
            >
              <em className="pr-1">{country.icon}</em>
              {country.nameKorea}
            </span>
          ))}
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-2 gap-6 text-center">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <li key={index}>
                  <a href={movie.watch}>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="rounded-md w-full"
                    />
                    <p className="p-2">{movie.title}</p>
                  </a>
                </li>
              ))
            ) : (
              <li className="col-span-2">
                이 나라와 날짜에 대한 영화 정보가 없습니다.
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
