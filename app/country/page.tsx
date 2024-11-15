"use client";

import { useEffect, useState } from "react";
import { netflixCountry } from "../../utils/country";
import Image from "next/image";
import { GiQueenCrown } from "react-icons/gi";

type Movie = {
  rank: string;
  title: string;
  week: string;
  image: string;
  watchID: string;
};

type CountryData = {
  kind: string;
  date: string;
  films: Movie[];
  tv: Movie[];
};

export default function CountryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("south-korea");
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountryData = async (country: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://websseu.github.io/pythonNetflix/country/${country}/${country}_2024-11-14.json`
      );
      if (response.ok) {
        const data: CountryData = await response.json();
        setCountryData(data);
      } else {
        setError("Failed to fetch country data");
      }
    } catch {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData(selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <section className="max-w-screen-xl mx-auto mt-8 px-4">
        {/* 국가 선택 버튼 */}
        <div className="flex flex-wrap gap-1 mt-4">
          {netflixCountry.map((country) => (
            <span
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`border px-2 py-0 text-xs rounded-full cursor-pointer flex items-center gap-1 ${
                selectedCountry === country.name
                  ? "bg-black border-black text-white"
                  : ""
              }`}
            >
              {country.icon}
              <span className="NanumSquareNeo">{country.nameKorea}</span>
            </span>
          ))}
        </div>

        {loading && (
          <p className="p-72 text-center text-gray-500 poppins">Loading...</p>
        )}
        {error && (
          <p className="p-72 text-center text-red-500 poppins">{error}</p>
        )}

        {/* 영화/TV 목록 */}
        {!loading && !error && (
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="border-b border-black poppins font-light uppercase">
                  Movie
                </h3>
                <ul>
                  {countryData?.films.map((film) => (
                    <li key={film.watchID} className="my-8 relative">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.netflix.com/title/${film.watchID}`}
                      >
                        <Image
                          src={film.image}
                          alt={film.title}
                          width={608}
                          height={342}
                          style={{ width: "100%", height: "100%" }}
                          priority
                        />
                        <h4 className="absolute bottom-0 left-0 bg-black/10 text-white backdrop-blur-md w-full poppins p-2">
                          <span className="pl-2">{film.rank}</span>.{" "}
                          {film.title}
                        </h4>
                        <p className="absolute bottom-3 right-5 text-white flex gap-1">
                          {[...Array(parseInt(film.week) || 0)].map((_, i) => (
                            <GiQueenCrown key={i} />
                          ))}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="border-b border-black poppins font-light">TV</h3>
                <ul>
                  {countryData?.tv.map((show) => (
                    <li key={show.watchID} className="my-8 relative">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.netflix.com/title/${show.watchID}`}
                      >
                        <Image
                          src={show.image}
                          alt={show.title}
                          width={608}
                          height={342}
                          style={{ width: "100%", height: "100%" }}
                          priority
                        />
                        <h4 className="absolute bottom-0 left-0 bg-black/10 text-white backdrop-blur-md w-full poppins p-2">
                          <span className="pl-2">{show.rank}</span>.{" "}
                          {show.title}
                        </h4>
                        <p className="absolute bottom-3 right-5 text-white flex gap-1">
                          {[...Array(parseInt(show.week) || 0)].map((_, i) => (
                            <GiQueenCrown key={i} />
                          ))}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
