import React from "react";

const stats = [
  { name: "USD Account", stat: "$11,897" },
  { name: "GBP Account", stat: "£58.16" },
  { name: "EUR Account", stat: "€24.57" },
];

export default function Stats() {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Balance</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-[#013f28] px-4 py-5 shadow-md sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-400">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
