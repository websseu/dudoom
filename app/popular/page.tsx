"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Movie = {
  rank: string;
  title: string;
  week: string;
  hours: string;
  views: string;
  image: string;
  watchID: string;
};

type GlobalData = {
  kind: string;
  date: string;
  films: Movie[];
  filmsNone: Movie[];
  tv: Movie[];
  tvNone: Movie[];
};

export default function PopularPage() {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGlobalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://websseu.github.io/pythonNetflix/popular/popular_2024-11-14.json"
      );
      if (response.ok) {
        const data: GlobalData = await response.json();
        setGlobalData(data);
      } else {
        setError("Failed to fetch global data");
      }
    } catch {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  const renderCategory = (categoryData: Movie[] | undefined) => (
    <ul>
      {categoryData?.map((item) => (
        <li key={item.watchID} className="mb-2 relative">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.netflix.com/title/${item.watchID}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={608}
              height={342}
              style={{ width: "100%", height: "100%" }}
              priority
            />
            <div className="absolute w-[35%] left-0 top-0 bg-black/10 h-full backdrop-blur-md poppins p-2 flex flex-col">
              <span className="text-5xl text-white">{item.rank}</span>
              <span className="font-light text-xs text-white mb-1">
                {item.title}
              </span>
              <span className="text-white text-xs font-extralight">
                {item.views}
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="max-w-screen-xl mx-auto mt-8 px-4">
      <h2 className="NanumSquareNeo text-gray-800 text-center my-20">
        넷플릭스 역대 인기 순위입니다.
      </h2>
      {loading && (
        <p className="p-72 text-center text-gray-500 poppins">Loading...</p>
      )}
      {error && (
        <p className="p-72 text-center text-red-500 poppins">{error}</p>
      )}
      {!loading && !error && globalData && (
        <div className="grid grid-cols-4 gap-2">
          <div>
            <h2 className="text-center mb-2 NanumSquareNeo uppercase text-xs text-gray-700">
              Movie(English)
            </h2>
            {renderCategory(globalData.films)}
          </div>
          <div>
            <h2 className="text-center mb-2 NanumSquareNeo uppercase text-xs text-gray-700">
              Movie(None-English)
            </h2>
            {renderCategory(globalData.filmsNone)}
          </div>
          <div>
            <h2 className="text-center mb-2 NanumSquareNeo uppercase text-xs text-gray-700">
              Tv(English)
            </h2>
            {renderCategory(globalData.tv)}
          </div>
          <div>
            <h2 className="text-center mb-2 NanumSquareNeo uppercase text-xs text-gray-700">
              Tv(None-English)
            </h2>
            {renderCategory(globalData.tvNone)}
          </div>
        </div>
      )}
    </section>
  );
}
