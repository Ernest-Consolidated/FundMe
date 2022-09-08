import React from "react";

const Card = ({ fName, lName }) => {
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
            <p className="font-medium tracking-more-wider">
              **** **** **** ****
              {/* 4642 3489 9867 7632 */}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light text-xs">Valid</p>
                <p className="font-medium tracking-wider text-sm">...</p>
              </div>
              <div className="">
                <p className="font-light text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">...</p>
              </div>

              <div className="">
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
