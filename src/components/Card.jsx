import React from "react";

const Card = ({ fName, lName, details }) => {
  const expiry = `${details[0]?.data.expiration_month}/${details[0]?.data.expiration_year}`;
  var cardNum = details && details[0]?.data.card_number;
  var result = "";
  const gap_size = 4;

  while (cardNum?.length > 0) {
    result = result + " " + cardNum.substring(0, gap_size);
    cardNum = cardNum.substring(gap_size);
  }

  return (
    <>
      <div className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src="https://images.unsplash.com/photo-1637946175559-22c4fe13fc54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
        />

        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div className="text-left">
              <p className="font-light text-sm">Name</p>
              <p className="font-medium tracking-widest">
                {fName} {lName}
              </p>
            </div>
            <img className="w-14 h-14" src="images/main.png" />
          </div>
          <div className="pt-1 items-start justify-start text-left">
            <p className="font-light text-sm">Card Number</p>
            {details.length > 0 ? (
              <p className="font-medium tracking-more-wider">
                {/* 4642 3489 9867 7632 */}
                {result}
              </p>
            ) : (
              <p className="font-medium tracking-more-wider">
                **** **** **** ****
              </p>
            )}
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between items-center">
              <div className="">
                <p className="font-light text-xs">Expiry</p>
                {details.length > 0 ? (
                  <p className="font-medium tracking-wider text-sm">{expiry}</p>
                ) : (
                  <p className="font-medium tracking-wider text-sm">...</p>
                )}
              </div>

              <div className="">
                <p className="font-light text-xs">CVV</p>
                {details.length > 0 ? (
                  <p className="font-bold tracking-more-wider text-sm">
                    {details[0]?.data.cvv}
                  </p>
                ) : (
                  <p className="font-bold tracking-more-wider text-sm">...</p>
                )}
              </div>

              <img
                src="https://i.imgur.com/bbPHJVe_d.webp?maxwidth=760&fidelity=grand"
                className="w-14 h-14"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
