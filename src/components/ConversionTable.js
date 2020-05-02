import React from "react";

export default function ConversionTable(props) {
  let paperbacks = props.paperbacks;
  let ebooks = props.ebooks;
  let marketplaces = [
    {
      CAD: {
        name: "Amazon.ca",
        currency: "CAD",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      USD: {
        name: "Amazon.com",
        currency: "USD",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      GBP: {
        name: "Amazon.co.uk",
        currency: "GBP",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      EUR: {
        name: "Amazon.EU",
        currency: "EUR",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      JPY: {
        name: "Amazon.co.jp",
        currency: "JPY",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      INR: {
        name: "Amazon.in",
        currency: "INR",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      BRL: {
        name: "Amazon.com.br",
        currency: "BRL",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      MXN: {
        name: "Amazon.com.mx",
        currency: "MXN",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
    {
      AUD: {
        name: "Amazon.com.au",
        currency: "AUD",
        ebookRoyalty: 0,
        paperbackRoyalty: 0,
      },
    },
  ];
  //Sort by currency
  const sortByCurrency = (books) => {
    let booksByCurrency = {
      CAD: [],
      USD: [],
      GBP: [],
      EUR: [],
      JPY: [],
      INR: [],
      BRL: [],
      MXN: [],
      AUD: [],
    };
    books.forEach((book) => {
      booksByCurrency[`${book.Currency}`].push(book);
    });
    const booksByCurrencyReducer = (accumulator, currentValue) =>
      accumulator + currentValue;
    for (const currency in booksByCurrency) {
      let array = booksByCurrency[currency];
      let total = 0;
      array.forEach((book) => (total += parseInt(book.Royalty)));
      console.log(currency, total);
      // currency.forEach(book =>  ));
    }

    // booksByCurrency.forEach(currency => currency[])
    console.log(booksByCurrency);
  };
  const marketplacesKeys = Object.keys(marketplaces);
  const rows = marketplaces.map((marketplace) => {
    return (
      <tr>
        <td>{marketplace.name}</td>
        <td>{marketplace.currency}</td>
        <td>{marketplace.ebookRoyalty}</td>
        <td>{marketplace.paperbackRoyalty}</td>
        <td>{marketplace.ebookRoyalty + marketplace.paperbackRoyalty}</td>
      </tr>
    );
  });
  return (
    <div>
      <button
        onClick={() => {
          sortByCurrency(ebooks);
          sortByCurrency(paperbacks);
        }}
      >
        Get money
      </button>

      <table>
        <thead>
          <tr>
            <td>Marketplace</td>
            <td>Currency</td>
            <td>Ebook Royalty</td>
            <td>Paperback Royalty</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
